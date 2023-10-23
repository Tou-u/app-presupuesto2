<script lang="ts">
  import BudgetInfo from '$lib/components/BudgetInfo.svelte'
  import { getModalStore } from '@skeletonlabs/skeleton'
  import type { ActionData, PageData } from './$types'
  import { goto } from '$app/navigation'
  const modalStore = getModalStore()

  export let data: PageData
  export let form: ActionData
  $: ({ budget } = data)

  $: if (form?.success || form?.budgetUpdated) {
    modalStore.close()
  }

  $: if (form?.budgetCreated || form?.budgetDelete) {
    modalStore.close()
    goto('/')
  }
</script>

<BudgetInfo {budget} />
