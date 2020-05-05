import { Component, OnInit, Input } from '@angular/core';
import { Piattaforma } from './piattaforma';

@Component({
  selector: 'app-piattaforma',
  templateUrl: './piattaforma.component.html',
  styleUrls: ['./piattaforma.component.scss']
})
export class PiattaformaComponent implements OnInit {

  @Input() piattaforma:Piattaforma;

  constructor() { }

  ngOnInit() {
  }

}
