import { Component, OnInit, Inject, ViewChild, Input, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {MatChipInputEvent} from '@angular/material/chips';
import { MapsAPILoader } from '@agm/core';
import { MatFormField } from '@angular/material';


export interface Service {
  id: number;
  name: string;
  selected: boolean;
  ico: string;
  type: string;
}

export interface Categorie {
  id: number;
  name: string;
  selected: boolean;
  ico: string;
  mainCateg: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'upFrontend';
  router: Router;
  isBrowser: boolean;
  searchBox;

  value = '';
  public selected: boolean;

  categories: Categorie[] = [
    {id: 1, name: 'Bar e Ristorazione', selected: false, ico: 'bar_ico', mainCateg: 'ristoranti e bar', },
    {id: 2, name: 'Alimentari', selected: false, ico: 'empty_ico', mainCateg: 'alimentari', },
    {id: 3, name: 'Turismo', selected: false, ico: 'empty_ico', mainCateg: 'turismo', },
    {id: 4, name: 'Giardinaggio ', selected: false, ico: 'empty_ico', mainCateg: 'giardinaggio', },
    {id: 5, name: 'Shopping', selected: false, ico: 'empty_ico', mainCateg: 'shopping', },
    {id: 6, name: 'Animali', selected: false, ico: 'empty_ico', mainCateg: 'animali', },
    {id: 7, name: 'Altro', selected: false, ico: 'empty_ico', mainCateg: 'altro', },
  ];

  services: Service[] = [
    {id: 1, name: 'consegna a domicilio', selected: false, ico: 'delivery_ico', type: "delivery",},
    {id: 2, name: 'buono coupon', selected: false, ico: 'coupon_ico', type: "coupon",},
  ];

  public isS;
  public isM;
  public isL;
  public isXL;
  public isC;

  @ViewChild(MapComponent, {static: false})
  private mapComp: MapComponent;

  @ViewChild('inputAddress', {static: false}) 
  private inputAddress: ElementRef;

  ngOnInit() { }

  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      this.searchBox = new google.maps.places.Autocomplete(this.inputAddress.nativeElement);
      this.searchBox.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = this.searchBox.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
  
          this.mapComp.centerMap(place.geometry.location.lat(), place.geometry.location.lng())
        });
      });
    });
    
    // this.searchBox.addListener('places_changed', function() {
    //   var places = this.searchBox.getPlaces();

    //   if (places.length == 0) {
    //     return;
    //   }

    //   var bounds = this.mapComp.getBounds();
    // });
  }

  constructor(private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, private _router: Router, @Inject(PLATFORM_ID) platformId: Object, private breakpointObserver: BreakpointObserver, @Inject(DOCUMENT) document){
    this.isBrowser = isPlatformBrowser(platformId);
    this.router = _router;

    this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.HandsetPortrait])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isS = true;
      } else {
        this.isS = false;
      }
    });

    this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.Medium])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isM = true;
      } else {
        this.isM = false;
      }
    });

    this.breakpointObserver
    .observe([Breakpoints.Large])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isL = true;
      } else {
        this.isL = false;
      }
    });

    this.breakpointObserver
    .observe([Breakpoints.XLarge])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isXL = true;
      } else {
        this.isXL = false;
      }
    });

    this.breakpointObserver
    .observe(['(max-width: 800px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isC = true;
      } else {
        this.isC = false;
      }
    });

  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  filterCategory() {
    this.mapComp.filterCategory('ristorante');
  }

  public onSelectC(cat: Categorie): void {
    cat.selected = !cat.selected;
    this.mapComp.filterCategory(cat.mainCateg);
  }

  public onSelectS(ser: Service): void {
    ser.selected = !ser.selected;
    this.mapComp.filterService(ser.type);
  }

}
