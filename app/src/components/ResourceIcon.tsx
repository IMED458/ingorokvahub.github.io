import { type ComponentType } from 'react';
import {
  Activity,
  BookOpen,
  Calculator,
  ClipboardPlus,
  FileText,
  Files,
  FlaskConical,
  House,
  Phone,
  RefreshCw,
  ShieldCheck,
  type LucideProps,
} from 'lucide-react';
import { type ResourceIconName } from '../types';

const iconMap: Record<ResourceIconName, ComponentType<LucideProps>> = {
  Phone,
  Calculator,
  House,
  ClipboardPlus,
  RefreshCw,
  ShieldCheck,
  FileText,
  FlaskConical,
  Activity,
  BookOpen,
  Files,
};

type ResourceIconProps = LucideProps & {
  name: ResourceIconName;
};

export function ResourceIcon({ name, ...props }: ResourceIconProps) {
  const Icon = iconMap[name];
  return <Icon {...props} />;
}
