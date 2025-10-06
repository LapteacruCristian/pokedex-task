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
  types: Array<PokemonType>;
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
  types: Array<PokemonType>;
  abilities: Array<{ ability: { name: string } }>;
  stats: Array<{ stat: { name: string }; base_stat: number }>;
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
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

export interface PokemonWeakness {
  name: string;
  url: string;
}
