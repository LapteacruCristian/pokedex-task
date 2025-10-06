import { useQueries } from "@tanstack/react-query";
import { fetchPokemonType } from "@/lib/api";
import type { Pokemon, PokemonWeakness } from "@/lib/types";

interface PokemonWeaknessesResult {
  data: Array<PokemonWeakness>;
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonWeaknessesQuery({
  types,
}: {
  types: Pokemon["types"] | undefined;
}): PokemonWeaknessesResult {
  const queries = useQueries({
    queries:
      types?.map((type) => ({
        queryKey: ["pokemonWeaknesses", type.type.url],
        queryFn: () => fetchPokemonType(type.type.url),
        enabled: !!type.type.url,
      })) ?? [],
  });

  const data = queries
    .flatMap((query) => query.data?.damage_relations.double_damage_from || [])
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );

  const isLoading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.error)?.error || null;

  return {
    data,
    isLoading,
    error,
  };
}
