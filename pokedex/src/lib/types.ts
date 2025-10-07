export interface PokemonPreview {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{ type: PokemonType }>;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    front_female: string | null;
    other: {
      "official-artwork": {
        front_default: string;
      };
      dream_world: {
        front_female: string | null;
      };
      home: {
        front_female: string | null;
      };
    };
  };
  types: Array<{ type: PokemonType }>;
  abilities: Array<{ ability: PokemonAbility }>;
  stats: Array<PokemonStat>;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonAbility {
  name: string;
  url: string;
}
export interface PokemonStat {
  stat: {
    name: string;
    url: string;
  };
  base_stat: number;
}

export interface PokemonSpecies {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  evolution_chain: {
    url: string;
  };
  gender_rate: number;
}

export interface Type {
  id: number;
  name: string;
  pokemon: Array<{
    pokemon: { name: string; url: string };
  }>;
  damage_relations: {
    double_damage_from: Array<PokemonType>;
  };
  isLoading: boolean;
  error: Error | null;
}
