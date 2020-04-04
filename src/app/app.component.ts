import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'upFrontend';
  router: Router;
  isBrowser: boolean;
  latitude = 41.6650266;
  longitude = 12.8701779;
  mapType = 'roadmap'; //types https://mkyong.com/google-maps/google-maps-api-map-types-example/
  zoom = 5;

  ngOnInit() {
          this.location = {
            markers : [{
                          lat: 41.6650266,
                          lng: 12.8701779
                      }]
          }
        }

  constructor(private _router: Router, @Inject(PLATFORM_ID) platformId: Object){
    this.isBrowser = isPlatformBrowser(platformId);
    this.router = _router;
  }

}

interface Marker {
    lat: number;
    lng: number;
}

interface Location {
    latitude: number;
    longitude: number;
    mapType: ?string;
    zoom: ?number;
    marker: Marker;
}
