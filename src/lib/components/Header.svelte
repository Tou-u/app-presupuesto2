<script lang="ts">
  import { Avatar, getDrawerStore, popup, type PopupSettings } from '@skeletonlabs/skeleton'
  import { page } from '$app/stores'
  import { signOut } from '@auth/sveltekit/client'
  const drawerStore = getDrawerStore()

  const drawerOpen = () => {
    drawerStore.open()
  }

  const popupClick: PopupSettings = {
    event: 'click',
    target: 'popupClick',
    placement: 'bottom'
  }

  const avatar = $page.data.session?.user.image!
  const username = $page.data.session?.user.name?.split(' ')[0]
</script>

<div class="flex h-16 items-center border-b-[1px] p-2">
  <div class="mx-auto max-w-6xl flex-1">
    <a href="/"> <strong class="text-xl uppercase">App Presupuesto</strong></a>
  </div>
  {#if $page.data.session}
    <button use:popup={popupClick} class="variant-ghost-primary btn px-2 py-1">
      <div class="flex items-center gap-2">
        <p>{username}</p>
        <Avatar width="w-9" rounded="rounded-full" src={avatar} />
      </div>
    </button>
    <div class="card variant-filled" data-popup="popupClick">
      <button class="btn p-2" on:click={() => signOut()}>Cerrar Sesión</button>
      <div class="variant-filled-primary arrow" />
    </div>
  {/if}
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
