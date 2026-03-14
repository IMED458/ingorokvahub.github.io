export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'პროტოკოლი' | 'სიახლე' | 'ტრენინგი' | 'ადმინისტრაციული';
  summary: string;
  content?: string;
}

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
  icon: string;
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
