import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPokemons } from "../../lib/api";

interface PokemonsQueryResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

interface UsePokemonsQueryProps {
  page: number;
  perPage?: number;
}

export function usePokemonsPageQuery({
  page,
  perPage = 20,
}: UsePokemonsQueryProps) {
  return useQuery<PokemonsQueryResult>({
    queryKey: ["pokemons", page, perPage],
    queryFn: () => fetchPokemons(page, perPage),
    placeholderData: keepPreviousData,
  });
}
