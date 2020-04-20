import { Component, OnInit } from '@angular/core';
import { NEGOZIANTI } from '../mocked-negozianti'
import { Negoziante } from '../negoziante';
import { ActivatedRoute } from '@angular/router';
import { ConnectivityService } from '../connectivity.service';

@Component({
  selector: 'app-negoziante',
  templateUrl: './negoziante.component.html',
  styleUrls: ['./negoziante.component.css']
})
export class NegozianteComponent implements OnInit {

  negozianti = NEGOZIANTI;
  negoziante: Negoziante;

  constructor(private route: ActivatedRoute, private wsService: ConnectivityService) {

    const storeId:any = this.route.snapshot.paramMap.get('id');
    const data:any = this.route.snapshot.data['negoziante'];
    this.negoziante = {
      id: data[0].id,
      name: data[0].name,
      type: data[0].type,
      description: data[0].description
    };
  }

  ngOnInit() {
  }

  findNegById(negId: string): Negoziante {
    return this.negozianti.find(product => product.id === negId);
  }

}
