"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Plus } from "lucide-react"
import Link from "next/link"
import { SampleSearch, SampleTable, sampleData } from "@/components/samples"
import { useState } from "react"

export default function SamplesPage() {
  const [samples, setSamples] = useState(sampleData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSamples(sampleData);
      return;
    }
    
    const filtered = sampleData.filter(
      sample => 
        sample.name.toLowerCase().includes(term.toLowerCase()) ||
        sample.type.toLowerCase().includes(term.toLowerCase()) ||
        sample.platform.toLowerCase().includes(term.toLowerCase()) ||
        sample.id.toLowerCase().includes(term.toLowerCase())
    );
    
    setSamples(filtered);
  };

  const handleFilter = () => {
    // This would open a more complex filter dialog in a real application
    console.log("Filter button clicked");
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Samples</h1>
          <p className="text-muted-foreground">Manage and analyze malware samples</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" asChild>
            <Link href="/home/upload">
              <Plus className="mr-2 h-4 w-4" />
              Add Sample
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sample Repository</CardTitle>
          <CardDescription>Browse and manage your malware samples</CardDescription>
        </CardHeader>        <CardContent>
          <SampleSearch onSearch={handleSearch} onFilter={handleFilter} />
          <SampleTable samples={samples} />
        </CardContent>
      </Card>
    </div>
  )
}
