import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule, MarkerManager, GoogleMapsAPIWrapper, Marker } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { AppRoutingModule , RoutingComponents} from './app-routing.module';
import { AppComponent } from './app.component';

import { ShareButtonsModule } from '@ngx-share/buttons';

import { ConnectivityService } from './connectivity.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material.modules';
import { SafeHtmlPipe } from './safe-html.pipe';
import { FormsModule } from '@angular/forms';

import { EllipsisModule } from 'ngx-ellipsis';
import { DefaultImageDirective } from './default-image.directive';
import { LazyLoadDirective } from './lazy-load.directive';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    SafeHtmlPipe,
    DefaultImageDirective,
    LazyLoadDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    EllipsisModule,
    FormsModule,
    AgmJsMarkerClustererModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgbhE4JU0eLfjTogXctQkSZIEh-3x5Q-4',
      libraries: ['places', 'geometry']
    }),
    BrowserAnimationsModule
  ],
  providers: [ConnectivityService, MarkerManager, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }