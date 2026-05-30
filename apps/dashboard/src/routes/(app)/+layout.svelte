<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';

  import { UpgradeModal, PageLoadProgress, PageRestricted } from '$features/ui';
  import { CommandPalette, KeyboardShortcutListener } from '$features/search';
  import { currentOrg, orgs } from '$lib/utils/store/org';
  import { appInitApi } from '$features/app/init.svelte';
  import { hasBypassSession, getBypassProfile, getBypassOrg } from '$lib/utils/functions/auth-bypass';
  import { user, profile } from '$lib/utils/store/user';

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

  // Hydrate stores from bypass data immediately so sidebar renders content
  if (typeof window !== 'undefined' && hasBypassSession() && !data.locals?.user) {
    const bypassProfile = getBypassProfile();
    const bypassOrg = getBypassOrg();

    user.update((_user) => ({
      ..._user,
      fetchingUser: false,
      isLoggedIn: true,
      currentSession: { id: 'bypass-user-001', email: bypassProfile.email, name: bypassProfile.fullname } as any
    }));

    profile.set(bypassProfile as any);
    orgs.set([bypassOrg as any]);
    currentOrg.set(bypassOrg as any);
  }

  // Auth bypass: skip all auth redirect checks
  $effect(() => {
    return;
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
