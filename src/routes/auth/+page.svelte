<script lang="ts">
  import { signIn } from '@auth/sveltekit/client'
  import Github from '$lib/icons/Github.svelte'
</script>

<div class="flex h-[calc(100vh-110px)] flex-col items-center justify-center">
  <h1 class="text-2xl">Inicia sesión</h1>
  <button class="variant-ghost-primary btn mt-5" on:click={() => signIn('github')}>
    <span><Github /></span>
    <span><p class="font-bold">GitHub</p></span>
  </button>
</div>
<div class="h-[110px]">
  <p class="p-2 text-center">
    <small>Inicia sesión para probar las características de la app de presupuesto</small>
  </p>
  <p class="p-2 text-center">Dev by Tou ❤️</p>
</div>
