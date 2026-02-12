
export type ThemeType = 'dark' | 'neon' | 'minimal' | 'pastel' | 'cyber';

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
  active: boolean;
}

export interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  theme: ThemeType;
  isVerified: boolean;
  links: LinkItem[];
  socials: {
    instagram?: string;
    telegram?: string;
    github?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  deviceStats: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  weeklyStats: { day: string; views: number }[];
}
