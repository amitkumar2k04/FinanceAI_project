import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
// Vite loads environment variables prefixed with `VITE_` into `import.meta.env` by default.
// However, the dev server proxy needs access to `VITE_BACKEND_URL` at build time.  We
// use `loadEnv` to read the appropriate `.env` files based on the current mode
// (development, production, etc.).  This avoids requiring an explicit dependency on
// `dotenv` in the frontend project.
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
