import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Feature } from "@/lib/types";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Link href={`/home/features/${feature.id}`} className="block transition hover:scale-[1.02]">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="line-clamp-2">{feature.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-sm font-medium">Main behaviors:</h3>
          <ul className="mt-1 text-sm text-muted-foreground">
            {feature.behaviors.slice(0, 3).map((behavior, index) => (
              <li key={index} className="line-clamp-1">• {behavior}</li>
            ))}
            {feature.behaviors.length > 3 && (
              <li className="text-sm text-muted-foreground">
                +{feature.behaviors.length - 3} more...
              </li>
            )}
          </ul>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-1">
            {feature.tags.slice(0, 5).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {feature.tags.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{feature.tags.length - 5} more
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
