import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import PokemonCardPreview from "../components/PokemonCardPreview";
import ErrorCard from "@/components/ErrorCard";
import Loader from "@/components/Loader";
import SearchBar from "@/components/SearchBar";
import GridPagination from "@/components/GridPagination";
import useDebounce from "@/hooks/useDebounce";
import FilterBar from "@/components/FilterBar";
import {
  usePokemonQuery,
  usePokemonsQuery,
  usePokemonsByTypeQuery,
} from "../hooks/pokemon";

function PokedexPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParams = searchParams.get("type") || "";

  const page = Number(searchParams.get("page") || "1");
  const perPage = 20;

  const [searchTerm, setSearchTerm] = useState("");
  const searchTermdebounced = useDebounce(searchTerm, 1000);

  const { data, isLoading, error } = usePokemonsQuery({ page, perPage });

  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = usePokemonQuery({
    idOrName: searchTermdebounced.trim().toLowerCase().replace(/\s+/g, "-"),
  });

  const {
    data: filterData,
    isLoading: isFilterLoading,
    error: filterError,
  } = usePokemonsByTypeQuery({
    idOrName: filterParams,
  });

  if (page < 1 || isNaN(page)) {
    return <Navigate to="/404" />;
  }

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
        className="mb-8"
        placeholder="Search your Pokémon!"
        disabled={isLoading || isFilterLoading}
        searchTerm={searchTerm}
        onChange={setSearchTerm}
      />
      <div className="flex flex-row justify-center gap-4 items-center mb-16">
        <FilterBar />
      </div>

      {isLoading || isSearchLoading || isFilterLoading ? (
        <Loader />
      ) : searchError || filterError ? (
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
            ) : filterData.results.length > 0 ? (
              filterData.results.map((pokemon) => (
                <li key={pokemon.id}>
                  <PokemonCardPreview pokemon={pokemon} />
                </li>
              ))
            ) : (
              data.results.map((pokemon) => (
                <li key={pokemon.id}>
                  <PokemonCardPreview pokemon={pokemon} />
                </li>
              ))
            )}
          </ul>
          {!data.next && <ErrorCard title="No Pokémon found." />}
          {!searchData && filterData.results.length === 0 && data.next && (
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
