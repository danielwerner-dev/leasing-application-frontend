<script lang="ts">
  import { Theme } from "@invitation-homes/svelte-ui";

  import DataDog from "$lib/components/Tracking/DataDog.svelte";
  import GoogleTagManager from "$lib/components/Tracking/GoogleTagManager.svelte";
  import { ClientConfig } from "$lib/config/environment.client";

  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  const { config, path } = data;

  ClientConfig.init(config?.env);
</script>

<svelte:head>
  <title>My Application - Invitation Homes</title>
</svelte:head>

<Theme>
  {#if ClientConfig.env.VITE_DD_RUM_ENABLED === "true"}
    <DataDog />
  {/if}
  {#if ClientConfig.env.VITE_GOOGLE_TAG_MANAGER_ENABLED === "true"}
    <GoogleTagManager {path} />
  {/if}

  <slot />
</Theme>
