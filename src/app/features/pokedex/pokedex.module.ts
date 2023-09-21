import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';

@NgModule({
  declarations: [
    PageComponent,
    PokedexComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class PokedexModule {
}
