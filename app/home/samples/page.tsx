import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter, Plus, Search } from "lucide-react"

// Sample data for demonstration
const samples = [
  {
    id: "S-001",
    name: "Trojan.Win32.Agent",
    type: "Trojan",
    platform: "Windows",
    date: "2023-05-15",
    status: "Analyzed",
  },
  {
    id: "S-002",
    name: "Backdoor.Linux.Mirai",
    type: "Backdoor",
    platform: "Linux",
    date: "2023-05-14",
    status: "Analyzing",
  },
  {
    id: "S-003",
    name: "Ransomware.Win64.WannaCry",
    type: "Ransomware",
    platform: "Windows",
    date: "2023-05-12",
    status: "Analyzed",
  },
  {
    id: "S-004",
    name: "Worm.Win32.Conficker",
    type: "Worm",
    platform: "Windows",
    date: "2023-05-10",
    status: "Analyzed",
  },
  {
    id: "S-005",
    name: "Adware.MacOS.Pirrit",
    type: "Adware",
    platform: "MacOS",
    date: "2023-05-08",
    status: "Analyzed",
  },
  {
    id: "S-006",
    name: "Rootkit.Linux.Azazel",
    type: "Rootkit",
    platform: "Linux",
    date: "2023-05-05",
    status: "Analyzing",
  },
  {
    id: "S-007",
    name: "Spyware.Android.Pegasus",
    type: "Spyware",
    platform: "Android",
    date: "2023-05-03",
    status: "Analyzed",
  },
]

export default function SamplesPage() {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Samples</h1>
          <p className="text-muted-foreground">Manage and analyze malware samples</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Sample
          </Button>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sample Repository</CardTitle>
          <CardDescription>Browse and manage your malware samples</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search samples..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {samples.map((sample) => (
                  <TableRow key={sample.id}>
                    <TableCell className="font-medium">{sample.id}</TableCell>
                    <TableCell>{sample.name}</TableCell>
                    <TableCell>{sample.type}</TableCell>
                    <TableCell>{sample.platform}</TableCell>
                    <TableCell>{sample.date}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          sample.status === "Analyzing"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        }`}
                      >
                        {sample.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
