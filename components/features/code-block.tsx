"use client";

import { Button } from "@/components/ui/button";
import { ClipboardIcon, ClipboardCheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CodeBlockProps {
  title?: string;
  code: string;
  showHeader?: boolean;
}

export function CodeBlock({ title, code, showHeader = true }: CodeBlockProps) {
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
    <div className="overflow-hidden">
      {showHeader && (
        <div className="bg-muted py-2 px-4 flex flex-row items-center justify-between">
          {title && <div className="text-sm font-medium">{title}</div>}
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0 ml-auto"
            aria-label="Copy code"
            title="Copy code"
          >
            {copied ? (
              <ClipboardCheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              <ClipboardIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
      <div className="p-4 relative">
        <pre className="overflow-x-auto bg-zinc-950 p-4 text-sm text-zinc-50 rounded-md max-h-[300px]">
          <code>{code}</code>
        </pre>
        {!showHeader && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0 absolute top-6 right-6 bg-zinc-800/70 hover:bg-zinc-700"
            aria-label="Copy code"
            title="Copy code"
          >
            {copied ? (
              <ClipboardCheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              <ClipboardIcon className="h-4 w-4 text-zinc-50" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
