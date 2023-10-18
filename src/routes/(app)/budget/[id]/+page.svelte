<script lang="ts">
  import BudgetInfo from '$lib/components/BudgetInfo.svelte'
  import { getModalStore } from '@skeletonlabs/skeleton'
  import type { ActionData, PageData } from './$types'
  import { goto } from '$app/navigation'
  const modalStore = getModalStore()

  export let data: PageData
  export let form: ActionData
  $: ({ budget } = data)

  $: if (form?.success) {
    modalStore.close()
  }

  $: if (form?.budgetCreated) {
    modalStore.close()
    goto('/')
  }
</script>

<BudgetInfo {budget} />
