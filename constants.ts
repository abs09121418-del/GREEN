import { ThemeType } from './types';

export const THEMES: Record<ThemeType, { 
  bg: string; 
  card: string; 
  text: string; 
  accent: string;
  border: string;
}> = {
  dark: {
    bg: 'bg-zinc-950',
    card: 'bg-zinc-900/50 backdrop-blur-md',
    text: 'text-zinc-100',
    accent: 'bg-emerald-500',
    border: 'border-white/5'
  },
  neon: {
    bg: 'bg-black',
    card: 'bg-emerald-950/10 border-emerald-500/20',
    text: 'text-emerald-400',
    accent: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]',
    border: 'border-emerald-500/30'
  },
  minimal: {
    bg: 'bg-stone-50',
    card: 'bg-white border-stone-200',
    text: 'text-stone-900',
    accent: 'bg-stone-900',
    border: 'border-stone-200'
  },
  pastel: {
    bg: 'bg-emerald-50',
    card: 'bg-white/80 border-emerald-100',
    text: 'text-emerald-900',
    accent: 'bg-lime-500',
    border: 'border-lime-200'
  },
  cyber: {
    bg: 'bg-emerald-950',
    card: 'bg-black/20 border-lime-500/20',
    text: 'text-lime-300',
    accent: 'bg-lime-500',
    border: 'border-lime-500/30'
  }
};

export const MOCK_USER: any = {
  username: 'shaxsim',
  displayName: 'Bilim Markazi Mutaxassisi',
  bio: 'Zamonaviy texnologiyalar va bilimlar olamiga xush kelibsiz! Raqamli dunyodagi barcha havolalarim shu yerda.',
  avatar: 'https://i.pravatar.cc/300?u=bilim',
  theme: 'dark',
  isVerified: true,
  links: [
    { id: '1', title: 'Portfoliomni koʻring', url: '#', icon: 'BookOpen', clicks: 120, active: true },
    { id: '2', title: 'YouTube kanalim', url: '#', icon: 'Youtube', clicks: 85, active: true },
    { id: '3', title: 'Telegram guruhimiz', url: '#', icon: 'Send', clicks: 450, active: true },
  ],
  socials: {
    instagram: 'bilim_markazi',
    telegram: 'bilim_uz',
    github: 'bilim_markazi',
  }
};