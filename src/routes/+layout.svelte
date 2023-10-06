<script lang="ts">
  import '../app.postcss'
  import { AppShell, type ModalComponent } from '@skeletonlabs/skeleton'
  import { initializeStores, Drawer, Modal } from '@skeletonlabs/skeleton'
  import Navigation from '$lib/components/Navigation.svelte'
  import Header from '$lib/components/Header.svelte'

  initializeStores()

  import NewBudget from '$lib/modals/NewBudget.svelte'

  const modalComponentRegistry: Record<string, ModalComponent> = {
    modalNewBudget: {
      ref: NewBudget,
      slot: '<p>Skeleton</p>'
    }
  }
</script>

<Drawer width="w-56" position="right"><Navigation /></Drawer>
<Modal components={modalComponentRegistry} />
<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <svelte:fragment slot="sidebarRight">
    <div class="hidden lg:block w-56">
      <Navigation />
    </div>
  </svelte:fragment>
  <slot />
  <svelte:fragment slot="footer">
    <p class="text-center p-2">Dev by Tou ❤️</p>
  </svelte:fragment>
</AppShell>
