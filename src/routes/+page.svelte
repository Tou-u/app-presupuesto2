<script lang="ts">
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

  $: gastos = () => {
    return budget?.expense
      .map((e) => e.amount)
      .reduce((acc, value) => {
        return acc + value
      }, 0)
  }

  $: newExpense = {
    type: 'component',
    component: 'modalNewExpense',
    title: 'Nuevo Gasto',
    meta: {
      budgetId: data.budget?.id
    }
  } satisfies ModalSettings

  const newBudget: ModalSettings = {
    type: 'component',
    component: 'modalNewBudget',
    title: 'Nuevo Presupuesto'
  }

  const openBudgetModal = () => {
    modalStore.trigger(newBudget)
  }

  const openExpenseModal = () => {
    modalStore.trigger(newExpense)
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
  <container class="flex flex-col items-center h-full justify-center gap-5">
    <p class="h1 text-center">
      <span
        class="bg-gradient-to-br from-primary-500 to-tertiary-300 bg-clip-text text-transparent box-decoration-clone"
        >Es hora de crear tú primer presupuesto</span>
    </p>

    <button type="button" class="btn variant-filled-tertiary" on:click={openBudgetModal}>
      <span><Add /></span>
      <span>Nuevo presupuesto</span>
    </button>
  </container>
{:else}
  <container>
    <h1>{budget.name}</h1>
    <p>{budget.amount}</p>
    {#if budget.expense.length > 0}
      {gastos()}
      {#each budget.expense as expense}
        <p>{expense.name}</p>
        <p>{expense.amount}</p>
      {/each}
    {/if}
  </container>
  <button class="btn variant-filled-primary" on:click={openBudgetModal}>Nuevo presupuesto</button>
  <button class="btn variant-filled-primary" on:click={openExpenseModal}>Nuevo Gasto</button>
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
