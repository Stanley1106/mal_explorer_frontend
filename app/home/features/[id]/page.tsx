import { fetchFeatureById } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock, FeatureDetailTabs } from "@/components/features";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Feature } from "@/lib/types";
import React from "react";
import { FileText, Activity, Tag } from "lucide-react";

interface FeatureDetailPageProps {
  params: {
    id: string;
  };
}

export default function FeatureDetailPage({ params }: FeatureDetailPageProps) {
  // Unwrap params using React.use()
  const unwrappedParams = React.use(Promise.resolve(params));
  const featureId = unwrappedParams.id;
  
  // Fetch the feature data server-side
  const featurePromise = fetchFeatureById(featureId);
  const feature = React.use(featurePromise);
  
  if (!feature) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header with breadcrumb */}      <div>
        <div className="mb-4">
          <Link 
            href="/home/features" 
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-primary bg-secondary/50 hover:bg-secondary transition-colors duration-200"
          >
            <span className="mr-1">←</span> Back to all features
          </Link>
        </div>
        <h1 className="text-3xl font-bold">{feature.name}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">        {/* Main content */}        <div className="col-span-2 flex flex-col gap-6">          {/* Code blocks using client component */}
          <FeatureDetailTabs 
            bytePattern={feature.bytePattern}
            pseudoCode={feature.pseudoCode}
            yara={feature.yara}
          />          {/* Notes */}
          {feature.notes && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Notes</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap">{feature.notes}</div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">          {/* Behaviors */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Behaviors</h2>
              </div>
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
          </Card>          {/* Tags */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Tags</h2>
              </div>
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
