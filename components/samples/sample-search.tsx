import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search } from "lucide-react"

interface SampleSearchProps {
  onSearch?: (searchTerm: string) => void
  onFilter?: () => void
}

export function SampleSearch({ onSearch, onFilter }: SampleSearchProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search samples..." 
          className="pl-8" 
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => onFilter?.()}
      >
        <Filter className="h-4 w-4" />
        <span className="sr-only">Filter</span>
      </Button>
    </div>
  )
}
