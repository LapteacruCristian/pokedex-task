import type { PokemonType } from "@/lib/types";

export default function PokemonTypeBadge({
  typeName,
}: {
  typeName: PokemonType["name"];
}) {
  return (
    <span
      className={`type-${typeName} px-3 py-1 rounded-md font-medium uppercase`}
    >
      {typeName}
    </span>
  );
}
