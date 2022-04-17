// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  appVersion: require('../../package.json').version,
  production: false,
  firebase: {
    apiKey: "AIzaSyB3ZV0ywK9bv1hZn1oEoJaBtwJ7wVT2CEk",
    authDomain: "themacrodiet-s.firebaseapp.com",
    databaseURL: "https://macrozilla-maintenance.europe-west1.firebasedatabase.app",
    projectId: "themacrodiet-s",
    storageBucket: "themacrodiet-s.appspot.com",
    messagingSenderId: "399063775779",
    appId: "1:399063775779:web:e818788f00053fe3dd8f96",
    measurementId: "G-12QBZF0L1E"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
