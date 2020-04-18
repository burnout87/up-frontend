import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { MarkerManager, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { AppRoutingModule , routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ProviderComponent } from './provider/provider.component';
import { DomandeComponent } from './domande/domande.component';
import { ConnectivityService } from './connectivity.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material.modules';
import { AiutaciComponent } from './aiutaci/aiutaci.component';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ProviderComponent,
    routingComponents,
    AiutaciComponent,
    HomeComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule,
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
