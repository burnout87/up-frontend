import { enableProdMode } from '@angular/core';

import { AppServerModule } from './app/app.server.module';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}
// // for testing purposes with ssl on localhost
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export { AppServerModule } from './app/app.server.module';
export { ngExpressEngine } from "@nguniversal/express-engine";
export { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";
