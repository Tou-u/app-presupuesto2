<script lang="ts">
  import '../app.postcss'
  import { AppShell } from '@skeletonlabs/skeleton'
  import { initializeStores, Drawer } from '@skeletonlabs/skeleton'
  import Navigation from '$lib/components/Navigation.svelte'
  import Header from '$lib/components/Header.svelte'

  initializeStores()
</script>

<Drawer width="w-56" position="right"><Navigation /></Drawer>
<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <!-- (sidebarLeft) -->
  <svelte:fragment slot="sidebarRight">
    <div class="hidden lg:block w-56">
      <Navigation />
    </div>
  </svelte:fragment>
  <!-- (pageHeader) -->
  <!-- Router Slot -->
  <slot />
  <!-- ---- / ---- -->
  <!-- (pageFooter) -->
  <svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
