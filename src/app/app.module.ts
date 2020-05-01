import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule, MarkerManager, GoogleMapsAPIWrapper, Marker } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import {  } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { AppRoutingModule , routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';

import { ShareButtonsModule } from '@ngx-share/buttons';

import { MapComponent } from './map/map.component';
import { ConnectivityService } from './connectivity.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material.modules';
import { AiutaciComponent } from './aiutaci/aiutaci.component';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';
import { SafeHtmlPipe } from './safe-html.pipe';

import { EllipsisModule } from 'ngx-ellipsis';
import { PiattaformeComponent } from './piattaforme/piattaforme.component';
import { PiattaformaComponent } from './piattaforma/piattaforma.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    routingComponents,
    AiutaciComponent,
    HomeComponent,
    MemberComponent,
    SafeHtmlPipe,
    PiattaformeComponent,
    PiattaformaComponent
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
    AgmJsMarkerClustererModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgbhE4JU0eLfjTogXctQkSZIEh-3x5Q-4'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    }),
    BrowserAnimationsModule
  ],
  providers: [ConnectivityService, MarkerManager, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
