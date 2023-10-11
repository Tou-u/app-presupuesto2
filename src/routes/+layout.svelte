<script lang="ts">
  import '../app.postcss'
  import { AppShell, type ModalComponent } from '@skeletonlabs/skeleton'
  import { initializeStores, Drawer, Modal } from '@skeletonlabs/skeleton'
  import Navigation from '$lib/components/Navigation.svelte'
  import Header from '$lib/components/Header.svelte'

  initializeStores()

  import NewBudget from '$lib/modals/NewBudget.svelte'
  import NewExpense from '$lib/modals/NewExpense.svelte'

  const modalComponentRegistry: Record<string, ModalComponent> = {
    modalNewBudget: {
      ref: NewBudget,
      slot: '<p>Skeleton</p>'
    },
    modalNewExpense: {
      ref: NewExpense,
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
    <div class="hidden w-56 lg:block">
      <Navigation />
    </div>
  </svelte:fragment>
  <slot />
  <svelte:fragment slot="footer">
    <p class="p-2 text-center">Dev by Tou ❤️</p>
  </svelte:fragment>
</AppShell>
