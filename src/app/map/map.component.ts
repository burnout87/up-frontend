import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { ConnectivityService } from '../connectivity.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  private onChanges = new Subject<SimpleChanges>();
  public location: Location;
  private markers = [];
  private visible : boolean = false;

  constructor(private wsService: ConnectivityService) { 
    this.wsService.getReadyData().subscribe((readyDatas:any) => {
      readyDatas.forEach((readyData: any)  => {
        if(readyData && readyData.coords) {
            var marker = {
              label: readyData.title,
              lat: readyData.coords.lat,
              lng: readyData.coords.lng,
              url: readyData.link
            }
            this.markers.push(marker);
        }
    });
    });
    this.location = {
      zoom: 5,
      latitude: 41.6650266,
      longitude: 12.8701779,
      mapType:'roadmap',
      markers : this.markers
    }
  }

  ngOnInit() {
    
  }

  public cleanMap() {
  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  ngAfterViewInit(): void {
  }

  getInfoMarker(marker:any) {
    console.log(marker);
    this.visible = true;
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
