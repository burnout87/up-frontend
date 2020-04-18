import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { ConnectivityService } from '../connectivity.service';
import { MarkerManager, AgmMarker, Marker, GoogleMapsAPIWrapper } from "@agm/core";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  private onChanges = new Subject<SimpleChanges>();
  private markers: AgmMarker[] = [];
  private visible: boolean = false;
  private location: Location;
  private _map: any;

  constructor(private wsService: ConnectivityService, private markerManager: MarkerManager, private gmapsApi: GoogleMapsAPIWrapper) {
    this.location = {
      zoom: 5,
      latitude: 41.6650266,
      longitude: 12.8701779,
      mapType:'roadmap'
    }
    this.wsService.getReadyData().subscribe((readyDatas:any) => {
      readyDatas.forEach((readyData: any)  => {
        if(readyData && readyData.coords) {
            this.addMarker(readyData);
        }
      });
    });
  }
  

  addMarker(markerData) {
    let marker = new AgmMarker(this.markerManager);
    marker.latitude = Number(markerData.coords.lat);
    marker.longitude = Number(markerData.coords.lng);
    marker.label = markerData.title;
    this.markerManager.addMarker(marker);
    this.markers.push(marker);
  }

  ngOnInit() { }

  public cleanMap() { }

  getInfoMarker(m, gm, infoWindow) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    console.log(m);
    infoWindow.open();
  }

  hideInfo(gm, event){
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
  }

}

interface Location {
    latitude: number;
    longitude: number;
    mapType: string;
    zoom: number;
}
