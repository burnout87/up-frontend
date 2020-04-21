import { Component, OnInit, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { ConnectivityService } from '../connectivity.service';
import { MarkerManager, AgmMarker, Marker, GoogleMapsAPIWrapper } from "@agm/core";
import { ActivatedRoute } from '@angular/router';
import { MapMarker } from '../marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  public location: Location;
  public markers: MapMarker[] = [];
  public isBrowser: boolean;

  constructor(private route: ActivatedRoute, private wsService: ConnectivityService, private markerManager: MarkerManager, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.location = {
      zoom: 5,
      latitude: 41.6650266,
      longitude: 12.8701779,
      mapType:'roadmap'
    };
  }
  


  addMarker(markerData) {
    let marker = new MapMarker(this.markerManager);
    // let marker = new AgmMarker(this.markerManager);
    marker.latitude = Number(markerData.coords.lat);
    marker.longitude = Number(markerData.coords.lng);
    marker.label = markerData.title;
    marker.categ = markerData.categ;
    var categ = (markerData.categ).toLowerCase();
    // if(fs.existsSync("/assets/markerIcons/" + categ + ".png"))
    marker.iconUrl = "/assets/markerIcons/" + categ + ".png";
    this.markerManager.addMarker(marker);
    this.markers.push(marker);
  }

  ngOnInit() {
    // markerData are pre-fetched
    var markersData = this.route.snapshot.data['markers'];
    markersData.forEach((markerData: any)  => {
        if(markerData && markerData.coords) {
            this.addMarker(markerData);
        }
      });
  }

  public cleanMap() { }

  getInfoMarker(m: MapMarker, gm, infoWindow) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    console.log(m);
    infoWindow.open();
  }

  hideInfo(gm, event){
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
  }

}

interface Location {
    latitude: number;
    longitude: number;
    mapType: string;
    zoom: number;
}
