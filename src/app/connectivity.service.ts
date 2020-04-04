import { Injectable } from '@angular/core';
import * as Rx from "rxjs";
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders()
      // .append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      // .append('Access-Control-Allow-Origin', '*')
      .append('responseType', 'text/plain');

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  constructor(private http: HttpClient) { }

  public getListPosts(): Rx.Observable<object> {
    return this.http.get(environment.posts);
  }

}
