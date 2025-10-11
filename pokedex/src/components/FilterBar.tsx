import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useTypesQuery } from "@/hooks/useTypesQuery";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
  SelectContent,
} from "./ui/select";

export default function FilterBar({
  className,
  disabled = false,
}: {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  disabled?: boolean;
}) {
  const types = useTypesQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterParams = searchParams.get("type") || "";
  return (
    <div
      className={cn(
        "flex flex-row justify-center gap-4 items-center",
        className
      )}
    >
      <Select
        onValueChange={(value) =>
          setSearchParams(() => {
            const params = new URLSearchParams();
            params.set("type", value);
            return params;
          })
        }
        disabled={disabled || types.isLoading || !!types.error}
        value={filterParams}
      >
        <SelectTrigger className="w-[150px] py-5 border-border shadow-sm font-medium capitalize">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto bg-background opacity-90 text-center">
          <SelectGroup className=" text-center">
            {types.data?.results &&
              types.data.results.map((type) => (
                <SelectItem
                  key={type.name}
                  value={type.name}
                  className="capitalize"
                >
                  {type.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
        <Button
          variant="secondary"
          className="p-5 shadow-sm border"
          disabled={disabled || !filterParams}
          onClick={() =>
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.delete("type");
              return params;
            })
          }
        >
          <RotateCcw />
        </Button>
      </Select>
    </div>
  );
}
