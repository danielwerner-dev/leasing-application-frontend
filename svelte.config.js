import preprocess from "svelte-preprocess";

import node from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    appDir: "_lease",
    adapter: node(),
    // TODO: CDEC-2572 How to have granular CSRF policies in LAD
    csrf: {
      checkOrigin: false,
    },
  },
};

export default config;
