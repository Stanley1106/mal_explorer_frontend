"use client"

import { useState } from "react"
import { SearchInput, FeatureResults, featuresData, analyzeWithAI } from "@/components/search"

export default function SearchPage() {
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Filter features based on the feature IDs returned from AI
	const filteredFeatures = searchResults.length > 0
		? featuresData.filter(feature => searchResults.includes(feature.id))
		: [];

	const handleSearch = async (inputText: string) => {
		setSearchText(inputText);
		if (!inputText.trim()) return;
		
		setError(null);
		setIsLoading(true);
		
		try {
			// Call the AI analysis function
			const featureIds = await analyzeWithAI(inputText);
			setSearchResults(featureIds);
		} catch (err) {
			console.error("AI analysis error:", err);
			setError("An error occurred during analysis. Please try again later.");
			setSearchResults([]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<h1 className="text-2xl font-bold">Search Features</h1>
			
			<SearchInput 
				onSearch={handleSearch}
				isLoading={isLoading}
				error={error}
			/>

			<FeatureResults 
				features={filteredFeatures}
				searchPerformed={searchResults.length > 0 || (isLoading === false && searchText.trim() !== "")}
			/>
		</div>
	)
}
