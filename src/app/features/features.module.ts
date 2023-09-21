import { PokedexModule } from './pokedex/pokedex.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PokedexModule
  ],
  exports: [
    PokedexModule
  ]
})
export class FeaturesModule { }
