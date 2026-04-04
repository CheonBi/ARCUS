import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    visualizer({
      open: true,
    }),
  ],
  esbuild: {
    drop: ["console"],
  },

  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",

    cssCodeSplit: true,
    rollupOptions: {
      input: {},
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",

        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }

            if (/[\\/]node_modules[\\/](recharts|d3-[^\\/]+)/.test(id)) {
              return "vendor-charts";
            }

            if (id.includes("zustand") || id.includes("@tanstack")) {
              return "vendor-state";
            }
          }
        },
      },
    },
  },
});
