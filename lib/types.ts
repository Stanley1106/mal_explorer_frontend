export interface Feature {
  id: string;
  name: string;
  bytePattern: string;
  pseudoCode: string;
  yara: string;
  notes: string;
  behaviors: string[];
  tags: string[];
}
