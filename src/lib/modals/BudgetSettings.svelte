<script lang="ts">
  import { applyAction, deserialize } from '$app/forms'
  import { invalidateAll } from '$app/navigation'
  import { getModalStore } from '@skeletonlabs/skeleton'
  import CurrencyInput from '$lib/components/CurrencyInput.svelte'
  const modalStore = getModalStore()

  export let parent: any
  let message: string = ''

  const formData = {
    id: $modalStore[0].meta.budgetId,
    name: $modalStore[0].meta.budgetName,
    amount: $modalStore[0].meta.budgetAmount
  }

  async function onFormSubmit(event: { currentTarget: HTMLFormElement }) {
    const data = new FormData(event.currentTarget)
    data.append('budgetId', formData.id)

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

  const deleteBudget = async (id: number | undefined, event: Event) => {
    const target = event.target as HTMLInputElement
    const response = await fetch(target.formAction, {
      method: 'POST',
      body: JSON.stringify(id)
    })
    const result = deserialize(await response.text())
    if (result.type === 'success') {
      if (!result.data?.budgetDelete) await invalidateAll()
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
      id="form"
      class="modal-form {cForm}"
      method="POST"
      action="?/editBudget"
      on:submit|preventDefault={onFormSubmit}>
      <label class="label">
        <span>Nombre del presupuesto</span>
        <input
          class="input"
          type="text"
          name="budget_name"
          placeholder="Ingresa el nombre"
          autocomplete="off"
          bind:value={formData.name} />
      </label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">
        <span>Cantidad estimada (opcional)</span>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
          <div class="input-group-shim">
            <p>CLP $</p>
          </div>
          <CurrencyInput name="budget_amount" amount={formData.amount} />
        </div>
      </label>
      <button
        type="button"
        class="text-red-600 underline"
        on:click={(event) => deleteBudget(formData.id, event)}
        formaction="?/deleteBudget">Eliminar presupuesto</button>
    </form>
    <div class="flex flex-col items-center gap-2">
      {#if message}
        <strong>{message}</strong>
      {/if}
      <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose} type="button"
          >Cancelar</button>
        <button class="btn {parent.buttonPositive}" type="submit" form="form"
          >Actualizar Presupuesto</button>
      </footer>
    </div>
  </div>
{/if}
