<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { Button } from '@cio/ui/base/button';
  import { AuthUI } from '$features/ui';
  import { currentOrg } from '$lib/utils/store/org';
  import { setTheme } from '$lib/utils/functions/theme';
  import { courseApi } from '$features/course/api';
  import { t } from '$lib/utils/functions/translations';
  import { profile } from '$lib/utils/store/user';
  import { snackbar } from '$features/ui/snackbar/store';
  import { capturePosthogEvent } from '$lib/utils/services/posthog';
  import { resolve } from '$app/paths';
  import { appInitApi } from '$features/app/init.svelte';

  let { data } = $props();

  let loading = $state(false);

  // True when the app initialization is still in progress (profile not yet loaded)
  const isAppLoading = $derived(!appInitApi.isInitializedAndReady && (appInitApi.loading || !!data.locals?.user));

  const inviteStatus = $derived(data.invite?.status ?? 'INVALID');
  const canJoinCourse = $derived(
    data.requiresPaymentOrInvite
      ? false
      : (inviteStatus === 'ACTIVE' || !data.invite) &&
          data.course?.allowNewStudent !== false &&
          data.course?.status === 'ACTIVE' &&
          Boolean(data.course?.isPublished)
  );
  $inspect(data.requiresPaymentOrInvite);
  $inspect(canJoinCourse);
  $inspect(data);
  $inspect('loading', loading);

  function getBlockedMessage(): string {
    if (data.requiresPaymentOrInvite) {
      return t.get('course.navItem.landing_page.enroll_page.requires_payment_or_invite');
    }
    if (data.course?.allowNewStudent === false) {
      return t.get('course.navItem.landing_page.pricing_section.not_accepting');
    }
    if (data.course?.status !== 'ACTIVE' || !data.course?.isPublished) {
      return 'This course is currently unavailable for enrollment.';
    }
    if (data.invite && inviteStatus === 'EXPIRED') {
      return 'This invite link has expired.';
    }
    if (data.invite && inviteStatus === 'USED_UP') {
      return 'This invite link has reached its usage limit.';
    }
    if (data.invite && inviteStatus === 'REVOKED') {
      return 'This invite link has been revoked.';
    }
    if (data.invite && inviteStatus !== 'ACTIVE') {
      return 'This invite link is not valid.';
    }
    return '';
  }

  async function handleSubmit() {
    if (!canJoinCourse) {
      snackbar.error(getBlockedMessage());
      return;
    }
    console.log('profile', $profile);

    loading = true;

    const redirectPath = page.url?.pathname ?? `/course/${data.course?.slug ?? ''}/enroll`;
    const redirectSearch = data.token ? `?invite_token=${encodeURIComponent(data.token)}` : '';
    const redirectUrl = `${redirectPath}${redirectSearch}`;

    // Check if user is authenticated using both client-side profile store
    // and server-side session data (locals). The profile store may not be
    // populated yet if appInitApi.setupApp is still in progress.
    const hasProfile = !!$profile.id && !!$profile.email;
    const hasServerSession = !!data.locals?.user;

    if (!hasProfile && !hasServerSession) {
      const inviteEmail = data.inviteEmail ?? '';
      const target = data.inviteEmailExists ? '/login' : '/signup';
      const params = new URLSearchParams({ redirect: redirectUrl });
      if (inviteEmail) params.set('email', inviteEmail);

      goto(resolve(`${target}?${params.toString()}`, {}));
      loading = false;
      return;
    }

    // If we have a server session but profile hasn't loaded yet, wait for it
    if (!hasProfile && hasServerSession) {
      // Wait for appInitApi to finish loading (max 10 seconds)
      const maxWait = 10000;
      const start = Date.now();
      while (!$profile.id && Date.now() - start < maxWait) {
        await new Promise((r) => setTimeout(r, 200));
      }

      // If profile still didn't load, try enrolling anyway — the API will
      // authenticate via cookies regardless of client-side state
      if (!$profile.id) {
        console.warn('Profile store not populated after waiting, proceeding with enrollment');
      }
    }

    try {
      const body = data.token ? { inviteToken: data.token } : {};
      const result = await courseApi.enroll(data.course!.id, body);

      if (!result?.data) {
        return;
      }

      capturePosthogEvent('student_joined_course', {
        course_name: data.course?.title,
        student_id: $profile.id,
        student_email: $profile.email,
        already_joined: result.data.alreadyJoined
      });

      // need to force page reload to avoid cache issues
      window.location.href = result.data.redirectTo || '/lms';
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    if (!data.currentOrg) return;

    const rawTheme = data.currentOrg.theme;
    const themeString = typeof rawTheme === 'string' ? rawTheme : '';

    setTheme(themeString);
    currentOrg.update((o) => ({
      ...o,
      id: data.currentOrg?.id ?? o.id,
      name: data.currentOrg?.name ?? o.name,
      siteName: data.currentOrg?.siteName ?? o.siteName,
      theme: themeString || o.theme
    }));
  });
</script>

<svelte:head>
  <title>Join {data.course?.title ?? 'Course'} on GurukulX</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<AuthUI isLogin={false} {handleSubmit} isLoading={loading || !$profile.id} showOnlyContent={true} showLogo={true}>
  <div class="mt-0 w-full">
    <h3 class="mt-0 mb-4 text-center text-lg font-medium dark:text-white">{data.course?.title}</h3>
    <p class="text-center text-sm font-light dark:text-white">{data.course?.description}</p>
    {#if data.requiresPaymentOrInvite}
      <p class="ui:text-muted-foreground mt-3 text-center text-sm">
        {$t('course.navItem.landing_page.enroll_page.requires_payment_or_invite')}
      </p>
      <a
        href={resolve(`/course/${data.course?.slug ?? ''}`, {})}
        class="ui:text-primary ui:underline mt-3 block text-center text-sm"
      >
        {$t('course.navItem.landing_page.enroll_page.back_to_course')}
      </a>
    {:else if !canJoinCourse}
      <p class="mt-3 text-center text-sm text-red-500">{getBlockedMessage()}</p>
    {/if}
  </div>

  <div class="my-4 flex w-full items-center justify-center">
    <Button type="submit" disabled={!canJoinCourse || loading || isAppLoading} loading={loading || isAppLoading}>
      {$t('course.navItem.landing_page.enroll_page.join_course')}
    </Button>
  </div>
</AuthUI>
