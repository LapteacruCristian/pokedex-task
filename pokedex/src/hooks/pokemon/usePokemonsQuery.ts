import { usePokemonsPageQuery } from "../pokemon/usePokemonsPageQuery";
import type { PokemonPreview } from "../../lib/types";
import { getIdFromUrl } from "@/lib/utils";
import { usePokemonDetailsQueries } from "./usePokemonDetailsQueries";

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

  const {
    data: results,
    isLoading: isDetailsLoading,
    error: detailsError,
  } = usePokemonDetailsQueries({ ids });

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
