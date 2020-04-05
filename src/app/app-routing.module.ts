import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StorieComponent } from './storie/storie.component';
import { StoriaComponent } from './storia/storia.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { DomandeComponent } from './domande/domande.component';
import { NegozianteComponent } from './negoziante/negoziante.component'
import { NegoziantiComponent } from './negozianti/negozianti.component'
import { AiutaciComponent } from './aiutaci/aiutaci.component';


const routes: Routes = [
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
    component: NegozianteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [ChiSiamoComponent, StorieComponent, StoriaComponent, DomandeComponent, NegozianteComponent, NegoziantiComponent, AiutaciComponent]