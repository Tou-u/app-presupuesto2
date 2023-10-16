<script lang="ts">
  interface Budget {
    id: number
    name: string
    amount: number | null
    created_at: Date
  }

  import { formatAmount, formatDate } from '$lib/utils/scripts'

  export let budget: Budget
</script>

<div class="center card flex h-[140px] flex-col">
  <header class="card-header">
    <p class="variant-soft chip float-right line-clamp-1 max-w-[180px] capitalize">
      {formatDate(budget.created_at)}
    </p>
  </header>
  <section class="pr-4 text-end">
    <p>{!budget.amount ? 'Sin presupuesto' : formatAmount(budget.amount)}</p>
  </section>
  <footer class="card-footer line-clamp-2 flex flex-1 items-center justify-center text-xl">
    <p class="m-auto">{budget.name}</p>
  </footer>
</div>
