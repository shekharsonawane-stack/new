import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['supabase/functions/**/*']
  },
  build: {
    rollupOptions: {
      external: [
        // Exclude all server-side files from the build
        /^.*\/supabase\/functions\/.*/,
      ]
    }
  },
  resolve: {
    alias: {
      // Prevent resolution of server files
      '/supabase/functions/server': '/dev/null',
    }
  },
  server: {
    fs: {
      // Don't serve files from supabase functions directory
      deny: ['**/supabase/functions/**']
    }
  }
});
