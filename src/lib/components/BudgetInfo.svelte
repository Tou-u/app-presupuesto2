<script lang="ts">
  import { applyAction, deserialize } from '$app/forms'
  import { invalidateAll } from '$app/navigation'
  import Trash from '$lib/icons/Trash.svelte'

  interface Budget {
    id: number
    name: string
    amount: number | null
    created_at: Date
    expense: {
      id: number
      name: string
      amount: number
      category: string | null
      budgetId: number
    }[]
  }

  export let budget: Budget

  $: gastos = budget?.expense
    .map((e) => e.amount)
    .reduce((acc, value) => {
      return acc + value
    }, 0)

  const formatAmount = (amount: number) => {
    return Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(amount)
  }

  const deleteExpense = async (id: number | undefined) => {
    const target = document.getElementById('deleteExpense') as HTMLInputElement

    const response = await fetch(target.formAction, {
      method: 'POST',
      body: JSON.stringify(id)
    })

    const result = deserialize(await response.text())

    if (result.type === 'success') {
      await invalidateAll()
    }

    applyAction(result)
  }
</script>

<div class="p-2">
  <h1 class="text-3xl">{budget.name}</h1>
  {#if budget.amount}
    <p>Presupuesto de {formatAmount(budget.amount)}</p>
  {/if}
  <p>Gastado un total de {formatAmount(gastos)}</p>
  <div class="grid info gap-2">
    {#each budget.expense as expense}
      <div class="card flex flex-col h-[140px]">
        <header class="card-header">
          <span class="chip variant-soft float-right">
            {!expense.category ? 'Sin Categoría' : expense.category}
          </span>
        </header>
        <section class="px-4 line-clamp-2 flex-1 capitalize">
          <p>{expense.name}</p>
        </section>
        <footer class="card-footer text-xl flex justify-center items-center">
          <p class="m-auto">{formatAmount(expense.amount)}</p>
          <button
            class="self-end"
            formaction="?/deleteExpense"
            type="button"
            id="deleteExpense"
            on:click={() => deleteExpense(expense.id)}>
            <Trash />
          </button>
        </footer>
      </div>
    {/each}
  </div>
</div>

<style>
  .info {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
</style>
