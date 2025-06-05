export interface SampleType {
  id: string
  name: string
  type: string
  platform: string
  date: string
  status: string
}

// Sample data for demonstration
export const sampleData: SampleType[] = [
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
