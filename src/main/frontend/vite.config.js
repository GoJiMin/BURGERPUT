import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    port: 3000,
    proxy: {
      "/back": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
