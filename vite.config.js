import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // لتفعيل PWA في development mode
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}']
      },
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Net Film App",
        short_name: "NF",
        description: "Browse and manage your favorite movies",
        theme_color: "#dc3545",
        background_color: "#111111",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/NF-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/NF-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/NF-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
