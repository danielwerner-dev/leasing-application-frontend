import { getClientConfiguration } from "$lib/config/environment.server";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url }) => {
  const config = getClientConfiguration();

  return {
    config,
    path: url.pathname,
  };
};
