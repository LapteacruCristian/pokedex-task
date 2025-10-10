import { useQuery } from "@tanstack/react-query";
import { endpoints, fetchApi } from "../../lib/api";
import type { Pokemon } from "../../lib/types";

export function usePokemonQuery({ idOrName }: { idOrName: number | string }) {
  return useQuery({
    queryKey: ["pokemon", idOrName],
    queryFn: () => fetchApi<Pokemon>(endpoints.pokemon(idOrName)),
    enabled: !!idOrName,
    retry: false,
  });
}
