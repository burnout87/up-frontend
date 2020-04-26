import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import * as Rx from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';


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

  public getPosts(): Rx.Observable<object> {
    if(!this.isBrowser) {
      return this.http.get(environment.posts + '?_embed', { headers: this.headers });
    }
    else {
      return this.http.get(environment.posts + '?_embed');
    }
  }

  public getLatestPosts(idExclude:Number): Rx.Observable<object> {
    if(!this.isBrowser) {
      return this.http.get(environment.posts + '?page=1&per_page=3&_embed&exclude=' + idExclude, { headers: this.headers });
    }
    else {
      return this.http.get(environment.posts + '?page=1&per_page=3&_embed&exclude=' + idExclude);
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

  public getStore(id: Number): Rx.Observable<object> {
    if(!this.isBrowser) {
      return this.http.get(environment.stores + '/' + id, { headers: this.headers });
    }
    else {
      return this.http.get(environment.stores + '/' + id);
    }
  }

}
