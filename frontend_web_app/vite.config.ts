import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function buildReactAppEnvDefine(mode: string) {
  const env = loadEnv(mode, process.cwd(), '');
  // Map REACT_APP_* to import.meta.env.REACT_APP_* and also window.__ENV__ for runtime reference if needed.
  const reactAppKeys = Object.keys(env).filter((k) => k.startsWith('REACT_APP_'));
  const define: Record<string, any> = {
    'process.env': {} // avoid code that references process.env from crashing
  };
  reactAppKeys.forEach((k) => {
    define[`import.meta.env.${k}`] = JSON.stringify(env[k]);
  });
  return define;
}

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      host: true, // equivalent to 0.0.0.0
      port: 3000,
      strictPort: true // do not auto-prompt to use another port
    },
    preview: {
      host: true,
      port: 3000,
      strictPort: true
    },
    define: {
      ...buildReactAppEnvDefine(mode)
    }
  };
});
