<script>
  import { page } from '$app/stores'
</script>

{#if $page.error?.message === 'Internal Error'}
  <h1>
    Estamos teniendo problemas para establecer la conexión con el servidor, intenta más tarde.
  </h1>
{:else}
  <h1>La página no existe</h1>
{/if}
