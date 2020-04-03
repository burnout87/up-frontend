import { Component, OnInit } from '@angular/core';
import { NEGOZIANTI } from '../mocked-negozianti'
import { Negoziante } from '../negoziante';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-negoziante',
  templateUrl: './negoziante.component.html',
  styleUrls: ['./negoziante.component.css']
})
export class NegozianteComponent implements OnInit {

  negozianti = NEGOZIANTI;
  url: String;
  negoziante: Negoziante;

  constructor(private route: ActivatedRoute, private location: Location) {
    const id = this.route.snapshot.paramMap.get('id');
    this.negoziante = this.findNegById(id);
    this.url = this.location.path();
  }

  ngOnInit() {
  }

  findNegById(negId: string): Negoziante {
    return this.negozianti.find(product => product.id === negId);
  }

}
