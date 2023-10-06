<script lang="ts">
  import { applyAction, deserialize } from '$app/forms'
  import { invalidateAll } from '$app/navigation'
  import type { PageData } from './$types'

  export let data: PageData
  let loading = false

  async function handleSubmit(event: { currentTarget: HTMLFormElement }) {
    const data = new FormData(event.currentTarget)

    loading = true
    const response = await fetch(event.currentTarget.action, {
      method: 'POST',
      body: data
    })

    const result = deserialize(await response.text())

    if (result.type === 'success') {
      // rerun all `load` functions, following the successful update
      loading = false
      await invalidateAll()
    }
    applyAction(result)
  }

  const removeBudget = async (id: number | undefined, event: Event) => {
    const target = event.target as HTMLInputElement
    loading = true

    const response = await fetch(target.formAction, {
      method: 'POST',
      body: JSON.stringify(id)
    })

    const result = deserialize(await response.text())

    if (result.type === 'success') {
      // rerun all `load` functions, following the successful update
      loading = false
      await invalidateAll()
    }

    applyAction(result)
  }
</script>

<div style="display: flex; gap: 5px; align-items: center;">
  <p>{data.budgets?.id} -</p>
  <p>{data.budgets?.name} -</p>
  <p>{data.budgets?.amount}</p>
  <p>{JSON.stringify(data.budgets?.expense)}</p>
  <button
    style="height: 20px;"
    formaction="?/delete"
    on:click={(event) => removeBudget(data.budgets?.id, event)}
    >Remove
  </button>
</div>
<form method="POST" on:submit|preventDefault={handleSubmit} action="?/new">
  <input name="name" placeholder="name of budget" />
  <button>Submit</button>
  {#if loading}
    <p>enviando...</p>
  {/if}
</form>
