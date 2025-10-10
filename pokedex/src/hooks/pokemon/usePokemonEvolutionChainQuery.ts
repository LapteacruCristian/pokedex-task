import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import type { PokemonPreview } from "@/lib/types";
import { getIdFromUrl } from "@/lib/utils";
import { useNestedPokemonDetailsQueries } from "./useNestedPokemonDetailsQueries";

interface EvolutionNode {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionNode[];
}

interface EvolutionChainResponse {
  chain: EvolutionNode;
}

interface usePokemonEvolutionChain {
  data: PokemonPreview[][];
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonEvolutionChainQuery({
  url,
}: {
  url: string;
}): usePokemonEvolutionChain {
  const chainQuery = useQuery({
    queryKey: ["evolutionChain", url],
    queryFn: () => fetchApi<EvolutionChainResponse>(url),
    enabled: !!url,
    retry: false,
  });

  const evolutionIds = chainQuery.data?.chain
    ? extractEvolutionChainIds(chainQuery.data.chain)
    : [];

  const {
    data: details,
    isLoading,
    error,
  } = useNestedPokemonDetailsQueries({ ids: evolutionIds });

  return {
    data: details || [],
    isLoading: chainQuery.isLoading || isLoading,
    error: chainQuery.error || error || null,
  };
}

function extractEvolutionChainIds(node: EvolutionNode): number[][] {
  if (node?.evolves_to.length === 0) {
    return [[getIdFromUrl(node.species.url)]];
  }
  return node?.evolves_to
    .flatMap((evolution) => extractEvolutionChainIds(evolution))
    .map((path) => [getIdFromUrl(node.species.url), ...path]);
}
