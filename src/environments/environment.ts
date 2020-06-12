// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api/',
  firebase: {
    apiKey: 'AIzaSyB55zwSA67kY8yRXGKok6Qo0KYxVHs77gI',
    authDomain: 'flour-mill-map.firebaseapp.com',
    databaseURL: 'https://flour-mill-map.firebaseio.com',
    projectId: 'flour-mill--map',
    storageBucket: 'flour-mill--map.appspot.com',
    messagingSenderId: '736945489691',
    appId: '1:736945489691:web:3fa6ac863196dffb53f5be',
    measurementId: 'G-X202XD53M'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
