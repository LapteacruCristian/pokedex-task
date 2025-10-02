import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface PokemonCardPreviewProps {
  pokemon: {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    types: Array<{ type: { name: string } }>;
  };
}

function PokemonCardPreview({ pokemon }: PokemonCardPreviewProps) {
  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <Card className="max-w-75 mx-auto sm:max-w-full border-border hover:scale-103 transition-transform duration-200 ease-in-out relative gap-4 shadow-lg">
        <CardHeader>
          <img
            className="w-24 h-24 absolute -top-12 left-1/2 transform -translate-x-1/2"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground text-sm font-medium">
            #{pokemon.id}
          </p>
          <CardTitle className="capitalize font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis">
            {pokemon.name}
          </CardTitle>
        </CardContent>
        <CardFooter className="flex justify-center space-x-2">
          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className={`type-${typeInfo.type.name} px-3 py-1 rounded-md text-sm font-medium uppercase`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
export default PokemonCardPreview;
