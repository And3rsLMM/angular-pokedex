import { Component, OnInit } from '@angular/core';
import { PokedexService, Pokemon } from 'src/app/core/services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent implements OnInit {
  pokemons: Pokemon[] = []; 
  maxRecords =644;
  limit = 12;
  offset = 0;
  showLoadMore = true;

  constructor(private pokedexService: PokedexService) { } 

  ngOnInit(): void {
    this.loadPokemonItems(this.offset, this.limit);
  }

  loadPokemonItems(offset: number, limit: number): void {
    this.pokedexService.getPokemons(offset, limit)
    .subscribe((pokemons: Pokemon[]) => {
      this.pokemons = this.pokemons.concat(pokemons).slice(0, this.maxRecords); 
      this.offset += limit;
    
    if (this.offset >= this.maxRecords) {
          this.showLoadMore = false; 
        }
      });
  }

  loadMore(): void {
    this.loadPokemonItems(this.offset, this.limit);
  }
}
