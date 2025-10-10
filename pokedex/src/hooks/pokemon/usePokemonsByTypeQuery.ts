import type { PokemonPreview, Type } from "@/lib/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { endpoints, fetchApi } from "@/lib/api";
import { getIdFromUrl } from "@/lib/utils";

interface UsePokemonsByTypeResult {
  data: { results: Array<PokemonPreview> };
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonsByTypeQuery({
  idOrName,
}: {
  idOrName: string | number;
}): UsePokemonsByTypeResult {
  const query = useQuery({
    queryKey: ["pokemonType", idOrName],
    queryFn: () => fetchApi<Type>(endpoints.type(idOrName)),
    enabled: !!idOrName,
    retry: false,
  });
  const ids = query.data?.pokemon.map((p) => getIdFromUrl(p.pokemon.url)) || [];
  const pokemons = useQueries({
    queries:
      ids.map((id) => ({
        queryKey: ["pokemon", id],
        queryFn: () => fetchApi<PokemonPreview>(endpoints.pokemon(id)),
        enabled: !!id,
      })) ?? [],
  });

  const results = pokemons
    .map((p) => p.data)
    .filter(Boolean) as PokemonPreview[];
  const isLoading = query.isLoading || pokemons.some((p) => p.isLoading);
  const error = query.error || pokemons.find((p) => p.error)?.error || null;

  return {
    data: { results },
    isLoading,
    error,
  };
}
