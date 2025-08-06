import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import runtimeErrorOverlay from "replit/vite-plugin-runtime-error-modal";

export default async function () {
  const cartographer =
    process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? (await import("replit/vite-plugin-cartographer")).cartographer()
      : null;

  return defineConfig({
    root: "./client",
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...(cartographer ? [cartographer] : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client/src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.**"],
      },
    },
  });
}
