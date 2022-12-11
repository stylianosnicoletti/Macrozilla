const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
// Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
// Load node modules
  const appVersion = require('../../package.json').version;
  const colors = require('colors');
// `environment.ts` file structure
  const envConfigFile = `export const environment = {
  appVersion: "${appVersion}",
  production: false,
  platform: "web",
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
  //console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.log("Angular environment.ts file NOT generated correctly");
      //console.error(err);
      throw err;
    } else {
      console.log("Angular environment.ts file generated correctly");
      //console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
    }
  });
};

const setEnvProdWeb = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
// Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.prodWeb.ts';
// Load node modules
  const appVersion = require('../../package.json').version;
  const colors = require('colors');
// `environment.ts` file structure
  const envConfigFile = `export const environment = {
  appVersion: "${appVersion}",
  production: true,
  platform: "web",
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
  //console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.log("Angular environment.ts file NOT generated correctly");
      //console.error(err);
      throw err;
    } else {
      console.log("Angular environment.ts file generated correctly");
      //console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
    }
  });
};


const setEnvProdAndroid = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
// Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.prodAndroid.ts';
// Load node modules
  const appVersion = require('../../package.json').version;
  const colors = require('colors');
// `environment.ts` file structure
  const envConfigFile = `export const environment = {
  appVersion: "${appVersion}",
  production: true,
  platform: "android",
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
  //console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.log("Angular environment.ts file NOT generated correctly");
      //console.error(err);
      throw err;
    } else {
      console.log("Angular environment.ts file generated correctly");
      //console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
    }
  });
};


setEnv();
setEnvProdWeb();
setEnvProdAndroid();