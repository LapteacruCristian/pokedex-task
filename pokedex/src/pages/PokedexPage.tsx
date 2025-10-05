import { useSearchParams } from "react-router-dom";
import PokemonCardPreview from "../components/PokemonCardPreview";
import usePokemonsDetailsQuery from "../hooks/usePokemonsDetailsQuery";
import ErrorCard from "@/components/ErrorCard";
import Loader from "@/components/Loader";
import usePokemonDetailsQuery from "@/hooks/usePokemonDetailsQuery";
import SearchBar from "@/components/SearchBar";
import GridPagination from "@/components/GridPagination";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";

function PokedexPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const perPage = 20;

  const [searchTerm, setSearchTerm] = useState("");

  const searchTermdebounced = useDebounce(searchTerm, 1000);

  const { data, isLoading, error } = usePokemonsDetailsQuery({ page, perPage });

  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = usePokemonDetailsQuery({
    idOrName: searchTermdebounced.trim().toLowerCase().replace(/\s+/g, "-"),
  });

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <ErrorCard
          title="Unable to fetch the Pokémon data."
          description="Please check your internet connection or try again later."
          message={error?.message}
        />
      </div>
    );
  }

  return (
    <main>
      <SearchBar
        className="mb-16"
        placeholder="Search your Pokémon!"
        disabled={isLoading}
        searchTerm={searchTerm}
        onChange={setSearchTerm}
      />

      {isLoading || isSearchLoading ? (
        <Loader />
      ) : searchError ? (
        <ErrorCard
          title="No Pokémon match your search."
          description="Please check the name and try again."
        />
      ) : (
        <section>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-16">
            {searchData ? (
              <li key={searchData.id}>
                <PokemonCardPreview key={searchData.id} pokemon={searchData} />
              </li>
            ) : (
              data.results.map((pokemon) => (
                <li key={pokemon.id}>
                  <PokemonCardPreview pokemon={pokemon} />
                </li>
              ))
            )}
          </ul>

          {!searchData && (
            <div className="flex justify-center items-center mt-8">
              <GridPagination
                page={page}
                next={!data?.next ? false : true}
                previous={!data?.previous ? false : true}
              />
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default PokedexPage;
