import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { endpoints, fetchApi } from "../../lib/api";

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
  const offset = (page - 1) * perPage;
  return useQuery({
    queryKey: ["pokemons", page, perPage],
    queryFn: () =>
      fetchApi<PokemonsQueryResult>(endpoints.list(perPage, offset)),
    placeholderData: keepPreviousData,
  });
}
