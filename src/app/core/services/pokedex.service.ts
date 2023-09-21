import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor() {}

  private convertPokeApiDetailToPokemon(pokeDetail: any): Pokemon {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot: any) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
  }

  private getPokemonDetailByUrl(url: string): Observable<Pokemon> {
    return from(fetch(url))
      .pipe(
        switchMap((response) => from(response.json())),
        map((data: any) => this.convertPokeApiDetailToPokemon(data))
      );
  }

  getPokemons(offset: number = 0, limit: number = 12, maxRecords: number = 644): Observable<Pokemon[]> {
    const url = `${this.apiUrl}?offset=${offset}&limit=${limit}`;

    return from(fetch(url))
      .pipe(
        switchMap((response) => from(response.json())),
        map((jsonBody: any) => jsonBody.results),
        switchMap((pokemons: any[]) => {
          const detailRequests: Observable<Pokemon>[] = pokemons.map((pokemon: any) =>
            this.getPokemonDetailByUrl(pokemon.url)
          );

          return forkJoin(detailRequests);
        }),
        map((pokemons: Pokemon[]) => pokemons.slice(0, maxRecords))
      );
  }
}

export class Pokemon {
  number: number = 0;
  name: string = '';
  types: string[] = [];
  type: string = '';
  photo: string = '';
}