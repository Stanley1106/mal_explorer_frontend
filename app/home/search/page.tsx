"use client"

import { useState } from "react"
import { Search, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample feature data (in a real app, this would come from an API or database)
const featuresData = [
	{
		id: "1",
		type: "Code Injection",
		label: "Process Hollowing",
		description: "Injects malicious code into legitimate processes",
		categories: ["Injection", "Anti-Analysis"],
	},
	{
		id: "2",
		type: "Encryption",
		label: "RC4 Cipher",
		description: "Uses RC4 stream cipher for encrypting communication",
		categories: ["Encryption", "Communication"],
	},
	{
		id: "3",
		type: "Anti-Analysis",
		label: "API Hooking",
		description: "Hooks system APIs to intercept calls and hide activity",
		categories: ["Evasion", "Anti-Analysis"],
	},
	{
		id: "4",
		type: "Persistence",
		label: "Registry Modification",
		description: "Modifies registry to achieve persistence after reboot",
		categories: ["Persistence", "System"],
	},
	{
		id: "5",
		type: "Data Exfiltration",
		label: "DNS Tunneling",
		description: "Uses DNS queries to exfiltrate data from infected systems",
		categories: ["Exfiltration", "Communication"],
	},
]

// Function to integrate with AI API in the future
async function analyzeWithAI(inputText: string) {
  // Simulating API call
  return new Promise<string[]>((resolve) => {
    // In a real implementation, this would send a request to the AI service
    console.log("Sending to AI API:", inputText);
    
    // Simulating analysis process and delay
    setTimeout(() => {
      // When actually integrated, this will parse the API response
      // For now, just filtering features based on input text
      const keywords = inputText.toLowerCase().split(/\s+/);
      const featureIds = featuresData
        .filter(feature => 
          keywords.some(keyword => 
            feature.label.toLowerCase().includes(keyword) || 
            feature.type.toLowerCase().includes(keyword) || 
            feature.description.toLowerCase().includes(keyword) ||
            feature.categories.some(cat => cat.toLowerCase().includes(keyword))
          )
        )
        .map(feature => feature.id);
      
      resolve(featureIds);
    }, 1500);
  });
}

export default function SearchPage() {
	const [inputText, setInputText] = useState("")
	const [searchResults, setSearchResults] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// Filter features based on the feature IDs returned from AI
	const filteredFeatures = searchResults.length > 0
		? featuresData.filter(feature => searchResults.includes(feature.id))
		: []

	const handleSearch = async () => {
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
	}

	const handleClear = () => {
		setInputText("");
		setSearchResults([]);
		setError(null);
	}

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<h1 className="text-2xl font-bold">Search Features</h1>
			
			{/* Search Input Box */}
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
						disabled={isLoading || (!inputText.trim() && searchResults.length === 0)}
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

			{/* Results Area */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
				{searchResults.length > 0 ? (
					filteredFeatures.length > 0 ? (
						filteredFeatures.map((feature) => (
							<Link href={`/home/feature/${feature.id}`} key={feature.id}>
								<Card className="overflow-hidden hover:border-primary transition-colors cursor-pointer h-full">
									<CardHeader className="pb-3">
										<CardTitle>{feature.label}</CardTitle>
										<CardDescription>{feature.type}</CardDescription>
									</CardHeader>
									<CardContent className="space-y-3">
										<p className="text-sm text-muted-foreground">
											{feature.description}
										</p>
										<div className="flex flex-wrap gap-2 mt-2">
											{feature.categories.map((category) => (
												<Badge key={category} variant="secondary">
													{category}
												</Badge>
											))}
										</div>
									</CardContent>
									<CardFooter className="flex justify-end text-xs text-muted-foreground pt-0">
										View details <ChevronRight className="h-4 w-4 ml-1" />
									</CardFooter>
								</Card>
							</Link>
						))
					) : (
						<div className="col-span-full flex items-center justify-center p-6 text-muted-foreground">
							No features found matching your search.
						</div>
					)
				) : (
					<div className="col-span-full flex items-center justify-center p-6 text-muted-foreground">
						Enter code or feature description and click "Search with AI" to find malware characteristics.
					</div>
				)}
			</div>
		</div>
	)
}
