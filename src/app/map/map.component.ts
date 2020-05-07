import { Component, OnInit, SimpleChanges, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { ConnectivityService } from '../connectivity.service';
import { MarkerManager, AgmMap, LatLngBounds, LatLng } from "@agm/core";
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
// import { MapMarker } from '../marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  public isS;

  public location: Location;
  public markers: Marker[] = [];
  public markersData:any[] = [];
  public isBrowser: boolean;

  private bounds: any;
  public geoLocation:Location;

  @ViewChild('AgmMap', {static: false}) agmMap: AgmMap;

  constructor(private route: ActivatedRoute, private wsService: ConnectivityService, private markerManager: MarkerManager, @Inject(PLATFORM_ID) platformId: Object, private breakpointObserver: BreakpointObserver) {
    
    this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.HandsetPortrait])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isS = true;
      } else {
        this.isS = false;
      }
    });    
    
    this.isBrowser = isPlatformBrowser(platformId);
    this.markersData = this.route.snapshot.data['markers'];
    (async () => {
      this.markersData.forEach((markerData: any)  => {
        if(markerData && markerData.coords) {
            this.buildMarker(markerData);
        }
      });
    })();
    this.geoLocation = {
      zoom: 11,
      latitude: 41.901588,
      longitude: 12.492305,
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
      _id: markerData._id,
      coupon: markerData.coupon
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

  ngAfterViewInit () { }

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

  filterCoupon() {
    this.markers
    .filter(x => 
      x.coupon &&
      this.bounds.contains({lat: Number(x.lat), lng:Number(x.lng)})
    )
    .forEach(x => x.isOnMap = !x.isOnMap);
  }

  filterCategory(categ: string) {
    this.markers
    .filter(x => 
      x.categ &&
      x.categ.toLowerCase() == categ.toLowerCase() &&
      this.bounds.contains({lat: Number(x.lat), lng:Number(x.lng)})
    )
    .forEach(x => x.isOnMap = !x.isOnMap);
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
  coupon: boolean;
}