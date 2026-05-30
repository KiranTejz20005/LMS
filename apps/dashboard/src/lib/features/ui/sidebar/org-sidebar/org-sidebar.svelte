<script lang="ts">
  import * as Sidebar from '@cio/ui/base/sidebar';
  import { profile } from '$lib/utils/store/user';
  import { orgs } from '$lib/utils/store/org';
  import { browser } from '$app/environment';

  import AppLogo from './app-logo.svelte';
  import NavMain from './nav-main.svelte';
  import { SidebarFooterMenu } from '../footer';
  import UpgradeTrigger from './upgrade-trigger.svelte';
  import SidebarSkeleton from '../sidebar-skeleton.svelte';

  // Show sidebar when org data is loaded OR after a short timeout (prevents infinite skeleton)
  let timedOut = $state(false);
  const isOrgLoaded = $derived($orgs.length > 0 && !!$profile.id);

  if (browser) {
    setTimeout(() => {
      timedOut = true;
    }, 2000);
  }

  const showSidebar = $derived(isOrgLoaded || timedOut);
</script>

{#if !showSidebar}
  <SidebarSkeleton />
{:else}
  <Sidebar.Root collapsible="icon">
    <Sidebar.Header>
      <AppLogo />
    </Sidebar.Header>

    <Sidebar.Content class="gap-0!">
      <NavMain />
    </Sidebar.Content>

    <Sidebar.Footer class="gap-4!">
      <UpgradeTrigger />
      <SidebarFooterMenu />
    </Sidebar.Footer>

    <Sidebar.Rail />
  </Sidebar.Root>
{/if}
