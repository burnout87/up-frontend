import { Component, OnInit, Inject, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Router, NavigationEnd } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SidenavService } from './_services/sidenav.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContent } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sidenav', {static: false}) public sidenav: MatSidenav;
  @ViewChild('sidenavContent', {static: false}) public sidenavContent: MatSidenavContent;

  public isSmallScreen = true;
  public isXL;
  public isOpen;
  public contentContainer;

  title = 'upFrontend';
  isBrowser: boolean;

  ngOnInit() { 
      this._router.events.subscribe((evt) => {
          if (evt instanceof NavigationEnd) {
              // const contentContainer = this.isBrowser ? document.querySelector('.mat-sidenav-content') || window : document.querySelector('.mat-sidenav-content'); 
              // if(this.contentContainer)
              //   this.contentContainer.scrollTo(0, 0);
              var scrollOptions = {
                left: 0,
                top: 0
              };
              this.sidenavContent.scrollTo(scrollOptions);
          }
      });
   }

  constructor(private _router: Router, @Inject(PLATFORM_ID) platformId: Object,
              private sidenavService: SidenavService,
              private breakpointObserver: BreakpointObserver,
              @Inject(DOCUMENT) document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // this.contentContainer = document.querySelector('.mat-sidenav-content'); 

    this.breakpointObserver
    .observe(['(max-width: 800px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isSmallScreen = true;
      } else {
        this.isSmallScreen = false;
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
  }

  public ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  toggleSide() {
    this.sidenavService.toggle();
    this.isOpen = this.sidenavService.isOpen;
  }

  onResize() {
    this.sidenavService.close();
    this.isOpen = this.sidenavService.isOpen;
  }

  closeSide() {
    this.sidenavService.close();
    this.isOpen = this.sidenavService.isOpen;
  }


}
