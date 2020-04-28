import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { StorieComponent } from './storie/storie.component';
import { StoriaComponent } from './storia/storia.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { DomandeComponent } from './domande/domande.component';
import { NegozianteComponent } from './negoziante/negoziante.component'
import { NegoziantiComponent } from './negozianti/negozianti.component'
import { AiutaciComponent } from './aiutaci/aiutaci.component';
import { Negoziante } from './negoziante';
import { Observable } from 'rxjs';
import { ConnectivityService } from './connectivity.service';
import { HomeComponent } from './home/home.component';
import { AgmMarker } from '@agm/core';

/*Store resolver*/
@Injectable({ providedIn: 'root' })
export class NegozianteResolver implements Resolve<Object> {
  constructor(private cService: ConnectivityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any 
  {
    const storeId:any = route.paramMap.get('id');
    return this.cService.getStore(storeId);
  }
}

/*Markers resolver*/
@Injectable({ providedIn: 'root' })
export class MarkersResolver implements Resolve<[Object]> {
  constructor(private cService: ConnectivityService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any 
  {
    return this.cService.getReadyData();
  }
}

/*Storie resolver*/
@Injectable({ providedIn: 'root' })
export class StorieResolver implements Resolve<any> {
  constructor(private cService: ConnectivityService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any 
  {
     return this.cService.getPosts();
  }
}

/*Single storia resolver*/
@Injectable({ providedIn: 'root' })
export class StoriaResolver implements Resolve<any> {
  constructor(private cService: ConnectivityService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any 
  {
    const storiaId:any = route.paramMap.get('id');
     return this.cService.getPost(storiaId);
  }
}

/*Single media resolver*/
@Injectable({ providedIn: 'root' })
export class StoriaMediaResolver implements Resolve<any> {
  constructor(private cService: ConnectivityService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any 
  {
    const storiaId:any = route.paramMap.get('id');
    return this.cService.getMedia(storiaId);
  }
}

/*Latest storia resolver*/
@Injectable({ providedIn: 'root' })
export class LatestStorieResolver implements Resolve<any> {
  constructor(private cService: ConnectivityService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any 
  {
    const storiaId:any = route.paramMap.get('id');
    return this.cService.getLatestPosts(storiaId);
  }
}

/*Latest media resolver*/
@Injectable({ providedIn: 'root' })
export class LatestMediaResolver implements Resolve<any> {
  constructor(private cService: ConnectivityService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any 
  {
    const storiaId:Number = Number(route.paramMap.get('id'));
    return this.cService.getLatestMedia(storiaId);
  }
}

const routes: Routes = [
  {
    path:  'home',
    component: HomeComponent,
    resolve: {
      markers: MarkersResolver
    }
  },
  {
    path:  'chi-siamo',
    component: ChiSiamoComponent
  },
  {
    path: 'aiutaci',
    component: AiutaciComponent
  },
  {
    path: 'storie',
    component: StorieComponent,
    resolve: {
      storie: StorieResolver
    }
  },
  {
    path: 'storie/:id',
    component: StoriaComponent,
    resolve: {
      storia: StoriaResolver,
      latestStorie: LatestStorieResolver
    }
  },
  {
    path: 'domande',
    component: DomandeComponent
  },
  {
    path: 'negozianti',
    component: NegoziantiComponent
  },
  {
    path: 'negozianti/:id',
    component: NegozianteComponent,
    resolve: {
      negoziante: NegozianteResolver
    }
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [HomeComponent, ChiSiamoComponent, StorieComponent, StoriaComponent, DomandeComponent, NegozianteComponent, NegoziantiComponent, AiutaciComponent]