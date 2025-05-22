"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

// Define the schema for form validation
const featureSchema = z.object({
  feature_id: z.string().optional(),
  feature_type: z.string().min(1, "Feature type is required"),
  yara_rule: z.string().optional(),
  machine_code: z.string().optional(),
  assembly: z.string().optional(),
  pseudo_c: z.string().optional(),
  label: z.string().min(1, "Label is required"),
  created_by: z.string().optional(),
})

const formSchema = z.object({
  sample_id: z.string().optional(),
  sha256: z.string().min(64, "SHA256 must be 64 characters").max(64, "SHA256 must be 64 characters"),
  md5: z.string().max(32, "MD5 must be 32 characters").optional(),
  sha1: z.string().max(40, "SHA1 must be 40 characters").optional(),
  family: z.string().min(1, "Family name is required"),
  upload_date: z.date(),
  source: z.string().min(1, "Source is required"),
  tags: z.string().optional(),
  platform: z.string().min(1, "Platform is required"),
  notes: z.string().optional(),
  features: z.array(featureSchema),
})

type FormValues = z.infer<typeof formSchema>

// Sample sources
const sampleSources = ["MalwareBazaar", "VirusTotal", "Internal", "Customer", "Honeypot", "OSINT", "Other"]

// Platforms
const platforms = ["Windows", "Linux", "macOS", "Android", "iOS", "Web", "Multiple", "Other"]

// Feature types
const featureTypes = [
  "API call sequence",
  "String",
  "Script",
  "Network",
  "Registry",
  "File system",
  "Memory pattern",
  "Other",
]

// Current user data (in a real app, this would come from authentication)
const currentUser = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export default function SampleUploadPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const currentDate = new Date()

  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sample_id: `S-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      sha256: "",
      md5: "",
      sha1: "",
      family: "",
      upload_date: currentDate,
      source: "",
      tags: "",
      platform: "",
      notes: "",
      features: [
        {
          feature_id: `F-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`,
          feature_type: "",
          yara_rule: "",
          machine_code: "",
          assembly: "",
          pseudo_c: "",
          label: "",
          created_by: currentUser.name,
        },
      ],
    },
  })

  // Use field array for managing multiple features
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  })

  // Handle form submission
  function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Sample uploaded successfully", {
        description: `Sample ${data.sha256.substring(0, 8)}... has been uploaded.`,
        duration: 5000,
      })
      console.log("Form data:", data)
      // In a real app, we would submit to an API here
      router.push("/home/samples")
    }, 1500)
  }

  // Handle adding a tag
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()]
      setTags(newTags)
      form.setValue("tags", newTags.join(","))
      setTagInput("")
    }
  }

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    form.setValue("tags", newTags.join(","))
  }

  // Handle key press for tag input
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      handleAddTag()
    }
  }

  // Add a new feature with the current user as created_by
  const addNewFeature = () => {
    append({
      feature_id: `F-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      feature_type: "",
      yara_rule: "",
      machine_code: "",
      assembly: "",
      pseudo_c: "",
      label: "",
      created_by: currentUser.name,
    })
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Sample</h1>
          <p className="text-muted-foreground">Add a new malware sample with metadata and features</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Sample Metadata</CardTitle>
              <CardDescription>Enter the basic information about the malware sample</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="sample_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sample ID</FormLabel>
                      <FormControl>
                        <Input {...field} disabled placeholder="Auto-generated" />
                      </FormControl>
                      <FormDescription>System-generated unique identifier</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="upload_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Upload Date</FormLabel>
                      <FormControl>
                        <Input value={format(currentDate, "PPP 'at' p")} disabled className="text-muted-foreground" />
                      </FormControl>
                      <FormDescription>Current date and time of upload</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="sha256"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SHA256 Hash</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter SHA256 hash" />
                      </FormControl>
                      <FormDescription>Required 64-character hash</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="md5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MD5 Hash</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter MD5 hash (optional)" />
                      </FormControl>
                      <FormDescription>Optional 32-character hash</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sha1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SHA1 Hash</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter SHA1 hash (optional)" />
                      </FormControl>
                      <FormDescription>Optional 40-character hash</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="family"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Malware Family</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Emotet, Trickbot" />
                      </FormControl>
                      <FormDescription>Known malware family name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sampleSources.map((source) => (
                            <SelectItem key={source} value={source}>
                              {source}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Where the sample was obtained</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {platforms.map((platform) => (
                            <SelectItem key={platform} value={platform}>
                              {platform}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Operating system or environment</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="Add tags (press Enter or comma to add)"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleTagKeyDown}
                        />
                      </FormControl>
                      <Button type="button" size="sm" variant="outline" onClick={handleAddTag}>
                        Add
                      </Button>
                    </div>
                    <FormDescription>Add multiple tags like &quot;ransomware&quot;, &quot;loader&quot;</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Analyst Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional notes about this sample"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Optional notes about behavior, context, etc.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Sample Features</h2>
            <Button type="button" variant="outline" size="sm" onClick={addNewFeature}>
              <Plus className="mr-2 h-4 w-4" />
              Add Feature
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg">Feature #{index + 1}</CardTitle>
                  <CardDescription>Feature ID: {field.feature_id}</CardDescription>
                </div>
                {fields.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove feature</span>
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name={`features.${index}.feature_type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feature Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select feature type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {featureTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Type of malware feature</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`features.${index}.label`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feature Label</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. RC4 init, process hollowing" />
                        </FormControl>
                        <FormDescription>Short descriptive label</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`features.${index}.yara_rule`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YARA Rule</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter YARA rule"
                          className="font-mono text-sm min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>YARA rule for detecting this feature</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name={`features.${index}.machine_code`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Machine Code</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter hex machine code"
                            className="font-mono text-sm min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Hex representation of machine code</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`features.${index}.assembly`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assembly Code</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter x86/x64 assembly code"
                            className="font-mono text-sm min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Disassembled code</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`features.${index}.pseudo_c`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pseudo-C Code</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter decompiled pseudo-C code"
                          className="font-mono text-sm min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Decompiled representation</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`features.${index}.created_by`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Created By</FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="text-muted-foreground" />
                      </FormControl>
                      <FormDescription>Automatically set to current user</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/home/samples")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload Sample
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
