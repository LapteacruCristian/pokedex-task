import { usePokemonsPageQuery } from "../pokemon/usePokemonsPageQuery";
import type { PokemonPreview } from "../../lib/types";
import { getIdFromUrl } from "@/lib/utils";
import { useQueries } from "@tanstack/react-query";
import { fetchPokemonDetails } from "@/lib/api";

interface PokemonsDetailsResult {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<PokemonPreview>;
  };
  isLoading: boolean;
  error: Error | null;
}

interface PokemonsDetailsProps {
  page: number;
  perPage?: number;
}

export function usePokemonsQuery({
  page,
  perPage = 20,
}: PokemonsDetailsProps): PokemonsDetailsResult {
  const {
    data: listData,
    error: listError,
    isLoading: isListLoading,
  } = usePokemonsPageQuery({ page, perPage });

  const ids =
    listData?.results.map((pokemon) => getIdFromUrl(pokemon.url)) || [];

  const queries = useQueries({
    queries:
      ids?.map((id) => ({
        queryKey: ["pokemon", id],
        queryFn: () => fetchPokemonDetails(id),
      })) || [],
  });

  return {
    data: {
      results: queries
        .map((query) => query.data)
        .filter(Boolean) as PokemonPreview[],
      count: listData?.count || 0,
      next: listData?.next || null,
      previous: listData?.previous || null,
    },
    isLoading: isListLoading || queries.some((query) => query.isLoading),
    error: listError || queries.find((query) => query.error)?.error || null,
  };
}
