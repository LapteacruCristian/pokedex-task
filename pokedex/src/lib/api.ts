const API = "https://pokeapi.co/api/v2";

export const endpoints = {
  list: (limit = 20, offset = 0) =>
    `${API}/pokemon?limit=${limit}&offset=${offset}`,
  pokemon: (idOrName: string | number) => `${API}/pokemon/${idOrName}`,
  species: (idOrName: string | number) => `${API}/pokemon-species/${idOrName}`,
};

export const fetchPokemons = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const response = await fetch(endpoints.list(limit, offset));
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const fetchPokemonDetails = async (idOrName: string | number) => {
  const response = await fetch(endpoints.pokemon(idOrName));
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const fetchPokemonSpecies = async (id: number, name: string) => {
  let response;
  if (id > 10000) {
    response = await fetch(endpoints.species(name));
  } else {
    response = await fetch(endpoints.species(id));
  }
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const fetchPokemonType = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const fetchEvolutionChain = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};
