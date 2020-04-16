import { Component, OnInit } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';

@MatSliderModule ({
  selector: 'slider-overview-example',
  templateUrl: 'slider-overview-example.html',
  styleUrls: ['slider-overview-example.css'],
})
export class Button {}

@Component({
  selector: 'app-chi-siamo',
  templateUrl: './chi-siamo.component.html',
  styleUrls: ['./chi-siamo.component.css']
})
export class ChiSiamoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
