import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'tap-app',
  webDir: 'dist',
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
