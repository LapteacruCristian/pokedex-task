import { useQuery } from "@tanstack/react-query";
import { fetchApi, endpoints } from "@/lib/api";
import type { PokemonSpecies } from "@/lib/types";

export function usePokemonSpeciesQuery({
  id,
  name,
}: {
  id?: number;
  name?: string;
}) {
  return useQuery({
    queryKey: ["pokemonSpecies", id, name],
    queryFn: () => {
      if (id && id < 10000)
        return fetchApi<PokemonSpecies>(endpoints.species(id));
      return fetchApi<PokemonSpecies>(endpoints.species(name!));
    },
    enabled: !!id && !!name,
    retry: false,
  });
}
