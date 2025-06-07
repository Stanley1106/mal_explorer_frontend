"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardIcon, ClipboardCheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CodeBlockProps {
  title: string;
  code: string;
}

export function CodeBlock({ title, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      // Show toast notification
      toast.success("Code copied to clipboard", {
        position: "bottom-right",
        duration: 2000,
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy text", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted py-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0"
          aria-label="Copy code"
          title="Copy code"
        >
          {copied ? (
            <ClipboardCheckIcon className="h-4 w-4 text-green-500" />
          ) : (
            <ClipboardIcon className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <pre className="overflow-x-auto bg-zinc-950 p-4 text-sm text-zinc-50">
          <code>{code}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
