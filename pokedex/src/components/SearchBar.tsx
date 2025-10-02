import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  onChange: (term: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function SearchBar({
  searchTerm,
  onChange,
  placeholder,
  disabled = false,
}: SearchBarProps) {
  return (
    <div className="container mx-auto w-full font-medium">
      <Input
        type="search"
        value={searchTerm}
        className="rounded-xl p-8 md:text-md"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}
