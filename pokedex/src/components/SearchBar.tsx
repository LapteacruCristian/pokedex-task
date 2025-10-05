import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  searchTerm: string;
  onChange: (term: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

export default function SearchBar({
  searchTerm,
  onChange,
  placeholder,
  disabled = false,
  className,
}: SearchBarProps) {
  return (
    <div
      className={cn("container mx-auto max-w-[750px] font-medium", className)}
    >
      <Input
        type="search"
        value={searchTerm}
        className="rounded-xl p-8 md:text-base"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}
