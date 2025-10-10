import { Button } from "./ui/button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import type {
  Pokemon,
  PokemonPreview,
  PokemonSpecies,
  PokemonType,
} from "../lib/types";
import { MarsIcon, VenusIcon, CircleSmall, ArrowRight } from "lucide-react";
import PokemonTypeBadge from "./PokemonTypeBadge";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";

interface PokemonCardDetailsProps {
  pokemon: Pokemon;
  species: PokemonSpecies;
  weaknesses: Array<PokemonType>;
  evolutionChain?: PokemonPreview[][];
}

export default function PokemonCardDetails({
  pokemon,
  species,
  weaknesses,
  evolutionChain,
}: PokemonCardDetailsProps) {
  const flavorText = species?.flavor_text_entries.find(
    (e) => e.language.name === "en"
  )?.flavor_text;
  const genderRate = species?.gender_rate;

  return (
    <Card className="relative border-border shadow-lg max-w-[420px] mx-auto gap-3 pt-0">
      <PokemonCardHeader pokemon={pokemon} genderRate={genderRate} />
      <CardContent className="flex flex-col items-center space-y-3">
        <p className="m-0">#{pokemon.id}</p>
        <h1 className="capitalize">{pokemon.name}</h1>
        <TypeBadges types={pokemon.types} />
        <PokedexEntry flavorText={flavorText} />
        <PokemonAbilities abilities={pokemon.abilities} />
        <div className="grid grid-cols-2 gap-y-3 w-full mx-auto">
          <div>
            <h4>HEIGHT</h4>
            <p>{pokemon.height / 10} m</p>
          </div>
          <div>
            <h4>WEIGHT</h4>
            <p>{pokemon.weight / 10} kg</p>
          </div>
          <PokemonWeaknesses weaknesses={weaknesses} />
          <div>
            <h4>BASE EXP</h4>
            <p>{pokemon.base_experience} XP</p>
          </div>
        </div>
        <ChartBar stats={pokemon.stats} />
        {evolutionChain && <EvolutionChain evolutionChain={evolutionChain} />}
      </CardContent>
    </Card>
  );
}

function PokemonCardHeader({
  pokemon,
  genderRate,
}: {
  pokemon: Pokemon;
  genderRate: number;
}) {
  const [selectedGender, setSelectedGender] = useState<"male" | "female">(
    genderRate > 4 ? "female" : "male"
  );
  const sprites =
    selectedGender === "male"
      ? pokemon.sprites.other["official-artwork"].front_default
      : pokemon.sprites.front_female ||
        pokemon.sprites.other["official-artwork"].front_default;

  return (
    <CardHeader className="h-16">
      <img
        className="w-36 h-36 absolute -top-18 left-1/2 transform -translate-x-1/2"
        src={sprites}
        alt={pokemon.name}
      />
      {genderRate === -1 ? (
        <div className="flex flex-col absolute top-5 right-5 ">
          <div className="inline-flex items-center justify-center bg-gray-200/80 border border-border rounded-sm size-9">
            <CircleSmall size={18} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 absolute top-5 right-5">
          {genderRate !== 8 && (
            <GenderButton
              gender="male"
              isSelected={selectedGender === "male"}
              onClick={() => setSelectedGender("male")}
            />
          )}
          {genderRate !== 0 && (
            <GenderButton
              gender="female"
              isSelected={selectedGender === "female"}
              onClick={() => setSelectedGender("female")}
            />
          )}
        </div>
      )}
    </CardHeader>
  );
}

function GenderButton({
  gender,
  isSelected,
  onClick,
}: {
  gender: "male" | "female";
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      size={"icon"}
      onClick={onClick}
    >
      {gender === "male" ? <MarsIcon /> : <VenusIcon />}
    </Button>
  );
}

function PokedexEntry({ flavorText }: { flavorText?: string }) {
  return (
    <div>
      <h4>POKÉDEX ENTRY</h4>
      <p>{flavorText}</p>
    </div>
  );
}

function TypeBadges({ types }: { types: Pokemon["types"] }) {
  return (
    <div className="flex justify-center space-x-2">
      {types.map((typeInfo) => (
        <PokemonTypeBadge
          key={typeInfo.type.name}
          typeName={typeInfo.type.name}
        />
      ))}
    </div>
  );
}

function PokemonAbilities({ abilities }: { abilities: Pokemon["abilities"] }) {
  return (
    <div>
      <h4>ABILITIES</h4>
      <div className="flex flex-row justify-center gap-2 text-muted-foreground capitalize ">
        {abilities.map((abilityInfo, index) => (
          <span key={index}>{abilityInfo.ability.name}</span>
        ))}
      </div>
    </div>
  );
}

function PokemonWeaknesses({ weaknesses }: { weaknesses: Array<PokemonType> }) {
  if (weaknesses.length === 0) {
    return <p>This Pokémon has no weaknesses.</p>;
  }
  return (
    <div>
      <h4>WEAKNESSES</h4>
      <div className="flex flex-wrap justify-center gap-2 text-muted-foreground capitalize ">
        {weaknesses.map((weakness) => (
          <span key={weakness.name}>{weakness.name}</span>
        ))}
      </div>
    </div>
  );
}

function ChartBar({ stats }: { stats: Pokemon["stats"] }) {
  const chartData = stats.map((statInfo) => ({
    name: statInfo.stat.name,
    value: statInfo.base_stat,
  }));
  chartData.forEach((data) => {
    if (data.name === "hp") data.name = "HP";
    if (data.name === "attack") data.name = "ATK";
    if (data.name === "defense") data.name = "DEF";
    if (data.name === "special-attack") data.name = "SP-ATK";
    if (data.name === "special-defense") data.name = "SP-DEF";
    if (data.name === "speed") data.name = "SPD";
  });
  const chartConfig = {
    value: {
      label: "Value",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;
  return (
    <div className="w-full xl:w-10/12 mx-auto">
      <h4>STATS</h4>
      <p className="mb-2">
        Total: {chartData.reduce((acc, stat) => acc + stat.value, 0)}
      </p>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData} barCategoryGap="15%">
          <CartesianGrid vertical={false} />
          <YAxis
            domain={[0, (dataMax: number) => dataMax * 1.2]}
            type="number"
            dataKey="value"
            hide
          />
          <XAxis
            dataKey="name"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="value" fill="var(--color-value)" radius={4}>
            <LabelList
              dataKey="value"
              position="top"
              className="fill-muted-foreground text-sm sm:text-base"
              offset={8}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function EvolutionChain({
  evolutionChain,
}: {
  evolutionChain: PokemonPreview[][];
}) {
  return (
    <div>
      <h4>EVOLUTION CHAIN</h4>
      {evolutionChain?.[0].length > 1 ? (
        evolutionChain.map((chain, chainIndex) => (
          <div
            key={chainIndex}
            className="flex flex-row justify-evenly items-center space-x-2 overflow-x-auto py-2"
          >
            {chain.map((pokemon, index) => (
              <React.Fragment key={pokemon.id}>
                <div className="flex flex-col justify-center items-center max-w-[8rem]">
                  <Link to={`/pokemon/${pokemon.id}`}>
                    <img
                      className="w-15 h-15"
                      src={
                        pokemon.sprites.other["official-artwork"].front_default
                      }
                      alt={pokemon.name}
                    />
                  </Link>
                  <h3 className="capitalize break-words text-center">
                    {pokemon.name}
                  </h3>
                </div>
                {index < chain.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        ))
      ) : (
        <p>This Pokémon does not evolve.</p>
      )}
    </div>
  );
}
