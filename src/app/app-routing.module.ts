import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesDetailComponent } from './heroes-detail/heroes-detail.component';

const routes: Routes = [
  { path: '', redirectTo:'/dashboard', pathMatch: 'full' }  ,  
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent }  ,
  // Parameterized routing
  { path: 'detail/:id', component: HeroesDetailComponent},
  // colon : indicates that :id is a placeholder for a specific hero id.
 ];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule],
})
export class AppRoutingModule { }