// astro.config.mjs
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

export default defineConfig({
  integrations: [
    netlify({
      // for Netlify Functions (serverless) use default options,
      // or use netlify({ edge: true }) for edge functions if needed
    }),
  ],
});
