"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MalwareUploader } from "@/components/samples";

export default function UploadSamplePage() {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-3xl font-bold tracking-tight">Upload Malware Sample</h1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Upload Sample</CardTitle>
        </CardHeader>
        <CardContent>
          <MalwareUploader />
        </CardContent>
      </Card>
    </div>
  );
}
