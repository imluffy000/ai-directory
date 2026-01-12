export interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  logo?: string;
  gradient?: string;
  pricing: string;
  views?: number;
  tags?: string[];
  website?: string;
  featured?: boolean;
  trending?: boolean;
  recentlyAdded?: boolean;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}
