<script lang="ts">
  import Add from '$lib/icons/Add.svelte'
  import { applyAction, deserialize } from '$app/forms'
  import { invalidateAll } from '$app/navigation'
  import type { PageData } from './$types'
  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton'
  const modalStore = getModalStore()

  export let data: PageData

  let loading = false

  const modal: ModalSettings = {
    type: 'component',
    component: 'modalNewBudget',
    title: 'Nuevo Presupuesto'
  }

  const openModal = () => {
    modalStore.trigger(modal)
  }

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

{#if !data.budget}
  <container class="flex flex-col items-center h-full justify-center gap-5">
    <p class="h1 text-center">
      <span
        class="bg-gradient-to-br from-primary-500 to-tertiary-300 bg-clip-text text-transparent box-decoration-clone"
        >Es hora de crear tú primer presupuesto</span>
    </p>

    <button type="button" class="btn variant-filled-tertiary" on:click={openModal}>
      <span><Add /></span>
      <span>Nuevo presupuesto</span>
    </button>
  </container>
{:else}
  <button class="btn variant-filled-primary" on:click={openModal}>Nuevo presupuesto</button>
  <strong>{JSON.stringify(data.budget)}</strong>
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
