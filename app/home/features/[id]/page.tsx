import { fetchFeatureById } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/features";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface FeatureDetailPageProps {
  params: {
    id: string;
  };
}

export default async function FeatureDetailPage({ params }: FeatureDetailPageProps) {
  const feature = await fetchFeatureById(params.id);
  
  if (!feature) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header with breadcrumb */}
      <div>
        <div className="mb-2">
          <Link href="/home/features" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to all features
          </Link>
        </div>
        <h1 className="text-3xl font-bold">{feature.name}</h1>
        {feature.binaryFunction && (
          <p className="mt-2 text-muted-foreground">
            Binary function: <span className="font-mono">{feature.binaryFunction}</span>
          </p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Code blocks */}
          {feature.pseudoCode && (
            <CodeBlock title="Pseudo Code" code={feature.pseudoCode} />
          )}
          
          {feature.yara && (
            <CodeBlock title="YARA Rule" code={feature.yara} />
          )}
          
          {/* Notes */}
          {feature.notes && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Notes</h2>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap">{feature.notes}</div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Behaviors */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Behaviors</h2>
            </CardHeader>
            <CardContent>
              {feature.behaviors.length > 0 ? (
                <ul className="space-y-1">
                  {feature.behaviors.map((behavior, index) => (
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

          {/* Tags */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Tags</h2>
            </CardHeader>
            <CardContent>
              {feature.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, index) => (
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
        </div>
      </div>
    </div>
  );
}
