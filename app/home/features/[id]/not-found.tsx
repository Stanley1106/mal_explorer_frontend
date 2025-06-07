import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeatureNotFound() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Feature not found</h1>
        <p className="text-muted-foreground">
          The feature you are looking for might have been removed or does not exist.
        </p>
      </div>
      <Button asChild>
        <Link href="/home/features">Back to Features List</Link>
      </Button>
    </div>
  );
}
