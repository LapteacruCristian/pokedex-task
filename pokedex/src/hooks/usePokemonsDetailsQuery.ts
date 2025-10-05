import { useQueries } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../lib/api";
import usePokemonsQuery from "./usePokemonsQuery";
import type { PokemonPreview } from "../lib/types";

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

export default function usePokemonsDetailsQuery({
  page,
  perPage = 20,
}: PokemonsDetailsProps): PokemonsDetailsResult {
  const {
    data: listData,
    error: listError,
    isLoading: isListLoading,
  } = usePokemonsQuery({ page, perPage });

  const detailQueries = useQueries({
    queries:
      listData?.results.map((pokemon) => ({
        queryKey: ["pokemon", pokemon.name],
        queryFn: () => fetchPokemonDetails(pokemon.name),
        enabled: !!pokemon.name,
      })) ?? [],
  });

  const isDetailsLoading = detailQueries.some((q) => q.isLoading);
  const detailsError = detailQueries.find((q) => q.isError)?.error;
  const results = detailQueries.map((q) => q.data).filter(Boolean);
  return {
    data: {
      results,
      count: listData?.count || 0,
      next: listData?.next || null,
      previous: listData?.previous || null,
    },
    isLoading: isListLoading || isDetailsLoading,
    error: listError || detailsError || null,
  };
}
