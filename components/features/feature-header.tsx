import Link from "next/link";

interface FeatureHeaderProps {
  name: string;
}

export function FeatureHeader({ name }: FeatureHeaderProps) {
  return (
    <div>
      <div className="mb-4">
        <Link 
          href="/home/features" 
          className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-primary bg-secondary/50 hover:bg-secondary transition-colors duration-200"
        >
          <span className="mr-1">←</span> Back to all features
        </Link>
      </div>
      <h1 className="text-3xl font-bold">{name}</h1>
    </div>
  );
}
