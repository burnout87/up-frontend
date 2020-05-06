import { Component, OnInit } from '@angular/core';
import { Piattaforma } from '../piattaforma/piattaforma';
import { ConnectivityService } from '../connectivity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-piattaforme',
  templateUrl: './piattaforme.component.html',
  styleUrls: ['./piattaforme.component.scss']
})
export class PiattaformeComponent implements OnInit {

  public piattaforme: Piattaforma[] = [];

  constructor(private route: ActivatedRoute, private wsService: ConnectivityService) { 
    const dataPiattaforme = this.route.snapshot.data['platforms'];
    this.populatePiattaforme(dataPiattaforme);
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
        urlImg:  dataPiattaforma.urlImg
      }
      this.piattaforme.push(piattaforma);
    });
  }

}
