import { fetchFeatureById } from "@/lib/api";
import { notFound } from "next/navigation";
import { 
  FeatureDetailTabs, 
  FeatureHeader,
  FeatureNotes,
  FeatureBehaviors,
  FeatureTags
} from "@/components/features";
import { Feature } from "@/lib/types";
import React from "react";

interface FeatureDetailPageProps {
  params: {
    id: string;
  };
}

export default async function FeatureDetailPage({ params }: FeatureDetailPageProps) {
  const featureId = params.id;
  
  // Fetch the feature data server-side
  const feature = await fetchFeatureById(featureId);
  
  if (!feature) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header with breadcrumb */}
      <FeatureHeader name={feature.name} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Code blocks using client component */}
          <FeatureDetailTabs 
            bytePattern={feature.bytePattern}
            pseudoCode={feature.pseudoCode}
            yara={feature.yara}
          />
          
          {/* Notes */}
          <FeatureNotes notes={feature.notes} />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Behaviors */}
          <FeatureBehaviors behaviors={feature.behaviors} />
          
          {/* Tags */}
          <FeatureTags tags={feature.tags} />
        </div>
      </div>
    </div>
  );
}
