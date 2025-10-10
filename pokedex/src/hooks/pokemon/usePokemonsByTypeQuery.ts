import type { PokemonPreview, Type } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { endpoints, fetchApi } from "@/lib/api";
import { getIdFromUrl } from "@/lib/utils";
import { usePokemonDetailsQueries } from "./usePokemonDetailsQueries";

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
  const { data: results, isLoading, error } = usePokemonDetailsQueries({ ids });

  return {
    data: { results },
    isLoading,
    error,
  };
}
