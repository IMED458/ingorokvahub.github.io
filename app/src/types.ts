export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'პროტოკოლი' | 'სიახლე' | 'ტრენინგი' | 'ადმინისტრაციული';
  summary: string;
  content?: string;
}

export type ResourceIconName =
  | 'Phone'
  | 'Calculator'
  | 'House'
  | 'ClipboardPlus'
  | 'RefreshCw'
  | 'ShieldCheck'
  | 'FileText'
  | 'FlaskConical'
  | 'Activity'
  | 'BookOpen'
  | 'Files';

export interface Doctor {
  id: string;
  name: string;
  surname: string;
  specialty: string;
  department: string;
  position: string;
  phone: string;
  internalPhone: string;
  email: string;
  image: string;
  bio: string;
}

export interface ResourceLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: ResourceIconName;
  category: 'კომუნიკაცია' | 'კლინიკური პროცესები' | 'კლინიკური სისტემები' | 'ცოდნა და დოკუმენტები';
  access: 'ვებ' | 'შიდა ქსელი' | 'გარე IP' | 'Google Drive';
  note?: string;
  featured?: boolean;
}

export interface KnowledgeMaterial {
  id: string;
  title: string;
  type: 'გაიდლაინი' | 'პროტოკოლი' | 'ალგორითმი' | 'ვიდეო';
  specialty: string;
  date: string;
  author: string;
  description: string;
}
