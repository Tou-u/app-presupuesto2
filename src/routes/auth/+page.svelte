<script lang="ts">
  import { signIn } from '@auth/sveltekit/client'
  import Github from '$lib/icons/Github.svelte'
</script>

<div class="flex h-screen flex-col items-center justify-center">
  <div class="m-auto">
    <h1 class="text-2xl">Inicia sesión</h1>
    <button class="variant-ghost-primary btn mt-5" on:click={() => signIn('github')}>
      <span><Github /></span>
      <span><p class="font-bold">GitHub</p></span>
    </button>
  </div>
  <small>Inicia sesión para probar las características de la app de presupuesto</small>
  <div>
    <p class="p-2 text-center">Dev by Tou ❤️</p>
  </div>
</div>
