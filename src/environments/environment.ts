// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  posts: 'https://unitipossiamo.it:8443/wp-json/wp/v2/posts',
  media: 'https://unitipossiamo.it:8443/wp-json/wp/v2/media',
  stores: 'https://www.unitipossiamo.it/api/negozianti',
  platforms: 'https://www.unitipossiamo.it/api/platforms',
  readyData: 'https://www.unitipossiamo.it/api/readydata',
  rawData:'https://www.unitipossiamo.it/api/rawData'

  // stores: 'https://localhost:4001/api/negozianti',
  // readyData: 'https://localhost:4001/api/readydata',
  // rawData:'https://localhost:4001/api/rawdata',
  // platforms: 'https://localhost:4001/api/platforms',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


// <FilesMatch "\.(ttf|ttc|otf|eot|woff|woff2|font.css|css|js)$">
//     Header set Access-Control-Allow-Origin "*"
//     Header set Access-Control-Allow-Methods: "*"
//     Header set Access-Control-Allow-Headers: "*"
// </FilesMatch>