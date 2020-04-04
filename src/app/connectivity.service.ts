import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import * as Rx from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

const headers = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if(this.isBrowser)
      headers.append('Origin', 'X-Requested-With');
   }

  public getListPosts(): Rx.Observable<object> {
    return this.http.get(environment.posts, { headers: headers });
  }

  public getPost(id: Number): Rx.Observable<object> {
    return this.http.get(environment.posts + '/' + id, { headers: headers });
  }

}
