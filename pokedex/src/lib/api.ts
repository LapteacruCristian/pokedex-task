const API = "https://pokeapi.co/api/v2";

export const endpoints = {
  list: (limit = 20, offset = 0) =>
    `${API}/pokemon?limit=${limit}&offset=${offset}`,
  pokemon: (idOrName: string | number) => `${API}/pokemon/${idOrName}`,
  species: (idOrName: string | number) => `${API}/pokemon-species/${idOrName}`,
  type: (idOrName: string | number) => `${API}/type/${idOrName}`,
  allTypes: () => `${API}/type`,
};

export const fetchApi = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};
