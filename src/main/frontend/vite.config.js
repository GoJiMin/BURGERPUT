import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    watch: {
      usePolling: true,
    },
    port: 3000,
    https: true,
    proxy: {
      "/back": {
        target: "https://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});