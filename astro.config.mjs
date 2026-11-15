// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://oksenichenkomaryna.github.io",
  // User site served at the domain root → no `base`. Custom domain later: update `site` + public/CNAME.
  trailingSlash: "always", // matches GitHub Pages directory output; internal links end with "/"
  integrations: [react(), sitemap({ filter: (page) => !page.includes("/styleguide") })],

  vite: {
    plugins: [tailwindcss()],
  },
});
