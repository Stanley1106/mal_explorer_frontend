// Sample feature data (in a real app, this would come from an API or database)
import { Feature } from "./feature-results";

export const featuresData: Feature[] = [
  {
    id: "1",
    type: "Code Injection",
    label: "Process Hollowing",
    description: "Injects malicious code into legitimate processes",
    categories: ["Injection", "Anti-Analysis"],
  },
  {
    id: "2",
    type: "Encryption",
    label: "RC4 Cipher",
    description: "Uses RC4 stream cipher for encrypting communication",
    categories: ["Encryption", "Communication"],
  },
  {
    id: "3",
    type: "Anti-Analysis",
    label: "API Hooking",
    description: "Hooks system APIs to intercept calls and hide activity",
    categories: ["Evasion", "Anti-Analysis"],
  },
  {
    id: "4",
    type: "Persistence",
    label: "Registry Modification",
    description: "Modifies registry to achieve persistence after reboot",
    categories: ["Persistence", "System"],
  },
  {
    id: "5",
    type: "Data Exfiltration",
    label: "DNS Tunneling",
    description: "Uses DNS queries to exfiltrate data from infected systems",
    categories: ["Exfiltration", "Communication"],
  },
];

// Function to integrate with AI API in the future
export async function analyzeWithAI(inputText: string): Promise<string[]> {
  // Simulating API call
  return new Promise<string[]>((resolve) => {
    // In a real implementation, this would send a request to the AI service
    console.log("Sending to AI API:", inputText);
    
    // Simulating analysis process and delay
    setTimeout(() => {
      // When actually integrated, this will parse the API response
      // For now, just filtering features based on input text
      const keywords = inputText.toLowerCase().split(/\s+/);
      const featureIds = featuresData
        .filter(feature => 
          keywords.some(keyword => 
            feature.label.toLowerCase().includes(keyword) || 
            feature.type.toLowerCase().includes(keyword) || 
            feature.description.toLowerCase().includes(keyword) ||
            feature.categories.some(cat => cat.toLowerCase().includes(keyword))
          )
        )
        .map(feature => feature.id);
      
      resolve(featureIds);
    }, 1500);
  });
}
