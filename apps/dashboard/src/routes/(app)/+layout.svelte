<script lang="ts">
  import { page } from '$app/state';

  import { UpgradeModal, PageLoadProgress, PageRestricted } from '$features/ui';
  import { CommandPalette, KeyboardShortcutListener } from '$features/search';
  import { currentOrg } from '$lib/utils/store/org';
  import { appInitApi } from '$features/app/init.svelte';

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

  // Redirect to login if user is not authenticated and not on a public route.
  // Use appInitApi state instead of creating a second useSession() instance
  // (which would double the polling/network requests).
  $effect(() => {
    if (data.skipAuth) return;
    if (data.locals?.user) return; // Server confirmed session exists

    // Wait for appInitApi to finish before deciding
    if (appInitApi.loading) return;

    // If app init completed successfully, user is authenticated
    if (appInitApi.isInitializedAndReady) return;

    // Don't redirect from public routes
    if (path.startsWith('/login') || path.startsWith('/signup') || path.startsWith('/forgot')) return;

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
