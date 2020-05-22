// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  posts: 'https://unitipossiamo.it/wp-json/wp/v2/posts',
  media: 'https://unitipossiamo.it/wp-json/wp/v2/media',
  stores: 'http://15.236.113.180:4000/api/negozianti',
  platforms: 'http://15.236.113.180:4000/api/platforms',
  readyData: 'http://15.236.113.180:4000/api/readydata',
  rawData:'http://15.236.113.180:4000/api/rawData'

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