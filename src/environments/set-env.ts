const setEnv = (targetPath: string, platform: string, production: boolean) => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const appVersion = require('../../package.json').version;
  const envConfigFile = `export const environment = {
  appVersion: "${appVersion}",
  production: ${production},
  platform: "${platform}",
  firebase: {
    apiKey:  "${process.env.FIREBASE_API_KEY}",
    authDomain: "themacrodiet-s.firebaseapp.com",
    databaseURL: "https://macrozilla-maintenance.europe-west1.firebasedatabase.app",
    projectId: "themacrodiet-s",
    storageBucket: "themacrodiet-s.appspot.com",
    messagingSenderId: "399063775779",
    appId: "1:399063775779:web:e818788f00053fe3dd8f96",
    measurementId: "G-12QBZF0L1E"
  }
};
`;
  //console.log('The file `environment.ts` will be written with the following content: \n');
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.log(targetPath + " file NOT generated correctly");
      //console.error(err);
      throw err;
    } else {
      console.log(targetPath + " file generated correctly");
      //console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
  });
};

setEnv('./src/environments/environment.ts','web', false);
setEnv('./src/environments/environment.prodWeb.ts','web', true);
setEnv('./src/environments/environment.prodAndroid.ts','android', false);