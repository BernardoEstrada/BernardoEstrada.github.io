import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [
    react(),
    {
      name: "scoped-assets-resolver",
      enforce: "pre",
      resolveId(source, importer) {
        const allowedSources = ["assets"];
        const start = source.split("/")[0];
        const firstChar = start.charAt(0);
        if (firstChar !== "@") return undefined;
        const wantedSource = start.slice(1);
        if (!allowedSources.includes(wantedSource)) return undefined;

        if (!importer) return undefined;
        const root = __dirname;
        const codeRoot = path.resolve(root, "src");
        const importerDir = path.dirname(importer);
        if (!importerDir.startsWith(`${codeRoot}/`)) return undefined;
        const relativePath = source.slice(wantedSource.length + 2);

        let currentDir = importerDir;
        let lastCandidate: string | null = null;
        while (currentDir.startsWith(codeRoot)) {
          const wantedDir = path.join(currentDir, wantedSource);
          const candidate = path.join(wantedDir, relativePath);
          if (fs.existsSync(candidate)) return candidate;
          // Remember where an "assets" dir exists even if this file doesn't yet
          if (fs.existsSync(wantedDir) && !lastCandidate) lastCandidate = candidate;

          const parent = path.dirname(currentDir);
          if (parent === currentDir) break; // reached filesystem root
          currentDir = parent;
        }
        if (lastCandidate) return lastCandidate;
        return undefined;
      },
    },
  ],

  build: {
    minify: true,
    target: "es2015",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return;
          // Core runtime: keep React and router in dedicated chunks
          if (id.includes("react-dom") || id.includes("/react/")) return "react";
          if (id.includes("react-router")) return "router";
          // One chunk per npm package (scope/pkg -> scope-pkg) for smaller, cache-friendly chunks
          const match = id.match(/node_modules[\\/](?:@([^/]+)[\\/]([^/]+)|([^/]+))/);
          if (!match) return "vendor";
          const pkg = match[1] ? `${match[1]}-${match[2]}` : match[3]; // @nivo/core -> nivo-core, react-helmet -> react-helmet
          return pkg;
        },
      },
    },
  },
  resolve: {
    alias: {
      "@global-assets": path.resolve(__dirname, "src/assets"),
      "@data": path.resolve(__dirname, "src/data"),
      "@types": path.resolve(__dirname, "src/types"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@services": path.resolve(__dirname, "src/services"),
      "@theme": path.resolve(__dirname, "src/theme"),
      "@portfolios": path.resolve(__dirname, "src/portfolios"),
    },
  },
});
