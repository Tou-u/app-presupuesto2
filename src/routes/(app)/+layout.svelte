<script lang="ts">
  import '../../app.postcss'
  import { AppShell, type ModalComponent } from '@skeletonlabs/skeleton'
  import { initializeStores, Drawer, Modal } from '@skeletonlabs/skeleton'
  import Navigation from '$lib/components/Navigation.svelte'
  import Header from '$lib/components/Header.svelte'
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom'
  import { storePopup } from '@skeletonlabs/skeleton'

  initializeStores()

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

  import NewBudget from '$lib/modals/NewBudget.svelte'
  import NewExpense from '$lib/modals/NewExpense.svelte'
  import NewCategory from '$lib/modals/NewCategory.svelte'
  import BudgetSettings from '$lib/modals/BudgetSettings.svelte'

  const modalComponentRegistry: Record<string, ModalComponent> = {
    modalNewBudget: {
      ref: NewBudget,
      slot: '<p>Skeleton</p>'
    },
    modalNewExpense: {
      ref: NewExpense,
      slot: '<p>Skeleton</p>'
    },
    modalNewCategory: {
      ref: NewCategory,
      slot: '<p>Skeleton</p>'
    },
    modalBudgetSettings: {
      ref: BudgetSettings,
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
    <p class="p-2 text-center">Dev by RR ❤️</p>
  </svelte:fragment>
</AppShell>
