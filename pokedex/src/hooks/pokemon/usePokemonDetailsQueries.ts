import { endpoints, fetchApi } from "@/lib/api";
import type { PokemonPreview } from "@/lib/types";
import { useQueries } from "@tanstack/react-query";

interface usePokemonDetailsQueriesResult {
  data: Array<PokemonPreview>;
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonDetailsQueries({
  ids,
}: {
  ids: Array<number>;
}): usePokemonDetailsQueriesResult {
  const queries = useQueries({
    queries:
      ids.map((id) => ({
        queryKey: ["pokemon", id],
        queryFn: () => fetchApi<PokemonPreview>(endpoints.pokemon(id)),
        enabled: !!id,
      })) ?? [],
  });

  return {
    data: queries
      .map((query) => query.data)
      .filter(Boolean) as PokemonPreview[],
    isLoading: queries.some((query) => query.isLoading),
    error: queries.find((query) => query.error)?.error || null,
  };
}
