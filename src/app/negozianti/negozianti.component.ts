import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from '../connectivity.service';
import { Negoziante } from '../negoziante';

@Component({
  selector: 'app-negozianti',
  templateUrl: './negozianti.component.html',
  styleUrls: ['./negozianti.component.css']
})
export class NegoziantiComponent implements OnInit {
  
  negozianti:Array<Negoziante> = new Array();

  constructor(private wsService: ConnectivityService) { 
    this.wsService.getStores().subscribe((storesDB:any) => {
      storesDB.forEach((storeDB: any)  => {
      var store:Negoziante = {
        id: storeDB.id,
        name: storeDB.name,
        type: storeDB.type,
        description: storeDB.description
      }
      this.negozianti.push(store);
    });
    });
    
  }

  ngOnInit() {
  }

}
