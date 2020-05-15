import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Services {
  id: number;
  name: string;
  selected: boolean;
}

export interface Categories {
  id: number;
  name: string;
  selected: boolean;
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

  value = '';
  public selected: boolean;

  categories: Categories[] = [
    {id: 1, name: 'Bar e Ristorazione', selected: false},
    {id: 2, name: 'Birrerie e Pub', selected: false},
    {id: 3, name: 'Palestre e Benessere', selected: false},
    {id: 4, name: 'Librerie e Cartolerie', selected: false},
    {id: 5, name: 'Abbigliamento', selected: false},
  ];

  services: Services[] = [
    {id: 1, name: 'consegna a domicilio', selected: false},
    {id: 2, name: 'buono coupon', selected: false},
  ];

  public isS;
  public isM;
  public isL;
  public isC;

  @ViewChild(MapComponent, {static: false})
  private mapComp: MapComponent;

  ngOnInit() { }

  constructor(private _router: Router, @Inject(PLATFORM_ID) platformId: Object, private breakpointObserver: BreakpointObserver){
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
    .observe([Breakpoints.Large, Breakpoints.XLarge])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isL = true;
      } else {
        this.isL = false;
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

  filterCoupon() {
    this.mapComp.filterCoupon();
  }

  filterCategory() {
    this.mapComp.filterCategory('ristorante');
  }

  public onSelectC(cat: Categories): void {
    cat.selected = !cat.selected;
  }

  public onSelectS(ser: Services): void {
    ser.selected = !ser.selected;
  }

}
