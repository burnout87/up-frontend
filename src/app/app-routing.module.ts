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
export class NegozianteResolver implements Resolve<Negoziante> {
  constructor(private cService: ConnectivityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any 
  {
    const storeId:any = route.paramMap.get('id');
    return this.cService.getStore(storeId);
  }
}

/*Markers resolver*/
@Injectable({ providedIn: 'root' })
export class MarkersResolver implements Resolve<AgmMarker> {
  constructor(private cService: ConnectivityService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any 
  {
    return this.cService.getReadyData();
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
    component: StorieComponent
  },
  {
    path: 'storie/:id',
    component: StoriaComponent
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