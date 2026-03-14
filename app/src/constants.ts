import jivexLogo from './assets/jivex-logo.svg';
import webmedLogo from './assets/webmed-logo.svg';
import { type NewsItem, type ResourceLink } from './types';

export const PHONE_DIRECTORY_URL = 'https://phone.imed.com.ge/';
export const KNOWLEDGE_HUB_URL = 'https://drive.google.com/drive/folders/1NAkvFwEI-BTnb1NLLv0xDR4iaGTY7KRT';

export const NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'ახალი კარდიოლოგიური პროტოკოლი',
    date: '2024-03-10',
    category: 'პროტოკოლი',
    summary: 'დამტკიცდა მწვავე კორონარული სინდრომის მართვის განახლებული პროტოკოლი.',
    content:
      'კლინიკაში ძალაში შევიდა მწვავე კორონარული სინდრომის მართვის განახლებული პროტოკოლი.\n\nგანახლება მოიცავს ტრიაჟის, პირველადი შეფასების, მედიკამენტური ჩარევისა და შემდგომი მონიტორინგის ეტაპებს.\n\nთხოვნაა ყველა შესაბამისმა დეპარტამენტმა სამუშაო პროცესში იხელმძღვანელოს მხოლოდ ამ განახლებული ვერსიით.'
  },
  {
    id: '2',
    title: 'შიდა ტრენინგი: ACLS განახლება',
    date: '2024-03-12',
    category: 'ტრენინგი',
    summary: 'შაბათს, 14:00 საათზე გაიმართება პრაქტიკული მეცადინეობა რეანიმაციულ განყოფილებაში.',
    content:
      'შიდა ტრენინგი ACLS-ის განახლებულ გაიდლაინებს დაეთმობა.\n\nსესიის ფარგლებში განხილული იქნება ალგორითმები, სწრაფი რეაგირების სცენარები და პრაქტიკული სიმულაციები.\n\nდასწრება რეკომენდებულია რეანიმაციის, გადაუდებელი მედიცინისა და შიდა მედიცინის თანამშრომლებისთვის.'
  }
];

export const RESOURCES: ResourceLink[] = [
  {
    id: '7',
    title: 'WebMed',
    description: 'პაციენტის ელექტრონული სამედიცინო ჩანაწერები',
    url: 'http://192.168.10.2:4449/signIn?ReturnUrl=%2FPatient',
    icon: 'Database',
    logo: webmedLogo,
    access: 'შიდა ქსელი',
  },
  {
    id: '8',
    title: 'ლაბორატორიული სისტემა',
    description: 'ანალიზების პასუხების ნახვა და მართვა',
    url: 'http://192.168.30.155:8069/#page=0&limit=20&view_type=tree_inno_datefilter&model=sale.order&menu_id=573&action=392',
    icon: 'Beaker',
    access: 'შიდა ქსელი',
  },
  {
    id: '9',
    title: 'JiveX',
    description: 'რადიოლოგიური კვლევების არქივი',
    url: 'http://217.147.224.94/jivexmobile/?fbclid=IwZXh0bgNhZW0CMTEAAR3LeijpY-68V48m5p0kv3OH-tnz-v2FIWOKUFAxHPt7ViF1xVPgBR2eGuQ_aem_xosYn7PMEKB4g4mld-2-xA',
    icon: 'Activity',
    logo: jivexLogo,
    access: 'გარე IP',
  },
  {
    id: '5',
    title: 'პაციენტთა ბრუნვა',
    description: 'პაციენტების მოძრაობის კონტროლი',
    url: 'https://turnover.imed.com.ge/',
    icon: 'RefreshCw',
    access: 'ვებ',
  },
  {
    id: '1',
    title: 'ტელეფონის ნომრების ბაზა',
    description: 'შიდა და გარე საკონტაქტო ნომრები',
    url: 'https://phone.imed.com.ge/',
    icon: 'Phone',
    access: 'ვებ',
  },
  {
    id: '2',
    title: 'კალკულატორები',
    description: 'სამედიცინო კალკულატორები და სკალები',
    url: 'https://calculator.imed.com.ge/',
    icon: 'Calculator',
    access: 'ვებ',
  },
  {
    id: '3',
    title: 'გაწერის შემდგომი რეკომენდაციები და დანიშნულება',
    description: 'გაწერის შემდეგ რეკომენდაციებისა და დანიშნულების ფორმა',
    url: 'https://danishnuleba.imed.com.ge/',
    icon: 'Home',
    access: 'ვებ',
  },
  {
    id: '4',
    title: 'სტაციონარული დანიშნულება',
    description: 'სტაციონარის დანიშნულების ფურცლები',
    url: 'https://priscription.imed.com.ge/',
    icon: 'FileText',
    access: 'ვებ',
  },
  {
    id: '6',
    title: 'ER ორდერ-სეტი',
    description: 'გადაუდებელი დახმარების შეკვეთების ნაკრები',
    url: 'https://imed458.github.io/erorderset.github.io/',
    icon: 'ClipboardList',
    access: 'ვებ',
  },
  {
    id: '10',
    title: 'ცოდნის ჰაბი (Drive)',
    description: 'სასწავლო მასალები და გაიდლაინები',
    url: KNOWLEDGE_HUB_URL,
    icon: 'BookOpen',
    access: 'Google Drive',
  },
  {
    id: '11',
    title: 'შაბლონები და ფორმები',
    description: 'ოფიციალური დოკუმენტების შაბლონები',
    url: 'https://www.ingorokvaclinic.org/services-7',
    icon: 'Files',
    access: 'ვებ',
  }
];
