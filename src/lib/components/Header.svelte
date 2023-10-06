<script lang="ts">
  import { getDrawerStore } from '@skeletonlabs/skeleton'
  const drawerStore = getDrawerStore()

  const drawerOpen = () => {
    drawerStore.open()
  }
</script>

<div class="flex items-center h-16 p-2 border-b-[1px]">
  <strong class="flex-1 text-xl uppercase">App Presupuesto</strong>
  <button on:click={drawerOpen} class="lg:hidden btn btn-sm">
    <span>
      <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
        <rect width="100" height="20" />
        <rect y="30" width="100" height="20" />
        <rect y="60" width="100" height="20" />
      </svg>
    </span>
  </button>
</div>
