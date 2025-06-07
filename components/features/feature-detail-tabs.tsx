"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "./code-block";

interface FeatureDetailTabsProps {
  bytePattern?: string;
  pseudoCode?: string;
  yara?: string;
}

export function FeatureDetailTabs({ bytePattern, pseudoCode, yara }: FeatureDetailTabsProps) {
  // Set default tab based on available data
  const defaultTab = bytePattern ? "byte-pattern" : pseudoCode ? "pseudo-code" : "yara-rule";
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  
  // Get the number of available tabs
  const availableTabs = [
    bytePattern && "byte-pattern",
    pseudoCode && "pseudo-code",
    yara && "yara-rule"
  ].filter(Boolean);
  
  // If no tabs are available, return null
  if (availableTabs.length === 0) return null;
    return (
    <Card className="overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full border-b bg-muted/50">
          {bytePattern && (
            <TabsTrigger value="byte-pattern">Byte Pattern</TabsTrigger>
          )}
          {pseudoCode && (
            <TabsTrigger value="pseudo-code">Pseudo Code</TabsTrigger>
          )}
          {yara && (
            <TabsTrigger value="yara-rule">YARA Rule</TabsTrigger>
          )}
        </TabsList>
          {bytePattern && (
          <TabsContent value="byte-pattern" className="mt-0 border-0 p-0">
            <CodeBlock code={bytePattern} showHeader={false} />
          </TabsContent>
        )}
        
        {pseudoCode && (
          <TabsContent value="pseudo-code" className="mt-0 border-0 p-0">
            <CodeBlock code={pseudoCode} showHeader={false} />
          </TabsContent>
        )}
        
        {yara && (
          <TabsContent value="yara-rule" className="mt-0 border-0 p-0">
            <CodeBlock code={yara} showHeader={false} />
          </TabsContent>
        )}
      </Tabs>
    </Card>
  );
}
