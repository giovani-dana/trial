import {
  Presentation, Mic, Megaphone, Handshake, Newspaper, Radio, CalendarDays, Lightbulb, UserRound, Trophy,
  Ear, Activity, MessagesSquare, Compass, ShieldCheck, Lock, Clock, Gavel, BadgeCheck, Users, FileText,
  Rocket, Sparkles, Target, Mail, Search, Command, Keyboard, type LucideIcon,
} from "lucide-react";

export const iconMap = {
  Presentation, Mic, Megaphone, Handshake, Newspaper, Radio, CalendarDays, Lightbulb, UserRound, Trophy,
  Ear, Activity, MessagesSquare, Compass, ShieldCheck, Lock, Clock, Gavel, BadgeCheck, Users, FileText,
  Rocket, Sparkles, Target, Mail, Search, Command, Keyboard,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function getIcon(name: IconName): LucideIcon {
  return iconMap[name] ?? Sparkles;
}
