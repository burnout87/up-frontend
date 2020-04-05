import { Component, OnInit } from '@angular/core';
import { NEGOZIANTI } from '../mocked-negozianti'
import { Negoziante } from '../negoziante';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConnectivityService } from '../connectivity.service';

@Component({
  selector: 'app-negoziante',
  templateUrl: './negoziante.component.html',
  styleUrls: ['./negoziante.component.css']
})
export class NegozianteComponent implements OnInit {

  negozianti = NEGOZIANTI;
  negoziante: Negoziante;

  constructor(private route: ActivatedRoute, private location: Location, private wsService: ConnectivityService) {
    const storeId:any = this.route.snapshot.paramMap.get('id');
    this.wsService.getStore(storeId).subscribe((storeDB:any) => {
      if(storeDB.length == 1){
        storeDB = storeDB[0];
        this.negoziante = {
          id: storeDB.id,
          name: storeDB.name,
          type: storeDB.type,
          description: storeDB.description
        }
      }
    });
  }

  ngOnInit() {
  }

  findNegById(negId: string): Negoziante {
    return this.negozianti.find(product => product.id === negId);
  }

}
