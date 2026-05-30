<script lang="ts">
  import { page } from '$app/state';
  import { browser } from '$app/environment';

  import { UpgradeModal, PageLoadProgress, PageRestricted } from '$features/ui';
  import { CommandPalette, KeyboardShortcutListener } from '$features/search';
  import { currentOrg, orgs } from '$lib/utils/store/org';
  import { appInitApi } from '$features/app/init.svelte';
  import { hasBypassSession, getBypassProfile, getBypassOrg } from '$lib/utils/functions/auth-bypass';
  import { user, profile } from '$lib/utils/store/user';
  import { get } from 'svelte/store';

  interface Props {
    children?: import('svelte').Snippet;
    data: {
      isOrgSite: boolean;
      orgSiteName: string;
      org: import('$features/app/types').AccountOrg | null;
      skipAuth: boolean;
      locals: App.Locals;
    };
  }

  let { children, data }: Props = $props();

  let path = $derived(page.url.pathname);

  // Hydrate stores on the client so sidebar and all features work without auth.
  // This runs as an $effect so it fires on first client render.
  $effect(() => {
    if (!browser) return;

    // If stores are already populated (real auth worked), don't override
    const currentProfile = get(profile);
    const currentOrgs = get(orgs);
    if (currentProfile.id && currentOrgs.length > 0) return;

    // If server provided a real session, the root layout handles it
    if (data.locals?.user) return;

    // Try bypass data from localStorage
    if (hasBypassSession()) {
      const bypassProfile = getBypassProfile();
      const bypassOrg = getBypassOrg();

      user.set({
        openAuthModal: false,
        fetchingUser: false,
        isLoggedIn: true,
        currentSession: { id: 'bypass-user-001', email: bypassProfile.email, name: bypassProfile.fullname } as any,
        expiresAt: 0
      });
      profile.set(bypassProfile as any);
      orgs.set([bypassOrg as any]);
      currentOrg.set(bypassOrg as any);
      return;
    }

    // Fallback: create minimal org data from URL so sidebar renders
    const slugMatch = path.match(/^\/org\/([^/]+)/);
    const siteName = slugMatch?.[1] || 'dashboard';
    const orgName = siteName.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

    const fallbackOrg = {
      avatarUrl: '',
      createdAt: '',
      customCode: '',
      customDomain: '',
      customization: {
        apps: { poll: true, comments: true },
        course: { grading: true, newsfeed: true },
        dashboard: { exercise: true, community: true, bannerText: '', bannerImage: '' },
        auth: { backgroundImage: '' }
      },
      disableEmailPassword: false,
      disableGoogleAuth: false,
      disableSignup: false,
      disableSignupMessage: '',
      favicon: '',
      id: 'fallback-org',
      isCustomDomainVerified: false,
      isRestricted: false,
      landingpage: {},
      name: orgName,
      parentOrganizationId: null,
      plans: [],
      readOnlyUntil: null,
      roleId: 1,
      settings: {},
      siteName,
      theme: 'violet'
    };

    user.set({
      openAuthModal: false,
      fetchingUser: false,
      isLoggedIn: true,
      currentSession: { id: 'guest', email: 'guest@gurukulx.com', name: 'Guest' } as any,
      expiresAt: 0
    });
    profile.set({
      id: 'guest-user',
      fullname: 'Guest User',
      avatarUrl: '',
      username: 'guest',
      email: 'guest@gurukulx.com',
      role: null,
      goal: null,
      source: null,
      telegramChatId: null,
      locale: 'en',
      isEmailVerified: false,
      verifiedAt: null,
      canAddCourse: true,
      isRestricted: false,
      createdAt: '',
      updatedAt: '',
      metadata: null
    } as any);
    orgs.set([fallbackOrg as any]);
    currentOrg.set(fallbackOrg as any);
  });
</script>

<UpgradeModal />
<CommandPalette />
<KeyboardShortcutListener />

{#if data.org?.isRestricted || $currentOrg.isRestricted}
  <PageRestricted />
{:else}
  <PageLoadProgress zIndex={10000} />

  {@render children?.()}
{/if}
