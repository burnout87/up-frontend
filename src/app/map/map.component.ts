import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  private map;
  private onChanges = new Subject<SimpleChanges>();
  public location: Location;

  constructor() { }

  ngOnInit() {
    this.location = {
      zoom: 5,
      latitude: 41.6650266,
      longitude: 12.8701779,
      mapType:'roadmap',
      markers : [{
                    lat: 41.6650266,
                    lng: 12.8701779
                },
                {
                    lat: 45.6650266,
                    lng: 12.8701779
                }]
    }
  }

  public cleanMap() {
  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  ngAfterViewInit(): void {
  }

  private initMap(): void {
  }

  getMapBounds() {
  }

}

interface Marker {
    lat: number;
    lng: number;
}

interface Location {
    latitude: number;
    longitude: number;
    mapType: string;
    zoom: number;
    markers: Marker[];
}
