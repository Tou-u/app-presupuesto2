<script lang="ts">
  let value = 0
  export let name: string

  function updateValue(event: any) {
    const inputValue = event.target.value
    const numericValue = parseFloat(inputValue.replace(/\D/g, ''))

    if (!isNaN(numericValue)) {
      value = numericValue
      event.target.value = new Intl.NumberFormat('es-CL', { currency: 'CLP' }).format(numericValue)
    } else {
      event.target.value = ''
    }
  }
</script>

<input {name} type="text" on:input={updateValue} placeholder="Ingresa el costo" />
