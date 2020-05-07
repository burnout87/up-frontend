import { Component, OnInit, Inject, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SidenavService } from './_services/sidenav.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sidenav', {static: false}) public sidenav: MatSidenav;

  public isSmallScreen;
  public isOpen;

  title = 'upFrontend';
  router: Router;
  isBrowser: boolean;

  ngOnInit() { 
    
  }

  constructor(private _router: Router, @Inject(PLATFORM_ID) platformId: Object,
              private sidenavService: SidenavService,
              private breakpointObserver: BreakpointObserver,
  ){
    this.isBrowser = isPlatformBrowser(platformId);
    this.router = _router;

    this.breakpointObserver
    .observe(['(max-width: 800px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isSmallScreen = true;
      } else {
        this.isSmallScreen = false;
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
  }

  closeSide() {
    this.sidenavService.close();
    this.isOpen = this.sidenavService.isOpen;
  }


}
