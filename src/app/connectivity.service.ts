import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import * as Rx from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { LatLng } from '@agm/core';


@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  
  headers = new HttpHeaders()
        .append('Origin', 'X-Requested-With');
  isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
   }

   public getPlatforms(): Rx.Observable<object> {
    if(!this.isBrowser) {
      return this.http.get(environment.platforms, { headers: this.headers });
    }
    else {
      return this.http.get(environment.platforms);
    }
  }

  public getPosts(): Rx.Observable<object> {
    if(!this.isBrowser) {
      return this.http.get(environment.posts + '?_embed', { headers: this.headers });
    }
    else {
      return this.http.get(environment.posts + '?_embed');
    }
  }

  public getLatestPosts(idExclude:Number[], latest: Number): Rx.Observable<object> {
    if(!this.isBrowser) {
      return this.http.get(environment.posts + '?page=1&per_page=' + latest + '&_embed&exclude=' + idExclude, { headers: this.headers });
    }
    else {
      return this.http.get(environment.posts + '?page=1&per_page=' + latest + '&_embed&exclude=' + idExclude);
    }
  }

  public getLatestMedia(idExclude:Number): Rx.Observable<object> {
    if(!this.isBrowser) {
      return this.http.get(environment.media + '?page=1&per_page=3&exclude=' + idExclude, { headers: this.headers });
    }
    else {
      return this.http.get(environment.media + '?page=1&per_page=3&exclude=' + idExclude);
    }
  }

  public getPost(id: Number): Rx.Observable<object> {
    if(!this.isBrowser) {
      return this.http.get(environment.posts + '/' + id + '?_embed', { headers: this.headers });
    }
    else {
      return this.http.get(environment.posts + '/' + id + '?_embed');
    }
  }

  public getMedia(id: Number): Rx.Observable<object> {
    if(!this.isBrowser) {
      return this.http.get(environment.media + '?parent=' + id, { headers: this.headers });
    }
    else {
      return this.http.get(environment.media + '?parent=' + id);
    }
  }

  public getStores(): Rx.Observable<object> {
    if(!this.isBrowser) {
      return this.http.get(environment.stores, { headers: this.headers });
    }
    else {
      return this.http.get(environment.stores);
    }
  }

  public getReadyData():Rx.Observable<object> {
    if(!this.isBrowser) {
      return this.http.get(environment.readyData, { headers: this.headers });
    }
    else {
      return this.http.get(environment.readyData);
    }
  }

  public getReadyDataBounds(NEpoint:LatLng, SWpoint:LatLng):Rx.Observable<object> {

    var body = {
      "$and": [
          {
              "coords.lat": {
                  "$lt": Number(NEpoint.lat())
              }
          },
          {
              "coords.lat": {
                  "$gt": Number(SWpoint.lat())
              }
          },
          {
            "coords.lng": {
                "$lt": Number(NEpoint.lng())
            }
        },
        {
            "coords.lng": {
                "$gt": Number(SWpoint.lng())
            }
        }
      ]
    } 

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    if(!this.isBrowser) {
      httpOptions.headers.append('Origin', 'X-Requested-With');
      return this.http.post(environment.readyData, body, httpOptions);
    }
    else {
      return this.http.post(environment.readyData, JSON.stringify(body), httpOptions);
    }
  }

  public getStore(id: Number): Rx.Observable<object> {
    if(!this.isBrowser) {
      return this.http.get(environment.stores + '/' + id, { headers: this.headers });
    }
    else {
      return this.http.get(environment.stores + '/' + id);
    }
  }

}
