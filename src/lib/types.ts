export type CategoryId =
  | "llm"
  | "vision"
  | "speech"
  | "video"
  | "robotics"
  | "chips"
  | "cloud"
  | "other";

export type CompanyStatus = "active" | "uncertain";

export type SourceRef = {
  url: string;
  label: string;
};

export type SourcedItem = {
  name: string;
  note?: string;
  source: SourceRef;
};

export type Company = {
  slug: string;
  nameEn: string;
  nameZh: string;
  summary: string;
  description: string;
  founded?: { year: number; source: SourceRef };
  headquarters: { text: string; source: SourceRef };
  categories: CategoryId[];
  models: SourcedItem[];
  products: SourcedItem[];
  website: SourceRef;
  status: CompanyStatus;
  notes?: { text: string; source: SourceRef }[];
};
