<script lang="ts">
  import { applyAction, deserialize } from '$app/forms'
  import { goto, invalidateAll } from '$app/navigation'
  import { page } from '$app/stores'
  import Trash from '$lib/icons/Trash.svelte'
  import { ProgressRadial, type ModalSettings, getModalStore } from '@skeletonlabs/skeleton'
  const modalStore = getModalStore()

  interface Budget {
    id: number
    name: string
    amount: number | null
    created_at: Date
    categories: string[] | null
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

  $: percent = () => {
    let total = Math.round((gastos / budget.amount!) * 100)
    if (total > 100) total = 100
    return total
  }

  $: openExpenseModal = () => {
    const newExpense: ModalSettings = {
      type: 'component',
      component: 'modalNewExpense',
      title: 'Nuevo Gasto',
      meta: {
        budgetId: budget?.id,
        budgetCategories: budget?.categories
      }
    }
    modalStore.trigger(newExpense)
  }

  $: openCategoryModal = () => {
    const newCategory: ModalSettings = {
      type: 'component',
      component: 'modalNewCategory',
      title: `Categorías de ${budget.name}`,
      meta: {
        budgetId: budget?.id,
        budgetCategories: budget?.categories
      }
    }
    modalStore.trigger(newCategory)
  }

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

  const loadFilter = async (category: string) => {
    goto(`?category=${category}`)
  }

  const removeFilter = () => {
    goto('/')
  }
</script>

<div class="flex flex-col gap-3 p-2">
  <div class="card variant-glass-primary p-4">
    <h1 class="text-center text-3xl font-bold">{budget.name}</h1>
    <div class="flex items-center justify-around">
      {#if budget.amount}
        <div>
          <p class="font-bold">
            Presupuesto <span class="font-normal">{formatAmount(budget.amount)}</span>
          </p>
          <p class="font-bold">Gastado <span class="font-normal">{formatAmount(gastos)}</span></p>
          <button class="variant-ghost-primary btn btn-sm mt-1" on:click={openExpenseModal}
            >+ Nuevo Gasto</button>
        </div>
        <div>
          <ProgressRadial
            value={percent()}
            font={120}
            stroke={80}
            width="w-20"
            meter="stroke-tertiary-500"
            track="stroke-tertiary-500/30"
            strokeLinecap="round">
            {percent()}%
          </ProgressRadial>
        </div>
      {:else}
        <div class="mt-1 flex flex-col">
          <p class="text-lg font-bold">
            Gastado <span class="font-normal">{formatAmount(gastos)}</span>
          </p>
          <div class="text-center">
            <button class="variant-ghost-primary btn btn-sm mt-1" on:click={openExpenseModal}
              >+ Nuevo Gasto</button>
          </div>
        </div>
      {/if}
    </div>
  </div>

  {#if $page.url.search.includes('?category=')}
    <div class="text-center">
      <button class="variant-ghost-primary btn btn-sm -m-3" on:click={removeFilter}
        >Borrar filtro<span class="pl-1 font-bold"
          >{`"${$page.url.search.split('=')[1].replace('%20', ' ')}"`}</span
        ></button>
    </div>
  {/if}
  <div class="card flex items-center gap-2 overflow-hidden">
    <button class="ml-2 p-2 font-bold underline" on:click={openCategoryModal}>Categorías</button>
    <div class="flex h-max gap-1 overflow-auto">
      {#if !budget.categories || budget.categories.length === 0}
        <p>Crea categorías para organizar tus gastos</p>
      {:else}
        {#each budget.categories as category}
          <button
            class="variant-ghost-primary chip rounded-full capitalize"
            on:click={() => loadFilter(category)}>
            {category}
          </button>
        {/each}
      {/if}
    </div>
  </div>

  <div class="info grid gap-2">
    {#each budget.expense as expense}
      <div class="card flex h-[140px] flex-col">
        <header class="card-header">
          <p class="variant-soft chip float-right line-clamp-1 max-w-[180px] capitalize">
            {!expense.category ? 'Sin Categoría' : expense.category}
          </p>
        </header>
        <section class="line-clamp-2 flex-1 px-4 capitalize">
          <p>{expense.name}</p>
        </section>
        <footer class="card-footer flex items-center justify-center text-xl">
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
