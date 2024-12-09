import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Ensure Vite listens on all network interfaces
    port: 5173,  // Make sure the port is 5173
    proxy: {
      '/api': {
        target: 'http://localhost:3001',  // Adjust the API proxy if necessary
        changeOrigin: true,
      },
    },
  },
});
