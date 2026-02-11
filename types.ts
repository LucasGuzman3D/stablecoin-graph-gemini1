
export interface StablecoinData {
  year: string;
  eth: number;
  tron: number;
  bnb: number;
  others: number;
  total: number;
  annotation?: string;
}

export interface AnalystReport {
  summary: string;
  outlook: string;
  hotTake: string;
}
