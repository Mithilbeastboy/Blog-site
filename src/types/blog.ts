export interface Author {
  name: string;
  role: string;
  avatar: string;
  org: string;
}

export interface TableOfContentItem {
  id: string;
  label: string;
}

export interface SectionCallout {
  type: 'quote' | 'stat' | 'code' | 'insight';
  title?: string;
  body: string;
  meta?: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  content: string[];
  callout?: SectionCallout;
}

export interface PollData {
  question: string;
  options: { id: string; label: string; votes: number }[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  author: Author;
  coverImage: string;
  coverImageAlt: string;
  featured?: boolean;
  trending?: boolean;
  tags: string[];
  audioDuration: string;
  views: string;
  initialClaps: number;
  tableOfContents: TableOfContentItem[];
  sections: ArticleSection[];
  keyTakeaways: string[];
  poll?: PollData;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  role: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
}
