"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Feature } from "@/lib/types";

interface FeatureSearchProps {
  features: Feature[];
  onSearchResults: (results: Feature[]) => void;
}

export function FeatureSearch({ features, onSearchResults }: FeatureSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      onSearchResults(features);
      return;
    }

    const lowerCaseTerm = term.toLowerCase();
    const filteredResults = features.filter(
      (feature) =>
        feature.name.toLowerCase().includes(lowerCaseTerm) ||
        feature.tags.some((tag) => tag.toLowerCase().includes(lowerCaseTerm)) ||
        feature.behaviors.some((behavior) => behavior.toLowerCase().includes(lowerCaseTerm))
    );

    onSearchResults(filteredResults);
  };

  return (
    <div className="w-full">
      <Input
        type="search"
        placeholder="Search features by name, tag, or behavior..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full"
      />
    </div>
  );
}
