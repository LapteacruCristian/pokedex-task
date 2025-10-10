import type { PokemonType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { endpoints, fetchApi } from "@/lib/api";

interface UseTypesResult {
  next: string | null;
  previous: string | null;
  results: Array<PokemonType>;
  count: number;
}

export function useTypesQuery() {
  return useQuery<UseTypesResult>({
    queryKey: ["types"],
    queryFn: () => fetchApi<UseTypesResult>(endpoints.allTypes()),
  });
}
