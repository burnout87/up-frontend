import { Component, OnInit } from '@angular/core';
import { Piattaforma } from '../piattaforma/piattaforma';
import { ConnectivityService } from '../connectivity.service';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-piattaforme',
  templateUrl: './piattaforme.component.html',
  styleUrls: ['./piattaforme.component.scss']
})
export class PiattaformeComponent implements OnInit {

  public piattaforme: Piattaforma[] = [];

  // public isS;
  // public isM;
  // public isL;
  // public isXL;
  // public isC;

  constructor(private route: ActivatedRoute, private wsService: ConnectivityService, private breakpointObserver: BreakpointObserver) { 
    const dataPiattaforme = this.route.snapshot.data['platforms'];
    this.populatePiattaforme(dataPiattaforme);

    // this.breakpointObserver
    // .observe([Breakpoints.XSmall, Breakpoints.HandsetPortrait])
    // .subscribe((state: BreakpointState) => {
    //   if (state.matches) {
    //     this.isS = true;
    //   } else {
    //     this.isS = false;
    //   }
    // });

    // this.breakpointObserver
    // .observe([Breakpoints.Small, Breakpoints.Medium])
    // .subscribe((state: BreakpointState) => {
    //   if (state.matches) {
    //     this.isM = true;
    //   } else {
    //     this.isM = false;
    //   }
    // });

    // this.breakpointObserver
    // .observe([Breakpoints.Large])
    // .subscribe((state: BreakpointState) => {
    //   if (state.matches) {
    //     this.isL = true;
    //   } else {
    //     this.isL = false;
    //   }
    // });

    // this.breakpointObserver
    // .observe([Breakpoints.XLarge])
    // .subscribe((state: BreakpointState) => {
    //   if (state.matches) {
    //     this.isXL = true;
    //   } else {
    //     this.isXL = false;
    //   }
    // });

    // this.breakpointObserver
    // .observe(['(max-width: 700px)'])
    // .subscribe((state: BreakpointState) => {
    //   if (state.matches) {
    //     this.isC = true;
    //   } else {
    //     this.isC = false;
    //   }
    // });

  }

  ngOnInit() {
  }

  private populatePiattaforme(dataPiattaforme: []) {
    dataPiattaforme.forEach((dataPiattaforma:any) => {
      var piattaforma: Piattaforma = {
        name: dataPiattaforma.name,
        type: dataPiattaforma.type,
        desc: dataPiattaforma.desc,
        countBusiness: Number(dataPiattaforma.countBusiness),
        categs: dataPiattaforma.categs,
        areas: dataPiattaforma.areas,
        payments: dataPiattaforma.payments,
        urlImg:  dataPiattaforma.urlImg,
        link: dataPiattaforma.urlSite
      }
      this.piattaforme.push(piattaforma);
    });
  }

}
