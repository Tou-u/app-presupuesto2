<script lang="ts">
  import { getDrawerStore } from '@skeletonlabs/skeleton'
  const drawerStore = getDrawerStore()

  const drawerOpen = () => {
    drawerStore.open()
  }
</script>

<div class="flex h-16 items-center border-b-[1px] p-2">
  <div class="flex-1">
    <a href="/"> <strong class="text-xl uppercase">App Presupuesto</strong></a>
  </div>
  <button on:click={drawerOpen} class="btn btn-sm lg:hidden">
    <span>
      <svg viewBox="0 0 100 80" class="fill-token h-4 w-4">
        <rect width="100" height="20" />
        <rect y="30" width="100" height="20" />
        <rect y="60" width="100" height="20" />
      </svg>
    </span>
  </button>
</div>
