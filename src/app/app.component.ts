import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'upFrontend';
  router: Router;
  isBrowser: boolean;
  latitude = -28.68352;
  longitude = -147.20785;
  mapType = 'terrain';
  zoom = 5;

  constructor(private _router: Router, @Inject(PLATFORM_ID) platformId: Object){
    this.isBrowser = isPlatformBrowser(platformId);
    this.router = _router; 
  }

}
