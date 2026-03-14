export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'პროტოკოლი' | 'სიახლე' | 'ტრენინგი' | 'ადმინისტრაციული' | 'განცხადება';
  summary: string;
  content?: string;
  createdAt?: number;
}

export interface ResourceLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  logo?: string;
  access?: 'ვებ' | 'შიდა ქსელი' | 'გარე IP' | 'Google Drive';
}

export interface DirectoryDoctor {
  id: string;
  fullName: string;
  specialty: string;
  department: string;
  phone: string;
  comment: string;
  sourceKey: string;
  isInitial: boolean;
  searchText: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  url: string;
  modifiedLabel: string;
  pathLabel: string;
  extension: string;
}

export interface KnowledgeDepartment {
  id: string;
  slug: string;
  title: string;
  url: string;
  modifiedLabel: string;
  documentCount: number;
  documents: KnowledgeDocument[];
}
