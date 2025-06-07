import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface FeatureBehaviorsProps {
  behaviors: string[];
}

export function FeatureBehaviors({ behaviors }: FeatureBehaviorsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Behaviors</h2>
        </div>
      </CardHeader>
      <CardContent>
        {behaviors.length > 0 ? (
          <ul className="space-y-1">
            {behaviors.map((behavior, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 text-primary">•</span>
                <span>{behavior}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No behaviors documented</p>
        )}
      </CardContent>
    </Card>
  );
}
