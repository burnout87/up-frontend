import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private viewportScroller: ViewportScroller) { 
  }

  setScrollTop() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event: NavigationEnd) => {
        // window.scroll(0, 0);
        // this.viewportScroller.([0, 0]);
      });
    }
  }
}
