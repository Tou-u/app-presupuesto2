<script lang="ts">
  import { page } from '$app/stores'
  import { getDrawerStore, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton'
  const drawerStore = getDrawerStore()
  const modalStore = getModalStore()

  const drawerClose = () => {
    drawerStore.close()
  }

  const openBudgetModal = () => {
    drawerClose()
    const newBudget: ModalSettings = {
      type: 'component',
      component: 'modalNewBudget',
      title: 'Nuevo Presupuesto'
    }
    modalStore.trigger(newBudget)
  }

  const validPaths = ['/', `/budget/${$page.params.id}`, '/budgets']

  $: classesActive = (href: string) => (href === $page.url.pathname ? 'variant-ghost-primary' : '')
</script>

<nav class="list-nav p-4">
  <ul>
    <li>
      <a href="/" on:click={drawerClose} class={classesActive('/')} tabindex="-1"
        >Página principal</a>
    </li>
    <li>
      <a href="/budgets" on:click={drawerClose} class={classesActive('/budgets')} tabindex="-1"
        >Mis Presupuestos</a>
    </li>
    {#if validPaths.includes($page.url.pathname)}
      <li>
        <button class="btn flex w-full justify-start" on:click={openBudgetModal} tabindex="-1"
          ><span> Crear Presupuesto </span></button>
      </li>
    {/if}
  </ul>
</nav>
