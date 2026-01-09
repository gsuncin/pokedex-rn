interface PokemonInterface {
  name: string;
  url: string;
}
interface PokemonDetailInterface {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  cries: { latest : string };
}

export { PokemonDetailInterface, PokemonInterface };
