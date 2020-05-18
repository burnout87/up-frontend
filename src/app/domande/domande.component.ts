import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-domande',
  templateUrl: './domande.component.html',
  styleUrls: ['./domande.component.scss']
})
export class DomandeComponent implements OnInit {

  public isS;
  public isM;
  public isL;
  public isXL;

  public panelOpenState1: boolean;
  public panelOpenState2: boolean;
  public panelOpenState3: boolean;
  public panelOpenState4: boolean;
  public panelOpenState5: boolean;
  public panelOpenState6: boolean;
  public panelOpenState7: boolean;
  public panelOpenState8: boolean;
  public panelOpenState9: boolean;
  public panelOpenState10: boolean;
  public panelOpenState11: boolean;
  public panelOpenState12: boolean;

  constructor( private breakpointObserver: BreakpointObserver ) { 

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

  }

  ngOnInit() {
  }

}
