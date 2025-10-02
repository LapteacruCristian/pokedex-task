import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../lib/api";

interface PokemonDetailsQueryProps {
  idOrName: string | number;
}

export default function usePokemonDetailsQuery({
  idOrName,
}: PokemonDetailsQueryProps) {
  return useQuery({
    queryKey: ["pokemon", idOrName],
    queryFn: () => fetchPokemonDetails(idOrName),
    enabled: !!idOrName,
    retry: false,
  });
}
