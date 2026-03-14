import { Doctor, NewsItem, ResourceLink, KnowledgeMaterial } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'გიორგი',
    surname: 'აბაშიძე',
    specialty: 'კარდიოლოგია',
    department: 'კარდიოლოგიური დეპარტამენტი',
    position: 'დეპარტამენტის ხელმძღვანელი',
    phone: '+995 555 12 34 56',
    internalPhone: '101',
    email: 'g.abashidze@ingorokva.ge',
    image: 'https://picsum.photos/seed/doc1/400/400',
    bio: '20 წლიანი გამოცდილება ინტერვენციულ კარდიოლოგიაში.'
  },
  {
    id: '2',
    name: 'ნინო',
    surname: 'კაპანაძე',
    specialty: 'ნევროლოგია',
    department: 'ნევროლოგიური დეპარტამენტი',
    position: 'უფროსი ექიმი',
    phone: '+995 555 98 76 54',
    internalPhone: '102',
    email: 'n.kapanadze@ingorokva.ge',
    image: 'https://picsum.photos/seed/doc2/400/400',
    bio: 'სპეციალიზაცია: ნეირორეაბილიტაცია და ეპილეფტოლოგია.'
  },
  {
    id: '3',
    name: 'დავით',
    surname: 'ბერიძე',
    specialty: 'ქირურგია',
    department: 'ზოგადი ქირურგია',
    position: 'ქირურგი',
    phone: '+995 555 11 22 33',
    internalPhone: '103',
    email: 'd.beridze@ingorokva.ge',
    image: 'https://picsum.photos/seed/doc3/400/400',
    bio: 'ლაპაროსკოპიული ქირურგიის ექსპერტი.'
  }
];

export const NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'ახალი კარდიოლოგიური პროტოკოლი',
    date: '2024-03-10',
    category: 'პროტოკოლი',
    summary: 'დამტკიცდა მწვავე კორონარული სინდრომის მართვის განახლებული პროტოკოლი.'
  },
  {
    id: '2',
    title: 'შიდა ტრენინგი: ACLS განახლება',
    date: '2024-03-12',
    category: 'ტრენინგი',
    summary: 'შაბათს, 14:00 საათზე გაიმართება პრაქტიკული მეცადინეობა რეანიმაციულ განყოფილებაში.'
  }
];

export const RESOURCES: ResourceLink[] = [
  {
    id: '1',
    title: 'ლაბორატორიული სისტემა',
    description: 'ანალიზების პასუხების ნახვა და მართვა',
    url: '#',
    icon: 'Beaker'
  },
  {
    id: '2',
    title: 'PACS/DICOM',
    description: 'რადიოლოგიური კვლევების არქივი',
    url: '#',
    icon: 'Activity'
  },
  {
    id: '3',
    title: 'ელ. ისტორიები',
    description: 'პაციენტის ელექტრონული სამედიცინო ჩანაწერები',
    url: '#',
    icon: 'FileText'
  }
];

export const KNOWLEDGE_BASE: KnowledgeMaterial[] = [
  {
    id: '1',
    title: 'ჰიპერტენზიის მართვის გაიდლაინი 2024',
    type: 'გაიდლაინი',
    specialty: 'კარდიოლოგია',
    date: '2024-01-15',
    author: 'ევროპის კარდიოლოგთა საზოგადოება',
    description: 'ახალი რეკომენდაციები არტერიული ჰიპერტენზიის დიაგნოსტიკისა და მკურნალობისთვის.'
  },
  {
    id: '2',
    title: 'ინსულტის მართვის ალგორითმი',
    type: 'ალგორითმი',
    specialty: 'ნევროლოგია',
    date: '2024-02-20',
    author: 'ინგოროყვას კლინიკის სამეცნიერო საბჭო',
    description: 'მწვავე იშემიური ინსულტის მართვის ნაბიჯ-ნაბიჯ ინსტრუქცია.'
  }
];
