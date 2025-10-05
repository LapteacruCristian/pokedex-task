import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../lib/api";
import type { Pokemon } from "../lib/types";

export default function usePokemonDetailsQuery({
  idOrName,
}: {
  idOrName: number | string;
}) {
  return useQuery<Pokemon>({
    queryKey: ["pokemon", idOrName],
    queryFn: () => fetchPokemonDetails(idOrName),
    enabled: !!idOrName,
    retry: false,
  });
}
