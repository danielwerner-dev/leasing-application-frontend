<script lang="ts">
  import AppError from "$lib/components/ErrorPages/AppError.svelte";
  import NotFound from "$lib/components/ErrorPages/NotFound.svelte";

  import { page } from "$app/stores";
</script>

{#if $page.status === 404}
  <NotFound />
{:else}
  <AppError />
{/if}
