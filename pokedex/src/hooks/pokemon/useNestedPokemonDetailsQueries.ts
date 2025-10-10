import { useQueries } from "@tanstack/react-query";
import { endpoints, fetchApi } from "@/lib/api";
import type { PokemonPreview } from "@/lib/types";

export const useNestedPokemonDetailsQueries = ({
  ids,
}: {
  ids: number[][];
}) => {
  const queries = useQueries({
    queries: ids.map((idList) => ({
      queryKey: ["pokemons", idList],
      queryFn: () =>
        Promise.all(idList.map((i) => fetchApi(endpoints.pokemon(i)))),
      enabled: !!idList.length,
    })),
  });

  const data = queries.map((query) => query.data).filter(Boolean) as
    | PokemonPreview[][]
    | undefined;
  const isLoading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.error)?.error || null;

  return {
    data: data || [],
    isLoading,
    error,
  };
};
