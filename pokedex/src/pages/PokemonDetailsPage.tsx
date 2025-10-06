import { Navigate, useParams } from "react-router-dom";
import {
  usePokemonQuery,
  usePokemonEvolutionChainQuery,
  usePokemonSpeciesQuery,
  usePokemonWeaknessesQuery,
} from "@/hooks/usePokemon";
import PokemonCardDetails from "@/components/PokemonCardDetails";
import Loader from "@/components/Loader";
import ErrorCard from "@/components/ErrorCard";

function PokemonDetailsPage() {
  const { id } = useParams();
  const parsedId = id ? Number(id) : NaN;

  const {
    data: pokemon,
    isLoading,
    error,
  } = usePokemonQuery({
    idOrName: parsedId!,
  });

  const species = usePokemonSpeciesQuery({
    id: parsedId,
    name: pokemon?.name.split("-")[0],
  });
  const weaknesses = usePokemonWeaknessesQuery({ types: pokemon?.types });

  const evolutionChain = usePokemonEvolutionChainQuery({
    url: species?.data?.evolution_chain.url || "",
  });

  if (
    isLoading ||
    species?.isLoading ||
    weaknesses?.isLoading ||
    evolutionChain?.isLoading
  )
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader />
      </div>
    );

  if (isNaN(parsedId) || parsedId < 1) {
    return <Navigate to="/404" />;
  }

  if (error || species?.error || weaknesses?.error)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <ErrorCard
          title="Unable to fetch the Pokémon details."
          description="Please check your internet connection or try again later."
          message={
            error?.message ||
            species?.error?.message ||
            weaknesses?.error?.message
          }
        />
      </div>
    );

  return (
    <main>
      <div className="py-20">
        {pokemon && species?.data && (
          <PokemonCardDetails
            pokemon={pokemon}
            species={species.data}
            weaknesses={weaknesses.data}
            evolutionChain={evolutionChain.data}
          />
        )}
      </div>
    </main>
  );
}
export default PokemonDetailsPage;
