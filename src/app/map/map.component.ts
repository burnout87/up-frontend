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

  constructor() { }

  ngOnInit() {
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
