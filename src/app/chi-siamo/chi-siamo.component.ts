import { Component, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MEMBRI } from '../mocked-members';
import { Member } from '../member';
import Typed from 'typed.js';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
// @MatSliderModule ({
//   selector: 'slider-overview-example',
//   templateUrl: 'slider-overview-example.html',
//   styleUrls: ['slider-overview-example.css'],
// })
// export class Button {}

// @MatCardModule({
//   selector: 'card-overview-example',
//   templateUrl: 'card-overview-example.html',
//   styleUrls: ['card-overview-example.css'],
// })

@Component({
  selector: 'app-chi-siamo',
  templateUrl: './chi-siamo.component.html',
  styleUrls: ['./chi-siamo.component.scss']
})
export class ChiSiamoComponent implements OnInit {

  membri:Member[] = MEMBRI;

  public isMax;

  constructor( private breakpointObserver: BreakpointObserver ) {

    this.breakpointObserver
    .observe(['(max-width: 990px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isMax = true;
      } else {
        this.isMax = false;
      }
    });

   }

  ngOnInit() {
    var typed = new Typed('#typed', {
      strings: [
        'Siamo ^1000 <span style="color:#593C8F"> imprenditori</span>', 
        'Siamo ^1000 <span style="color:#593C8F"> volontari</span>', 
        'Siamo ^1000 <span style="color:#593C8F"> marketers</span>', 
        'Siamo ^1000 <span style="color:#593C8F"> persone</span>',
        'Siamo ^1000 <span style="color:#593C8F"> designers</span>'
      ],
      loop: true,
      typeSpeed: 80
    });
  }

}
