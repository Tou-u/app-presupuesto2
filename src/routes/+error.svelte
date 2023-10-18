<script>
  import { page } from '$app/stores'
  import ArrowL from '$lib/icons/ArrowL.svelte'
</script>

<div class="flex h-screen flex-col items-center justify-center gap-2">
  {#if $page.error?.message === 'Not Found'}
    <strong class="text-xl">La página que estás buscando no existe.</strong>
  {:else}
    <p>
      {$page.error?.message}
    </p>
  {/if}
  <a href="/" class="inline-flex items-center underline"><ArrowL />Volver al inicio</a>
</div>
