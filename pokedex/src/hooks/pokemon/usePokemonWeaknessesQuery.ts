import { useQueries } from "@tanstack/react-query";
import { endpoints, fetchApi } from "@/lib/api";
import type { Pokemon, PokemonType, Type } from "@/lib/types";

interface PokemonWeaknessesResult {
  data: Array<PokemonType>;
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
        queryKey: ["pokemonType", type.type.name],
        queryFn: () => fetchApi<Type>(endpoints.type(type.type.name)),
        enabled: !!type.type.name,
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
