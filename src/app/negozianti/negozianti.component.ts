import { Component, OnInit } from '@angular/core';
import { NEGOZIANTI } from '../mocked-negozianti'

@Component({
  selector: 'app-negozianti',
  templateUrl: './negozianti.component.html',
  styleUrls: ['./negozianti.component.css']
})
export class NegoziantiComponent implements OnInit {
  negozianti = NEGOZIANTI;

  constructor() { }

  ngOnInit() {
  }

}
