export interface IPokemonListItem {
  name: string;
  url: string;
}

export interface IPokemonList {
  count: number;
  next: unknown;
  previous: unknown;
  results: IPokemonListItem[];
}

export default IPokemonList;
