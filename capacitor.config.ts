
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.387660825e054745ba28d052e84025b0',
  appName: 'morocco-legal-quiz-app',
  webDir: 'dist',
  server: {
    url: 'https://38766082-5e05-4745-ba28-d052e84025b0.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
    }
  }
};

export default config;
