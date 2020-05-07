import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  public isOpen = false;

  constructor() { }

  private sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
      this.sidenav = sidenav;
  }

  public open() {
      return this.sidenav.open();
  }

  public close() {
      this.sidenav.close();
      this.isOpen = !this.isOpen;
  }

  public toggle(): void {
  this.sidenav.toggle();
  this.isOpen = !this.isOpen;
 }

}
