import { useParams } from "react-router-dom";
import usePokemonDetailsQuery from "../hooks/usePokemonDetailsQuery";
import PokemonCardDetails from "@/components/PokemonCardDetails";
import Loader from "@/components/Loader";
import ErrorCard from "@/components/ErrorCard";
import { usePokemonSpeciesQuery } from "@/hooks/usePokemonSpeciesQuery";
import usePokemonWeaknessesQuery from "@/hooks/usePokemonWeaknessesQuery";

function PokemonDetailsPage() {
  const { name } = useParams();

  const {
    data: pokemon,
    isLoading,
    error,
  } = usePokemonDetailsQuery({
    idOrName: name!,
  });

  const species = usePokemonSpeciesQuery({
    id: pokemon?.id,
    name: name?.split("-")[0],
  });
  const weaknesses = usePokemonWeaknessesQuery({ types: pokemon?.types });

  if (isLoading || species?.isLoading || weaknesses?.isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader />
      </div>
    );

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
          />
        )}
      </div>
    </main>
  );
}
export default PokemonDetailsPage;
