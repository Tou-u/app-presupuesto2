<script lang="ts">
  import { applyAction, deserialize } from '$app/forms'
  import { invalidateAll } from '$app/navigation'
  import { RadioGroup, RadioItem, getModalStore } from '@skeletonlabs/skeleton'
  import CurrencyInput from '$lib/components/CurrencyInput.svelte'
  const modalStore = getModalStore()

  export let parent: any
  let message: string = ''
  let option: number = 0

  async function onFormSubmit(event: { currentTarget: HTMLFormElement }) {
    const data = new FormData(event.currentTarget)

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
      id="form"
      class="modal-form {cForm}"
      method="POST"
      action="?/newBudget"
      on:submit|preventDefault={onFormSubmit}>
      <div class="flex flex-col gap-1">
        <span>¿Cuentas con una cantidad estimada?</span>
        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
          <RadioItem bind:group={option} name="option" value={0}>No</RadioItem>
          <RadioItem bind:group={option} name="option" value={1}>Sí</RadioItem>
        </RadioGroup>
      </div>
      {#if option === 1}
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
          <div class="input-group-shim">
            <p>CLP $</p>
          </div>
          <CurrencyInput name="budget_amount" />
        </div>
      {/if}

      <label class="label">
        <span>Asigna un nombre al presupuesto</span>
        <input
          class="input"
          type="text"
          name="budget_name"
          placeholder="Ingresa el nombre"
          autocomplete="off" />
      </label>
    </form>
    <div class="flex flex-col items-center gap-2">
      {#if message}
        <strong>{message}</strong>
      {/if}
      <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose} type="button"
          >Cancelar</button>
        <button class="btn {parent.buttonPositive}" type="submit" form="form"
          >Crear Presupuesto</button>
      </footer>
    </div>
  </div>
{/if}
