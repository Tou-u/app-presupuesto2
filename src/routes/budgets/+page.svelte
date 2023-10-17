<script lang="ts">
  import type { ActionData, PageData } from './$types'
  import CardInfo from '$lib/components/CardInfo.svelte'
  import { getModalStore } from '@skeletonlabs/skeleton'
  import { goto } from '$app/navigation'
  const modalStore = getModalStore()

  export let data: PageData
  export let form: ActionData

  $: ({ budgets } = data)

  $: if (form?.budgetCreated) {
    modalStore.close()
    goto('/')
  }
</script>

<div class="flex flex-col gap-2 p-2">
  <header>
    <h1 class="text-center text-2xl">Mis Presupuestos</h1>
  </header>
  <div class="info grid gap-2">
    {#each budgets as budget}
      <a href={`/budget/${budget.id}`}> <CardInfo {budget} /></a>
    {/each}
  </div>
</div>

<style>
  .info {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
</style>
