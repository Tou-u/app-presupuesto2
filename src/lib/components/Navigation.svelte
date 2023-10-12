<script lang="ts">
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
</script>

<nav class="list-nav p-4">
  <ul>
    <li><a href="/" on:click={drawerClose}>Página principal</a></li>
    <li>
      <button class="btn flex w-full justify-start" on:click={openBudgetModal}
        ><span> Crear Presupuesto </span></button>
    </li>
    <li><a href="/budgets" on:click={drawerClose}>Mis Presupuestos</a></li>
  </ul>
</nav>
