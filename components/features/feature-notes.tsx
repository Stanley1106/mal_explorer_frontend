import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface FeatureNotesProps {
  notes?: string;
}

export function FeatureNotes({ notes }: FeatureNotesProps) {
  if (!notes) return null;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Notes</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap">{notes}</div>
      </CardContent>
    </Card>
  );
}
