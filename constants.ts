
import { ThemeType } from './types';

export const THEMES: Record<ThemeType, { 
  bg: string; 
  card: string; 
  text: string; 
  accent: string;
  border: string;
}> = {
  dark: {
    bg: 'bg-stone-950',
    card: 'bg-emerald-950/20 backdrop-blur-md',
    text: 'text-stone-100',
    accent: 'bg-emerald-600',
    border: 'border-emerald-900/30'
  },
  neon: {
    bg: 'bg-black',
    card: 'bg-emerald-900/10 border-emerald-500/30',
    text: 'text-emerald-400',
    accent: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]',
    border: 'border-emerald-500/50'
  },
  minimal: {
    bg: 'bg-white',
    card: 'bg-stone-50 border-stone-200',
    text: 'text-stone-900',
    accent: 'bg-emerald-800',
    border: 'border-stone-200'
  },
  pastel: {
    bg: 'bg-emerald-50',
    card: 'bg-white/80 border-emerald-100',
    text: 'text-emerald-900',
    accent: 'bg-lime-400',
    border: 'border-lime-200'
  },
  cyber: {
    bg: 'bg-emerald-950',
    card: 'bg-emerald-900/40 border-lime-500/30',
    text: 'text-lime-300',
    accent: 'bg-lime-500 shadow-[0_0_20px_rgba(132,204,22,0.6)]',
    border: 'border-lime-500/50'
  }
};

export const MOCK_USER: any = {
  username: 'bilim_markazi',
  displayName: 'Bilim Markazi',
  bio: 'Oʻzbekistonda bilim va maʼrifat ulashuvchi yetakchi markaz. Biz bilan kelajagingizni quring.',
  avatar: 'https://picsum.photos/seed/bilim/200',
  theme: 'dark',
  isVerified: true,
  links: [
    { id: '1', title: 'Kurslarimiz haqida', url: '#', icon: 'BookOpen', clicks: 1240, active: true },
    { id: '2', title: 'Rasmiy Saytimiz', url: '#', icon: 'Globe', clicks: 890, active: true },
    { id: '3', title: 'Telegram Kanalimiz', url: '#', icon: 'Send', clicks: 5600, active: true },
    { id: '4', title: 'YouTube Darsliklar', url: '#', icon: 'Youtube', clicks: 450, active: true },
  ],
  socials: {
    instagram: 'bilim_markazi',
    telegram: 'bilim_uz',
    github: 'bilim_markazi',
    twitter: 'bilim_markazi'
  }
};
