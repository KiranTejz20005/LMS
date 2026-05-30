<script lang="ts">
  import { page } from '$app/state';

  import { UpgradeModal, PageLoadProgress, PageRestricted } from '$features/ui';
  import { CommandPalette, KeyboardShortcutListener } from '$features/search';
  import { currentOrg } from '$lib/utils/store/org';
  import { appInitApi } from '$features/app/init.svelte';
  import { authClient } from '$lib/utils/services/auth/client';

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

  // Client-side session — used when server-side check failed but auth
  // cookies are present (see hooks.server.ts `authCookiesPresent`).
  const clientSession = authClient.useSession();
  const isClientSessionReady = $derived(!$clientSession.isPending);

  // Redirect to login if user is not authenticated and not on a public route.
  $effect(() => {
    if (data.skipAuth) return;

    // Server confirmed session exists
    if (data.locals?.user) return;

    // Wait for appInitApi to finish before deciding
    if (appInitApi.loading) return;

    // If app init completed successfully, user is authenticated
    if (appInitApi.isInitializedAndReady) return;

    // Don't redirect from public routes
    if (path.startsWith('/login') || path.startsWith('/signup') || path.startsWith('/forgot')) return;

    // Auth cookies are present but server-side check failed.
    // Wait for the client-side proxy session check to complete.
    if (data.locals?.authCookiesPresent) {
      if (!isClientSessionReady) return; // still waiting for client check
      // Client check finished and found a session -> the root layout's
      // effect will trigger appInitApi.setupApp.
      if ($clientSession.data) return;
    }

    // No session found — redirect to login
    if (!data.locals?.user && !appInitApi.isInitializedAndReady && !appInitApi.loading) {
      window.location.href = '/login';
    }
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
