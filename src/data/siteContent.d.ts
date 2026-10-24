export interface ArticleTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  formula?: string;
  callout?: {
    title: string;
    body: string;
  };
  table?: ArticleTable;
}

export interface GuideArticle {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: string;
  badge: string;
  readTime: string;
  updatedDate: string;
  jurisdiction: "CA" | "US" | "North America";
  calculatorMode: "buy" | "sell" | "move" | "rent";
  summary: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
}

export declare const GUIDE_ARTICLES: GuideArticle[];
export declare function getGuideBySlug(slug: string): GuideArticle | undefined;
