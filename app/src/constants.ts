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
    id: 'phone-base',
    title: 'ტელეფონის ნომრების ბაზა',
    description: 'შიდა და მობილური ნომრების სწრაფი ძიება პერსონალისთვის.',
    url: 'https://phone.imed.com.ge/',
    icon: 'Phone',
    category: 'კომუნიკაცია',
    access: 'ვებ',
    note: 'სწრაფი წვდომა შიდა კონტაქტებზე და დეპარტამენტების ნომრებზე.',
    featured: true,
  },
  {
    id: 'calculators',
    title: 'კალკულატორები',
    description: 'კლინიკური კალკულატორები და სწრაფი სამედიცინო გამოთვლები.',
    url: 'https://calculator.imed.com.ge/',
    icon: 'Calculator',
    category: 'კლინიკური პროცესები',
    access: 'ვებ',
    note: 'მოსახერხებელია სწრაფი გადაწყვეტილებებისა და შეფასებებისათვის.',
    featured: true,
  },
  {
    id: 'home-prescription',
    title: 'დანიშნულება ბინაზე',
    description: 'ბინაზე გასატანი დანიშნულებების ფორმირება და მართვა.',
    url: 'https://danishnuleba.imed.com.ge/',
    icon: 'House',
    category: 'კლინიკური პროცესები',
    access: 'ვებ',
    note: 'გამოიყენე ამბულატორიული და სახლში გასაყვანი პაციენტებისათვის.',
    featured: true,
  },
  {
    id: 'inpatient-prescription',
    title: 'სტაციონარული დანიშნულება',
    description: 'სტაციონარში მიმდინარე დანიშნულებების მართვა.',
    url: 'https://priscription.imed.com.ge/',
    icon: 'ClipboardPlus',
    category: 'კლინიკური პროცესები',
    access: 'ვებ',
    note: 'სწრაფი წვდომა სტაციონარული პაციენტის მიმდინარე დანიშნულებებზე.',
    featured: true,
  },
  {
    id: 'patient-turnover',
    title: 'პაციენტთა ბრუნვა',
    description: 'პაციენტთა გადაადგილების, ნაკადისა და მიმდინარე სტატუსების მონიტორინგი.',
    url: 'https://turnover.imed.com.ge/',
    icon: 'RefreshCw',
    category: 'კლინიკური პროცესები',
    access: 'ვებ',
    note: 'მთავარი ოპერატიული ეკრანი კლინიკური ნაკადების საკონტროლოდ.',
    featured: true,
  },
  {
    id: 'er-order-set',
    title: 'ER ორდერ-სეტი',
    description: 'მიღების განყოფილების მზა ორდერ-სეტები და ფორმები.',
    url: 'https://imed458.github.io/erorderset.github.io/',
    icon: 'ShieldCheck',
    category: 'კლინიკური პროცესები',
    access: 'ვებ',
    note: 'სწრაფი სტარტი გადაუდებელი პაციენტის მართვისას.',
  },
  {
    id: 'electronic-history',
    title: 'ელ. ისტორიები',
    description: 'პაციენტის ელექტრონული ისტორია და კლინიკური ჩანაწერები.',
    url: 'http://192.168.10.2:4449/signIn?ReturnUrl=%2FPatient',
    icon: 'FileText',
    category: 'კლინიკური სისტემები',
    access: 'შიდა ქსელი',
    note: 'ხელმისაწვდომია მხოლოდ კლინიკის შიდა ქსელიდან.',
    featured: true,
  },
  {
    id: 'laboratory-system',
    title: 'ლაბორატორიული სისტემა',
    description: 'ლაბორატორიული შეკვეთები, პასუხები და მიმდინარე სამუშაოები.',
    url: 'http://192.168.30.155:8069/#page=0&limit=20&view_type=tree_inno_datefilter&model=sale.order&menu_id=573&action=392',
    icon: 'FlaskConical',
    category: 'კლინიკური სისტემები',
    access: 'შიდა ქსელი',
    note: 'ODoo-ზე დაფუძნებული ლაბორატორიული სამუშაო გარემო.',
  },
  {
    id: 'jivex-archive',
    title: 'რადიოლოგიური კვლევების არქივი JIVEX',
    description: 'რადიოლოგიური გამოსახულებების მობილური და ვებ არქივი.',
    url: 'http://217.147.224.94/jivexmobile/?fbclid=IwZXh0bgNhZW0CMTEAAR3LeijpY-68V48m5p0kv3OH-tnz-v2FIWOKUFAxHPt7ViF1xVPgBR2eGuQ_aem_xosYn7PMEKB4g4mld-2-xA',
    icon: 'Activity',
    category: 'კლინიკური სისტემები',
    access: 'გარე IP',
    note: 'გამოსადეგია კვლევების სწრაფი ნახვისთვის მობილურზეც.',
  },
  {
    id: 'knowledge-hub',
    title: 'ცოდნის ჰაბი',
    description: 'გაიდლაინები, სასწავლო მასალები და შიდა ინსტრუქციები.',
    url: 'https://drive.google.com/drive/folders/1NAkvFwEI-BTnb1NLLv0xDR4iaGTY7KRT',
    icon: 'BookOpen',
    category: 'ცოდნა და დოკუმენტები',
    access: 'Google Drive',
    note: 'გაიხსნება ახალ ფანჯარაში Google Drive საქაღალდედ.',
  },
  {
    id: 'templates-forms',
    title: 'შაბლონები და ფორმები',
    description: 'სამუშაო დოკუმენტები, ფორმები და დასაბეჭდი შაბლონები.',
    url: 'https://www.ingorokvaclinic.org/services-7',
    icon: 'Files',
    category: 'ცოდნა და დოკუმენტები',
    access: 'ვებ',
    note: 'სასარგებლოა განყოფილებების ყოველდღიური დოკუმენტბრუნვისთვის.',
  },
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
