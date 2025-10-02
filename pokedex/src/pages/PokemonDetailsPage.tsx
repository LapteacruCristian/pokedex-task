import { useParams } from "react-router-dom";
import usePokemonDetailsQuery from "../hooks/usePokemonDetailsQuery";

function PokemonDetailsPage() {
  const { name } = useParams();

  const { data, isLoading, error } = usePokemonDetailsQuery({
    idOrName: name!,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading Pokémon details.</p>;
  return (
    <main>
      <div>
        {data && (
          <>
            <span className="text-muted">#{data.id}</span>
            <h2>{data.name}</h2>
            <img src={data.sprites.front_default} alt={data.name} />
            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>
            <p>
              Types:{" "}
              {data.types
                .map((type: { type: { name: any } }) => type.type.name)
                .join(", ")}
            </p>
            <p>
              Abilities:{" "}
              {data.abilities
                .map(
                  (ability: { ability: { name: any } }) => ability.ability.name
                )
                .join(", ")}
            </p>
            <div>
              Stats:
              <ul>
                {data.stats.map(
                  (stat: { stat: { name: any }; base_stat: any }) => (
                    <li key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  )
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
export default PokemonDetailsPage;
