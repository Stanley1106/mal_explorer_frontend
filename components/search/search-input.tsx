import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (text: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function SearchInput({ onSearch, isLoading, error }: SearchInputProps) {
  const [inputText, setInputText] = useState("");

  const handleSearch = async () => {
    if (!inputText.trim()) return;
    await onSearch(inputText);
  };

  const handleClear = () => {
    setInputText("");
  };

  return (
    <div className="max-w-3xl w-full space-y-4">
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold">Enter Code or Feature Description</h2>
        <p className="text-sm text-muted-foreground">
          Paste code samples, shellcode, or describe features to find matching malware characteristics
        </p>
      </div>
      <Textarea 
        placeholder="// Enter code, shellcode, or describe the features you're looking for..."
        className="font-mono text-sm min-h-[250px]"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="flex gap-2">
        <Button 
          onClick={handleSearch} 
          className="px-4" 
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              Analyzing...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" /> Search with AI
            </>
          )}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleClear}
          disabled={isLoading || !inputText.trim()}
        >
          Clear
        </Button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="text-destructive text-sm p-2 bg-destructive/10 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
