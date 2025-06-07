import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CodeBlockProps {
  title: string;
  code: string;
}

export function CodeBlock({ title, code }: CodeBlockProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted py-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <pre className="overflow-x-auto bg-zinc-950 p-4 text-sm text-zinc-50">
          <code>{code}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
