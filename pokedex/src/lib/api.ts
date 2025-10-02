const API = "https://pokeapi.co/api/v2";

export const endpoints = {
  list: (limit = 20, offset = 0) =>
    `${API}/pokemon?limit=${limit}&offset=${offset}`,
  pokemon: (idOrName: string | number) => `${API}/pokemon/${idOrName}`,
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
