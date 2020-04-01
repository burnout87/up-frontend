import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  private map;
  private onChanges = new Subject<SimpleChanges>();

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  public cleanMap() {
    for(var i in this.map._layers) {
      if(this.map._layers[i] instanceof L.Polyline|| this.map._layers[i] instanceof L.Marker ) {
        try {
          this.map.removeLayer(this.map._layers[i]);
        }
        catch(e) {
            console.log("problem with " + e + this.map._layers[i]);
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.onChanges.next(changes);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 49.353756, 11.967361 ],
      zoom: 5
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    this.map.on('moveend', (e: any)=> {
      this.getMapBounds();
    })
  }

  getMapBounds() {
    // var width = this.map.getBounds().getEast() - this.map.getBounds().getWest();
    // var height = this.map.getBounds().getNorth() - this.map.getBounds().getSouth();

    return this.map.getBounds();
  }

}
