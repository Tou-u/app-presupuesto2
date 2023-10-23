<script lang="ts">
  import BudgetInfo from '$lib/components/BudgetInfo.svelte'
  import Add from '$lib/icons/Add.svelte'
  import type { ActionData, PageData } from './$types'
  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton'
  const modalStore = getModalStore()

  export let data: PageData
  export let form: ActionData
  $: ({ budget } = data)

  $: if (form?.budgetCreated || form?.budgetUpdated || form?.success || form?.budgetDeleted) {
    modalStore.close()
  }

  const openBudgetModal = () => {
    const newBudget: ModalSettings = {
      type: 'component',
      component: 'modalNewBudget',
      title: 'Nuevo Presupuesto'
    }
    modalStore.trigger(newBudget)
  }
</script>

{#if !budget}
  <container class="flex h-full flex-col items-center justify-center gap-5">
    <p class="h1 text-center">
      <span
        class="bg-gradient-to-br from-primary-500 to-tertiary-300 box-decoration-clone bg-clip-text text-transparent"
        >Es hora de crear tú primer presupuesto</span>
    </p>

    <button type="button" class="variant-filled-tertiary btn" on:click={openBudgetModal}>
      <span><Add /></span>
      <span>Nuevo presupuesto</span>
    </button>
  </container>
{:else}
  <BudgetInfo {budget} />
{/if}
