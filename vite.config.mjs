import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import path from 'path';

const resolvePath = (str) => path.resolve(__dirname, str);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = `${env.VITE_APP_BASE_NAME}`;
  const PORT = 3000;
  const BACKEND_URL = env.VITE_BACKEND_URL || 'http://69.62.73.201:3000'; // Default backend URL

  return {
    server: {
      open: true,
      port: PORT,
      host: true,
      // Add proxy configuration
      proxy: {
        '/api': {
          target: BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false // Only if you're using self-signed certificates
        },
        '/socket.io': {
          target: BACKEND_URL,
          ws: true // For websocket connections
        }
      }
    },
    preview: {
      open: true,
      host: true,
      // Proxy for preview server as well
      proxy: {
        '/api': {
          target: BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    define: {
      global: 'window',
      // Expose backend URL to your application
      __BACKEND_URL__: JSON.stringify(BACKEND_URL)
    },
    resolve: {
      alias: [
        // { find: '', replacement: path.resolve(__dirname, 'src') },
        // {
        //   find: /^~(.+)/,
        //   replacement: path.join(process.cwd(), 'node_modules/$1')
        // },
        // {
        //   find: /^src(.+)/,
        //   replacement: path.join(process.cwd(), 'src/$1')
        // }
        // {
        //   find: 'assets',
        //   replacement: path.join(process.cwd(), 'src/assets')
        // },
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false
        },
        less: {
          charset: false
        }
      },
      charset: false,
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
    build: {
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        input: {
          main: resolvePath('index.html'),
          legacy: resolvePath('index.html')
        }
      }
    },
    base: API_URL,
    plugins: [react(), jsconfigPaths()]
  };
});
