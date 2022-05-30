import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/pages/search/search.component';
import { ConflictsComponent } from './components/pages/conflicts/conflicts.component';
import { MetricsComponent } from './components/pages/metrics/metrics.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'conflicts', component: ConflictsComponent },
  { path: 'metrics', component: MetricsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
