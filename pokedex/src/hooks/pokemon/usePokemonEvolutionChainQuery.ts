import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchEvolutionChain } from "@/lib/api";
import type { PokemonPreview } from "@/lib/types";
import { getIdFromUrl } from "@/lib/utils";
import { fetchPokemonDetails } from "@/lib/api";

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
  const chainQuery = useQuery<EvolutionChainResponse>({
    queryKey: ["evolutionChain", url],
    queryFn: () => fetchEvolutionChain(url),
    enabled: !!url,
    retry: false,
  });
  const evolutionIds = chainQuery.data?.chain
    ? extractEvolutionChainIds(chainQuery.data.chain)
    : [];
  console.log(evolutionIds);

  const queries = useQueries({
    queries: evolutionIds.map((index) => ({
      queryKey: ["pokemon", url, index],
      queryFn: () => Promise.all(index.map((id) => fetchPokemonDetails(id))),
    })),
  });

  const data = queries.map((query) => query.data).filter(Boolean) as
    | PokemonPreview[][]
    | undefined;
  const isLoading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.error)?.error || null;
  return {
    data: data || [],
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
