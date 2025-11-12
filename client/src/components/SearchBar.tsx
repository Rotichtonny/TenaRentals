import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  onFilterClick,
  placeholder = "Search properties..." 
}: SearchBarProps) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9"
          data-testid="input-search"
        />
      </div>
      {onFilterClick && (
        <Button 
          size="icon" 
          variant="outline"
          onClick={onFilterClick}
          data-testid="button-filter"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
