import { Feature } from "./types";

// Mock data for development
const mockFeatures: Feature[] = Array.from({ length: 50 }, (_, index) => ({
  id: `feature-${index + 1}`,
  name: `Sample Feature ${index + 1}`,
  binaryFunction: `sub_${(Math.random() * 1000000).toFixed(0)}`,
  pseudoCode: `function sample${index + 1}() {\n  // Initialize variables\n  int x = 0;\n  for(int i = 0; i < 10; i++) {\n    x += i;\n  }\n  return x;\n}`,
  yara: `rule sample_feature_${index + 1} {\n  meta:\n    description = "Sample feature ${index + 1}"\n    author = "Dev Team"\n  strings:\n    $s1 = "sample string"\n  condition:\n    $s1\n}`,
  notes: `This is a sample feature with index ${index + 1}. It demonstrates typical malware behavior.`,
  behaviors: [
    `Behavior ${index + 1}-1: File system manipulation`,
    `Behavior ${index + 1}-2: Network communication`,
    `Behavior ${index + 1}-3: Registry modification`,
    ...(index % 3 === 0 ? [`Behavior ${index + 1}-4: Process injection`] : []),
  ],
  tags: [
    'sample',
    `tag-${index + 1}`,
    ...(index % 2 === 0 ? ['malware'] : []),
    ...(index % 3 === 0 ? ['ransomware'] : []),
    ...(index % 4 === 0 ? ['trojan'] : []),
    ...(index % 5 === 0 ? ['backdoor'] : []),
  ],
}));

// Environment detection
const isDevelopment = process.env.NODE_ENV === 'development';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''; // Use environment variable if available

export async function fetchFeatures(): Promise<Feature[]> {
  // Use mock data in development mode if API_BASE_URL is not set
  if (isDevelopment && !API_BASE_URL) {
    console.log('Using mock features data for development');
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockFeatures;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/features`);
    if (!response.ok) {
      throw new Error(`Failed to fetch features: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching features:', error);
    // In development, fall back to mock data if API call fails
    if (isDevelopment) {
      console.log('Falling back to mock data after API error');
      return mockFeatures;
    }
    return [];
  }
}

export async function fetchFeatureById(id: string): Promise<Feature | null> {
  // Use mock data in development mode if API_BASE_URL is not set
  if (isDevelopment && !API_BASE_URL) {
    console.log(`Using mock data for feature ID: ${id}`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    const feature = mockFeatures.find(f => f.id === id);
    return feature || null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/features/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch feature with ID: ${id} - ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching feature with ID ${id}:`, error);
    
    // In development, fall back to mock data if API call fails
    if (isDevelopment) {
      console.log('Falling back to mock data after API error');
      const feature = mockFeatures.find(f => f.id === id);
      return feature || null;
    }
    
    return null;
  }
}
