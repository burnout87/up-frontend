import { Component, OnInit, SimpleChanges, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { ConnectivityService } from '../connectivity.service';
import { MarkerManager, AgmMap, LatLngBounds } from "@agm/core";
import { ActivatedRoute } from '@angular/router';
// import { MapMarker } from '../marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  public location: Location;
  public markers: Marker[] = [];
  public isBrowser: boolean;

  @ViewChild('AgmMap', {static: false}) agmMap: AgmMap;

  constructor(private route: ActivatedRoute, private wsService: ConnectivityService, private markerManager: MarkerManager, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.location = {
      zoom: 10,
      latitude: 41.6650266,
      longitude: 12.8701779,
      mapType:'roadmap',
      scrollwheel: false,
      clickableIcons: false,
      styles: [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }, { saturation: -100 } ]
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }, { saturation: -100 } ]
        },
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [{ saturation: -100 } ]
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 } ]
        },
        {
          featureType: "water",
          elementType: 'geometry.fill',
          stylers: [{color: '#C7E5FD'}]
        }
      ]
    };
  }

  
  addMarker(markerData:any) {
    // let marker = new MapMarker(this.markerManager);
    var marker = {
      latitude: Number(markerData.coords.lat),
      longitude: Number(markerData.coords.lng),
      label: markerData.title,
      categ: markerData.categ,
      iconUrl: ""
    }
    // if(markerData.categ) {
    //   var categ = markerData.categ ?(markerData.categ).toLowerCase() :"";
    //   marker.iconUrl = "/assets/markerIcons/" + categ + ".png";
    // }
    if(markerData.coupon) {
      marker.iconUrl = "/assets/markerIcons/up_icon_geoloc_purple.svg";
    } else {
      marker.iconUrl = "/assets/markerIcons/up_icon_geoloc_yellow.svg";
    }
    // this.markerManager.addMarker(marker);
    this.markers.push(marker);
  }

  ngOnInit() { }

  ngAfterViewInit () {
    // print the bounding box
    // this.agmMap.boundsChange.subscribe((bounds:LatLngBounds) => {
    //   // LatLngBounds: An immutable class representing a latitude/longitude aligned rectangle.
    //   // console.log(bounds);
    // });
    // markerData are pre-fetched
    var markersData = this.route.snapshot.data['markers'];
    (async () => {

      markersData.forEach((markerData: any)  => {
        if(markerData && markerData.coords) {
            this.addMarker(markerData);
        }
      });
    })();
  }

  getInfoMarker(m: Marker, gm, infoWindow) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    console.log(m);
    infoWindow.open();
  }

  hideInfo(gm, event) {
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
    scrollwheel: boolean;
    clickableIcons: boolean;
    styles: any[];
}

interface Marker {
  latitude?: Number;
  longitude?: Number;
  label?: string;
  categ?: string;
  iconUrl?: string;
  description?: string;
}