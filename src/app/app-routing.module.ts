import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './features/pokedex/page/page.component';


const routes: Routes = [
  { path: 'pokedex', component: PageComponent },
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
