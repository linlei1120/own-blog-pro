export type NavPage = 'home' | 'about' | 'projects' | 'articles' | 'tools' | 'admin' | '404';

export type ThemeMode = 'cyber-noir' | 'matrix-green' | 'nordic-light' | 'solar-amber';

export interface ThemeOption {
  id: ThemeMode;
  name: string;
  enName: string;
  accent: string;
  bg: string;
  previewColor: string;
  dotColor: string;
}

export interface ProfileSkillItem {
  name: string;
  level: number; // 1-100
  tag: string;
}

export interface ProfileSkillCategory {
  category: string;
  list: ProfileSkillItem[];
}

export interface CareerItem {
  period: string;
  company: string;
  role: string;
  summary: string;
  achievements: string[];
}

export interface CoreValue {
  title: string;
  desc: string;
  icon: string;
}

export interface ProfileData {
  name: string;
  englishName: string;
  title: string;
  tagline: string;
  elevatorPitch: string;
  shortBio: string;
  detailedBio: string;
  location: string;
  experienceYears: number;
  availability: string;
  email: string;
  github: string;
  twitter: string;
  wechat: string;
  blogUrl: string;
  resumeUrl: string;
  techDirections: { title: string; desc: string; icon: string }[];
  skills: ProfileSkillCategory[];
  careerTimeline: CareerItem[];
  coreValues: CoreValue[];
}

export type ProjectCategory = 'fullstack' | 'opensource' | 'ai' | 'infra' | 'mobile';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  categoryName: string;
  isFeatured: boolean;
  coverImage?: string;
  role: string;
  background: string;
  techStack: string[];
  achievements: string[];
  demoUrl?: string;
  githubUrl?: string;
  date: string;
  status: 'active' | 'archived' | 'incubating';
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  publishDate: string;
  readingTime: string;
  excerpt: string;
  isFeatured: boolean;
  content: string;
  views?: number;
}

export type ToolCategory = 'dev' | 'productivity' | 'cloud' | 'ai';

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  categoryName: string;
  purpose: string;
  tags: string[];
  websiteUrl: string;
  recommendationReason: string;
  iconName: string;
  isTopPick: boolean;
}

export interface PortfolioStore {
  profile: ProfileData;
  projects: ProjectItem[];
  articles: ArticleItem[];
  tools: ToolItem[];
}
