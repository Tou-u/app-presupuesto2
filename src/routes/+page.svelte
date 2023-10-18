<script lang="ts">
  import BudgetInfo from '$lib/components/BudgetInfo.svelte'
  import Add from '$lib/icons/Add.svelte'
  import type { ActionData, PageData } from './$types'
  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton'
  const modalStore = getModalStore()

  export let data: PageData
  export let form: ActionData
  $: ({ budget } = data)

  $: if (form?.success) {
    modalStore.close()
  }

  $: if (form?.budgetCreated) {
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

  // async function handleSubmit(event: { currentTarget: HTMLFormElement }) {
  //   const data = new FormData(event.currentTarget)

  //   loading = true
  //   const response = await fetch(event.currentTarget.action, {
  //     method: 'POST',
  //     body: data
  //   })

  //   const result = deserialize(await response.text())

  //   if (result.type === 'success') {
  //     // rerun all `load` functions, following the successful update
  //     loading = false
  //     await invalidateAll()
  //   }
  //   applyAction(result)
  // }

  // const removeBudget = async (id: number | undefined, event: Event) => {
  //   const target = event.target as HTMLInputElement
  //   loading = true

  //   const response = await fetch(target.formAction, {
  //     method: 'POST',
  //     body: JSON.stringify(id)
  //   })

  //   const result = deserialize(await response.text())

  //   if (result.type === 'success') {
  //     // rerun all `load` functions, following the successful update
  //     loading = false
  //     await invalidateAll()
  //   }

  //   applyAction(result)
  // }
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

<!-- <div style="display: flex; gap: 5px; align-items: center;" class="p-2">
  <p>{budget?.id} -</p>
  <p>{budget?.name} -</p>
  <p>{budget?.amount}</p>
  <p>{JSON.stringify(budget?.expense)}</p>
  <button
    style="height: 20px;"
    formaction="?/delete"
    on:click={(event) => removeBudget(budget?.id, event)}
    >Remove
  </button>
</div>
<form method="POST" on:submit|preventDefault={handleSubmit} action="?/new">
  <input name="name" placeholder="name of budget" />
  <button>Submit</button>
  {#if loading}
    <p>enviando...</p>
  {/if}
</form> -->
