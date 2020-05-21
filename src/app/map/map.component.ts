import { Component, OnInit, SimpleChanges, Inject, PLATFORM_ID, ViewChild, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { ConnectivityService } from '../connectivity.service';
import { MarkerManager, AgmMap, LatLngBounds, LatLng, MapsAPILoader, AgmMarker } from "@agm/core";
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
// import { MapMarker } from '../marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  public isS;

  public location: Location;
  public markers: Marker[] = [];
  public markersData:any[] = [];
  public isBrowser: boolean;
  public categsSelected: string[] = [];
  public servicesSelected: string[] = [];

  private bounds: any;
  public geoLocation:Location;

  @ViewChild('AgmMap', {static: false}) agmMap: AgmMap;

  constructor(private ngZone: NgZone, private route: ActivatedRoute, private wsService: ConnectivityService, private markerManager: MarkerManager, @Inject(PLATFORM_ID) platformId: Object, private breakpointObserver: BreakpointObserver) {
    
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
    if(this.markersData) {
      this.ngZone.run(() => {
        (async () => {
          this.markersData.forEach((markerData: any)  => {
            if(markerData && markerData.coords) {
                this.buildMarker(markerData);
            }
          });
        })();
      });
    }
    this.geoLocation = {
      zoom: 13,
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
    var marker:Marker = {
      lat: Number(markerData.coords.lat),
      lng: Number(markerData.coords.lng),
      label: markerData.title,
      categ: markerData.categ,
      mainCateg: markerData.mainCateg?markerData.mainCateg:"altro",
      service: markerData.service?markerData.service:"delivery",
      iconUrl: "",
      link: markerData.link?markerData.link:"",
      isOnMap: false,
      address: markerData.address,
      _id: markerData._id,
      coupon: markerData.coupon,
      descr: markerData.descr?markerData.descr:"",
      // true -> filtered, retained, so not visualized
      filtered: false
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
    
    // if(navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    // }
  }

  ngAfterViewInit () { 
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
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
    this.ngZone.run(() => {
      this.markers
        .filter(x => 
          !x.isOnMap && 
          !x.filtered &&
          this.bounds.contains({lat: Number(x.lat), lng:Number(x.lng)}))
        .forEach(x => x.isOnMap = true);
      });
  }

  filterService(service: string) : Promise<any>  {
    if(this.servicesSelected.indexOf(service) > -1)
      this.servicesSelected = this.servicesSelected.filter(c => c !== service);
    else
      this.servicesSelected.push(service);
    return new Promise( (resolve, reject) => {
      this.filter();
      resolve();
    });
  }

  filterCategory(categ: string) : Promise<any> {
    if(this.categsSelected.indexOf(categ) > -1) // de-selection
      this.categsSelected = this.categsSelected.filter(c => c !== categ);
    else // selection
      this.categsSelected.push(categ);

    return new Promise( (resolve, reject) => {
      this.filter();
      resolve();
    });
  }

  private filter() {
    this.markers
    .filter(x => 
      this.bounds.contains({lat: Number(x.lat), lng:Number(x.lng)})
    )
    .forEach(x => {
      if( (this.servicesSelected.length == 0 && this.categsSelected.length == 0) || 
      (this.categsSelected.indexOf(x.mainCateg) > -1 && this.servicesSelected.indexOf(x.service) > -1) ||
      (this.servicesSelected.length == 0 && this.categsSelected.indexOf(x.mainCateg) > -1) || 
      (this.categsSelected.length == 0 && this.servicesSelected.indexOf(x.service) > -1)) { 
        // display over the map
        x.filtered = false;
        x.isOnMap = true;
      }
      else { // hide it
        x.filtered = true;
        x.isOnMap = false;
      }
    } );

    this.markers
    .filter(x => 
      !this.bounds.contains({lat: Number(x.lat), lng:Number(x.lng)})
    )
    .forEach(x => {
      if( (this.servicesSelected.length == 0 && this.categsSelected.length == 0) || 
      (this.categsSelected.indexOf(x.mainCateg) > -1 && this.servicesSelected.indexOf(x.service) > -1) ||
      (this.servicesSelected.length == 0 && this.categsSelected.indexOf(x.mainCateg) > -1) || 
      (this.categsSelected.length == 0 && this.servicesSelected.indexOf(x.service) > -1)) {
        x.filtered = false;
      }
      else {
        x.filtered = true;
      }
    } );
  }

  public getBounds() {
    return this.bounds;
  }


  hideInfo(gm, event) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
  }

  public setPosition(position) {
    this.geoLocation.latitude = position.coords.latitude;
    this.geoLocation.longitude = position.coords.longitude;
  }

  public centerMap(lat: number, lng: number, zoom: number) {
    this.geoLocation.latitude = lat;
    this.geoLocation.longitude = lng;
    this.geoLocation.zoom = zoom;
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
  filtered: boolean;
  mainCateg?: string;
  service?: string;
  link?: string;
  address?: string;
  descr?: string;
}