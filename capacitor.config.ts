import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eatmore.aPP',
  appName: 'Eatmore',
  webDir: 'build',
  bundledWebRuntime: false,
  // server:{
  //    url:'http://172.17.7.118:8100',
  //    cleartext: true
  //    },
  plugins: {

    SplashScreen: {

        launchShowDuration : 1000

    },
    GoogleAuth: {

      scopes: ["profile","email"],

      serverClientId: "608875526497-3fngsc9pt7ad18hvr2m7dlk1jd4futhe.apps.googleusercontent.com",

      forceCodeForRefreshToken: true,

    },

  }
};

export default config;
