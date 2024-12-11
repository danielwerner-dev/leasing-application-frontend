import { sveltekit } from "@sveltejs/kit/vite";
import basicSSL from "@vitejs/plugin-basic-ssl";

import "./config/check-environment.js";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), basicSSL()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
};

export default config;
