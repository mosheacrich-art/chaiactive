import type { LucideIcon } from "lucide-react";
import {
  Code2,
  ShieldCheck,
  Sparkles,
  Headphones,
  Heart,
  Users,
  Target,
  FileText,
  Flame,
  Star,
  BookOpen,
  Calendar,
  Clock,
  Home,
  CreditCard,
  UsersRound,
  MessageCircle,
  Droplet,
  Lock,
  Bell,
  CheckCircle,
  GraduationCap,
  Baby,
  UserRound,
  QrCode,
  UserPlus,
  BarChart3,
  List,
  Briefcase,
  Megaphone,
  Search,
  PlayCircle,
  Bookmark,
  Send,
  Settings,
  Repeat,
  PieChart,
} from "lucide-react";

export type ServiceBannerConfig = {
  slug: string;
  device: "phone" | "laptop";
  deviceImage: string;
  chipIcons: LucideIcon[];
  cardIcons: LucideIcon[];
};

// Structural data only (icons, device type, image). All display text lives in
// messages/*.json under `servicios.banners`, indexed to match this array
// 1:1 — chipIcons/cardIcons lengths must match the corresponding chips/cards
// arrays per locale.
export const SERVICES_CONFIG: ServiceBannerConfig[] = [
  {
    slug: "cover",
    device: "phone",
    deviceImage: "cover-phone.png",
    chipIcons: [Users, Calendar, Heart, MessageCircle, BookOpen, CreditCard, BarChart3, Sparkles],
    cardIcons: [Code2, ShieldCheck, Sparkles, Headphones],
  },
  {
    slug: "donativos",
    device: "phone",
    deviceImage: "donativos-phone.png",
    chipIcons: [Heart, Target, Repeat, PieChart, FileText],
    cardIcons: [Heart, Users, Target, FileText],
  },
  {
    slug: "calendario",
    device: "phone",
    deviceImage: "calendario-phone.png",
    chipIcons: [Flame, Star, BookOpen, Calendar, Clock],
    cardIcons: [Flame, BookOpen, Calendar, Clock],
  },
  {
    slug: "miembros",
    device: "phone",
    deviceImage: "miembros-phone.png",
    chipIcons: [Users, Home, CreditCard, UsersRound, MessageCircle],
    cardIcons: [Users, Home, CreditCard, UsersRound],
  },
  {
    slug: "mikve",
    device: "phone",
    deviceImage: "mikve-phone.png",
    chipIcons: [Droplet, Calendar, Lock, Bell, CheckCircle],
    cardIcons: [Calendar, Lock, Bell, Clock],
  },
  {
    slug: "servicios-comunitarios",
    device: "phone",
    deviceImage: "servicios-comunitarios-phone.png",
    chipIcons: [GraduationCap, Users, Heart, Baby, BookOpen, UserRound],
    cardIcons: [GraduationCap, Baby, UserRound, Heart],
  },
  {
    slug: "eventos",
    device: "phone",
    deviceImage: "eventos-phone.png",
    chipIcons: [Calendar, UserPlus, QrCode, Users, Clock, BarChart3],
    cardIcons: [Calendar, Users, QrCode, Clock],
  },
  {
    slug: "jconnect",
    device: "phone",
    deviceImage: "jconnect-phone.png",
    chipIcons: [List, Briefcase, UserRound, Users, Megaphone, Search],
    cardIcons: [Briefcase, Users, List, Megaphone],
  },
  {
    slug: "tora",
    device: "phone",
    deviceImage: "tora-phone.png",
    chipIcons: [PlayCircle, Headphones, GraduationCap, FileText, Bookmark, Clock],
    cardIcons: [PlayCircle, Headphones, FileText, Bookmark],
  },
  {
    slug: "admin",
    device: "laptop",
    deviceImage: "admin-laptop.png",
    chipIcons: [Users, Calendar, Heart, BarChart3, Send, Settings],
    cardIcons: [Users, Heart, Send, BarChart3],
  },
];
