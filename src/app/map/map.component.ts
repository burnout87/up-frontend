import { Component, OnInit, SimpleChanges, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { ConnectivityService } from '../connectivity.service';
import { MarkerManager, AgmMap, LatLngBounds, LatLng } from "@agm/core";
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
  public markersData:any[] = [];
  public isBrowser: boolean;

  private bounds: any;
  public geoLocation:Location;

  @ViewChild('AgmMap', {static: false}) agmMap: AgmMap;

  constructor(private route: ActivatedRoute, private wsService: ConnectivityService, private markerManager: MarkerManager, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.geoLocation = {
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

  
  buildMarker(markerData:any) {
    // let marker = new MapMarker(this.markerManager);
    var marker:Marker = {
      lat: Number(markerData.coords.lat),
      lng: Number(markerData.coords.lng),
      label: markerData.title,
      categ: markerData.categ,
      iconUrl: "",
      isOnMap: false,
      _id: markerData._id
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
    this.markers.push(marker);
  }

  ngOnInit() { 
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }

  ngAfterViewInit () {
    // print the bounding box
    // this.agmMap.boundsChange.subscribe((bounds:LatLngBounds) => {
    //   // LatLngBounds: An immutable class representing a latitude/longitude aligned rectangle.
    //   // console.log(bounds);
    // });
    // markerData are pre-fetched
    this.markersData = this.route.snapshot.data['markers'];
    // var ids = this.markersData.filter(x => x._id && x.coords).map(() => this.buildMarker);
    // var results = Promise.all(ids);
    // results.then(data => console.log);
    // (async () => {
      this.markersData.forEach((markerData: any)  => {
        if(markerData && markerData.coords) {
            this.buildMarker(markerData);
        }
      });
    // })();
  }

  getInfoMarker(m: Marker, gm, infoWindow) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

  boundsChangeEvent(event) {
    this.bounds = event;
  };

  tilesLoadedEvent() {
    this.markers
      .filter(x => 
        !x.isOnMap && 
        this.bounds.contains({lat: Number(x.lat), lng:Number(x.lng)}))
      .forEach(x => x.isOnMap = true);
  }

  hideInfo(gm, event) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
  }

  setPosition(position) {
    this.geoLocation.latitude = position.coords.latitude;
    this.geoLocation.longitude = position.coords.longitude;
    console.log(position.coords);
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
  lat?: number;
  lng?: number;
  label?: string;
  categ?: string;
  iconUrl?: string;
  description?: string;
  isOnMap: boolean;
  _id: string;
}