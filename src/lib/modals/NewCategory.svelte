<script lang="ts">
  import { applyAction, deserialize } from '$app/forms'
  import { invalidateAll } from '$app/navigation'
  import { InputChip, getModalStore } from '@skeletonlabs/skeleton'
  const modalStore = getModalStore()

  export let parent: any
  let message: string = ''
  let loading: boolean = false
  let budgetCategories: string[] = $modalStore[0].meta.budgetCategories || []

  async function onFormSubmit(event: { currentTarget: HTMLFormElement }) {
    const data = new FormData(event.currentTarget)

    const categories = data.getAll('categories')

    if (budgetCategories === categories) {
      return
    }

    data.append('budgetId', $modalStore[0].meta.budgetId)

    loading = true
    const response = await fetch(event.currentTarget.action, {
      method: 'POST',
      body: data
    })

    const result = deserialize(await response.text())

    if (result.type === 'failure') message = result.data?.message as string

    if (result.type === 'success') {
      await invalidateAll()
    }
    applyAction(result)
  }

  const cBase = 'card p-4 w-modal shadow-xl space-y-2'
  const cHeader = 'text-2xl font-bold px-2'
  const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token'
</script>

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <header class={cHeader}>{$modalStore[0].title}</header>
    <form
      id="categoryform"
      class="modal-form {cForm}"
      method="POST"
      action="?/newCategory"
      on:submit|preventDefault={onFormSubmit}>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">
        <span>Asigna un nombre a la categoría, luego presiona Enter</span>
        <InputChip
          name="categories"
          padding="p-4"
          placeholder="Ingresa el nombre"
          bind:value={budgetCategories} />
      </label>
    </form>
    <div class="flex flex-col items-center gap-2">
      {#if message}
        <strong>{message}</strong>
      {/if}
      <footer class="modal-footer {parent.regionFooter}">
        {#if loading}
          <p>Aplicando cambios...</p>
        {:else}
          <button class="btn {parent.buttonNeutral}" on:click={parent.onClose} type="button"
            >Cancelar</button>
          <button class="btn {parent.buttonPositive}" type="submit" form="categoryform"
            >Guardar</button>
        {/if}
      </footer>
    </div>
  </div>
{/if}
