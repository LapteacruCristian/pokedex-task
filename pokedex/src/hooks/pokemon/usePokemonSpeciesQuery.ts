import { useQuery } from "@tanstack/react-query";
import { fetchPokemonSpecies } from "@/lib/api";
import type { PokemonSpecies } from "@/lib/types";

export function usePokemonSpeciesQuery({
  id,
  name,
}: {
  id?: number;
  name?: string;
}) {
  return useQuery<PokemonSpecies>({
    queryKey: ["pokemonSpecies", id, name],
    queryFn: () => fetchPokemonSpecies(id!, name!),
    enabled: !!id && !!name,
    retry: false,
  });
}
