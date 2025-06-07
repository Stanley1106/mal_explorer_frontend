import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tag } from "lucide-react";

interface FeatureTagsProps {
  tags: string[];
}

export function FeatureTags({ tags }: FeatureTagsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Tags</h2>
        </div>
      </CardHeader>
      <CardContent>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No tags assigned</p>
        )}
      </CardContent>
    </Card>
  );
}
