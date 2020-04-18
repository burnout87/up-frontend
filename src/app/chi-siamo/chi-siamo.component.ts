import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
// import { MatSliderModule } from '@angular/material/slider';
// import { MatCardModule } from '@angular/material/card';


// @MatSliderModule({
=======
import { MatSliderModule } from '@angular/material/slider';
import { MEMBRI } from '../mocked-members';
import { Member } from '../member';
// @MatSliderModule ({
>>>>>>> a0f64b1e1fa91e7cf012005c1bda576c25d87606
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
  styleUrls: ['./chi-siamo.component.css']
})
export class ChiSiamoComponent implements OnInit {

  membri:Member[] = MEMBRI;

  constructor() { }

  ngOnInit() {
    
  }

}
