import { Link } from "react-router-dom";
import type { PokemonPreview } from "../lib/types";
import PokemonTypeBadge from "./PokemonTypeBadge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface PokemonCardPreviewProps {
  pokemon: PokemonPreview;
}

function PokemonCardPreview({ pokemon }: PokemonCardPreviewProps) {
  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <Card className="select-none border-border hover:scale-103 transition-transform duration-200 ease-in-out relative gap-2 shadow-lg max-w-[250px] sm:max-w-[270px] mx-auto pt-0">
        <CardHeader className="h-10">
          <img
            className="w-20 h-20 absolute -top-10 left-1/2 transform -translate-x-1/2"
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground text-sm font-medium">
            #{pokemon.id}
          </p>
          <h2 className="capitalize whitespace-nowrap overflow-hidden text-ellipsis">
            {pokemon.name}
          </h2>
        </CardContent>
        <CardFooter className="flex justify-center gap-2 flex-nowrap">
          {pokemon.types.map((typeInfo) => (
            <PokemonTypeBadge
              key={typeInfo.type.name}
              typeName={typeInfo.type.name}
            />
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
export default PokemonCardPreview;
