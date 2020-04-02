import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StorieComponent } from './storie/storie.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { DomandeComponent } from './domande/domande.component';


const routes: Routes = [
  {
    path:  'chi-siamo',
    component: ChiSiamoComponent
  },
  {
    path: 'storie',
    component: StorieComponent
  },
  {
    path: 'domande',
    component: DomandeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [ChiSiamoComponent, StorieComponent, DomandeComponent]