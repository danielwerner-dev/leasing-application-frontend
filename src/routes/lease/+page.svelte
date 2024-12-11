<script lang="ts">
  import LeasingApplication from "$lib/components/LeasingApplication/LeasingApplication.svelte";

  import type { PageData } from "./$types";

  export let data: PageData;
  const { customer, property } = data;
</script>

<LeasingApplication {customer} {property} application={null} />
