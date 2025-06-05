import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export interface Feature {
  id: string;
  type: string;
  label: string;
  description: string;
  categories: string[];
}

interface FeatureResultsProps {
  features: Feature[];
  searchPerformed: boolean;
}

export function FeatureResults({ features, searchPerformed }: FeatureResultsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {searchPerformed ? (
        features.length > 0 ? (
          features.map((feature) => (
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
  );
}
