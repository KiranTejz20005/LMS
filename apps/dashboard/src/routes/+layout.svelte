<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';

  import { Snackbar } from '$features/ui';
  import { appInitApi } from '$features/app/init.svelte';
  import { setupCloudAnalytics } from '$lib/utils/functions/appSetup';
  import { globalStore } from '$lib/utils/store/app';
  import { currentOrg, mergeAccountOrgFromServer } from '$lib/utils/store/org';
  import { user } from '$lib/utils/store/user';
  import { setTheme } from '$lib/utils/functions/theme';
  import { authClient } from '$lib/utils/services/auth/client';
  import merge from 'lodash/merge';
  import { MetaTags } from 'svelte-meta-tags';
  import { ModeWatcher } from '@cio/ui/base/dark-mode';

  import '../app.css';

  let { data, children } = $props();

  const metaTags = $derived(merge(data.baseMetaTags, page.data.pageMetaTags));

  onMount(() => {
    console.log('Layout', data);

    const loadingIndicator = document.getElementById('app-loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }

    const sessionUser = data?.locals?.user;
    setupCloudAnalytics(
      sessionUser ? { id: sessionUser.id, email: sessionUser.email, name: sessionUser.name } : undefined
    );

    if (data?.locals?.user) {
      user.set({
        ...$user,
        isLoggedIn: true,
        currentSession: data.locals.user
      });
    }

    if (data.isOrgSite && data.org) {
      $globalStore.orgSiteName = data.orgSiteName || '';
      $globalStore.isOrgSite = true;
      currentOrg.set(mergeAccountOrgFromServer(data.org));
      setTheme(data.org.theme || 'violet');
    }
  });

  const session = authClient.useSession();
  const isSessionReady = $derived(!$session.isPending && !$session.isRefetching && $session.data);

  // Use server-side session data immediately if available (avoids waiting for client-side API call)
  let hasTriggeredSetup = $state(false);
  $effect(() => {
<<<<<<< HEAD
    // Don't attempt app setup on auth routes — no session is expected there
    const pathname = page.url.pathname;
    const isAuthRoute =
      pathname.startsWith('/login') ||
      pathname.startsWith('/signup') ||
      pathname.startsWith('/forgot') ||
      pathname.startsWith('/reset') ||
      pathname.startsWith('/auth-failed') ||
      pathname.startsWith('/verify-email-error');
    if (isAuthRoute) return;

    if (hasTriggeredSetup && appInitApi.isInitializedAndReady) return;
=======
    if (hasTriggeredSetup && appInitApi.isInitializedAndReady) return;

    // If a previous setup attempt failed, allow retry
    if (hasTriggeredSetup && !appInitApi.isInitializedAndReady && !appInitApi.loading) {
      hasTriggeredSetup = false;
    }

>>>>>>> bd1e20a9dbcc8c89f321352d7bc623cc6a4b17ac
    if (hasTriggeredSetup) return;

    // Try server-side locals first (instant, no API call needed)
    if (data?.locals?.user && !appInitApi.isInitializedAndReady && !appInitApi.loading) {
      hasTriggeredSetup = true;
      appInitApi.setupApp(data.locals as App.Locals, {
        isOrgSite: data.isOrgSite,
        orgSiteName: data.orgSiteName,
        orgId: data.org?.id ?? null
      });
      return;
    }

    // Fallback to client-side session (for client-side navigations)
    if (isSessionReady && !appInitApi.isInitializedAndReady && !appInitApi.loading) {
      hasTriggeredSetup = true;
      appInitApi.setupApp($session.data as App.Locals, {
        isOrgSite: data.isOrgSite,
        orgSiteName: data.orgSiteName,
        orgId: data.org?.id ?? null
      });
    }
  });
</script>

<div>
  <ModeWatcher />

  <MetaTags {...metaTags} />

  <Snackbar />

  {@render children?.()}
</div>

<style>
  :global(:root) {
    --main-primary-color: rgba(29, 78, 216, 1);
    --border-color: #eaecef;
  }

  :global(.dark svg.dark) {
    fill: #fff;
  }

  :global(.border-c) {
    border: 1px solid var(--border-color);
  }

  :global(.border-bottom-c) {
    border-bottom: 1px solid var(--border-color);
  }

  :global(.cards-container) {
    width: 90%;
    margin: 0 auto;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    column-gap: 12px;
    row-gap: 12px;
  }

  @media screen and (max-width: 768px) {
    :global(.cards-container) {
      width: 95%;
      margin: 0 auto;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      column-gap: 12px;
      row-gap: 12px;
    }
  }
</style>
