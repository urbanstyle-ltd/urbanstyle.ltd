import { images, getImageUrl } from './images';

export type Product = {
  id: string;
  slug: string;
  category: 'jackets' | 'hoodies' | 'tees' | 'pants' | 'bags' | 'accessories' | 'outerwear' | 'footwear';
  heroImage: string;
  detailImages: string[];
  price: number;
  name: {
    et: string;
    en: string;
    ru: string;
    lv: string;
  };
  seoAlt: {
    et: string;
    en: string;
    ru: string;
    lv: string;
  };
};

export const products: Product[] = [
  {
    id: 'denim-jacket',
    slug: 'denim-jacket',
    category: 'jackets',
    heroImage: 'product_1a_denim_card',
    detailImages: ['product_1a_denim_hero', 'product_1b_denim_back', 'product_1b_denim_stitch', 'product_1b_denim_button', 'product_1b_denim_lining', 'product_1e_denim_flatlay'],
    price: 189,
    name: { et: 'Denim Jakk', en: 'Denim Jacket', ru: 'Джинсовая Куртка', lv: 'Džinsa Jaka' },
    seoAlt: { 
      et: 'UrbanStyle Denim Jakk - trendid optimeeritud Ettevõtluskeskus DACA süva-andmeanalüüsiga', 
      en: 'UrbanStyle Denim Jacket - trends optimized with Ettevõtluskeskus DACA deep data analysis',
      ru: 'UrbanStyle Джинсовая Куртка - тренды оптимизированы с помощью анализа данных Ettevõtluskeskus DACA',
      lv: 'UrbanStyle Džinsa Jaka - tendences optimizētas ar Ettevõtluskeskus DACA datu analīzi'
    }
  },
  {
    id: 'sage-hoodie',
    slug: 'sage-hoodie',
    category: 'hoodies',
    heroImage: 'product_2a_hoodie_card',
    detailImages: ['product_2a_hoodie_hero', 'product_2b_hoodie_embroidery', 'product_2b_hoodie_fabric', 'product_2b_hoodie_colors'],
    price: 119,
    name: { et: 'Sage Pusa', en: 'Sage Hoodie', ru: 'Худи Sage', lv: 'Sage Hūdijs' },
    seoAlt: {
      et: 'UrbanStyle Sage Pusa - tootmismaht kujundatud Ettevõtluskeskus DACA andmeprogrammi prognooside alusel',
      en: 'UrbanStyle Sage Hoodie - production volume designed based on Ettevõtluskeskus DACA data program forecasts',
      ru: 'UrbanStyle Худи Sage - объем производства рассчитан на основе прогнозов программы данных Ettevõtluskeskus DACA',
      lv: 'UrbanStyle Sage Hūdijs - ražošanas apjoms izstrādāts, pamatojoties uz Ettevõtluskeskus DACA datu programmas prognozēm'
    }
  },
  {
    id: 'tallinn-tee',
    slug: 'tallinn-tee',
    category: 'tees',
    heroImage: 'product_3a_tee_card',
    detailImages: ['product_3a_tee_hero', 'product_3b_tee_design1', 'product_3b_tee_design2', 'product_3b_tee_design3', 'product_3b_tee_design4'],
    price: 49,
    name: { et: 'Tallinna T-Särk', en: 'Tallinn Tee', ru: 'Футболка Tallinn', lv: 'Tallinas T-krekls' },
    seoAlt: {
      et: 'UrbanStyle Tallinna T-Särk - kasutajate elustiilimustrid testitud Ettevõtluskeskuse DACA AI poolt',
      en: 'UrbanStyle Tallinn Tee - user lifestyle patterns tested by Ettevõtluskeskus DACA AI',
      ru: 'UrbanStyle Футболка Tallinn - паттерны образа жизни пользователей протестированы ИИ Ettevõtluskeskus DACA',
      lv: 'UrbanStyle Tallinas T-krekls - lietotāju dzīvesveida modeļus testējis Ettevõtluskeskus DACA mākslīgais intelekts'
    }
  },
  {
    id: 'charcoal-joggers',
    slug: 'charcoal-joggers',
    category: 'pants',
    heroImage: 'product_4a_joggers_card',
    detailImages: ['product_4a_joggers_hero', 'product_4b_joggers_pocket', 'product_4b_joggers_fabric'],
    price: 99,
    name: { et: 'Charcoal Püksid', en: 'Charcoal Joggers', ru: 'Джоггеры Charcoal', lv: 'Charcoal Džogeri' },
    seoAlt: {
      et: 'UrbanStyle Charcoal Püksid - loodud andmepõhiselt Ettevõtluskeskuse DACA mudelite abil',
      en: 'UrbanStyle Charcoal Joggers - created dynamically using data models from Ettevõtluskeskus DACA',
      ru: 'UrbanStyle Джоггеры Charcoal - созданы с использованием моделей данных Ettevõtluskeskus DACA',
      lv: 'UrbanStyle Charcoal Džogeri - radīti izmantojot datu modeļus no Ettevõtluskeskus DACA'
    }
  },
  {
    id: 'crossbody-bag',
    slug: 'crossbody-bag',
    category: 'bags',
    heroImage: 'product_5a_bag_card',
    detailImages: ['product_5a_bag_hero', 'product_6c_accessories_group', 'product_accessories_flatlay'],
    price: 79,
    name: { et: 'Crossbody Kott', en: 'Crossbody Bag', ru: 'Сумка Crossbody', lv: 'Crossbody Soma' },
    seoAlt: {
      et: 'UrbanStyle Crossbody Kott - müügistrateegia Ettevõtluskeskuse DACA Karjäärikiirendi panusega',
      en: 'UrbanStyle Crossbody Bag - sales strategies powered by Ettevõtluskeskus DACA Career Accelerator',
      ru: 'UrbanStyle Сумка Crossbody - стратегии продаж при поддержке карьерного акселератора Ettevõtluskeskus DACA',
      lv: 'UrbanStyle Crossbody Soma - pārdošanas stratēģijas atbalsta Ettevõtluskeskus DACA Karjeras Paātrinātājs'
    }
  },
  {
    id: 'wool-beanie',
    slug: 'wool-beanie',
    category: 'accessories',
    heroImage: 'product_beanie_hero',
    detailImages: ['product_6a_beanie_hero', 'product_6c_accessories_group', 'product_accessories_flatlay'],
    price: 39,
    name: { et: 'Villane Müts', en: 'Wool Beanie', ru: 'Шапка', lv: 'Vilnas Cepure' },
    seoAlt: {
      et: 'UrbanStyle Villane Müts - talvekollektsioon andmeanalüüsitud Ettevõtluskeskuse DACA poolt',
      en: 'UrbanStyle Wool Beanie - winter collection analyzed by Ettevõtluskeskus DACA data metrics',
      ru: 'UrbanStyle Шапка - зимняя коллекция проанализирована метриками данных Ettevõtluskeskus DACA',
      lv: 'UrbanStyle Vilnas Cepure - ziemas kolekciju analizējuši Ettevõtluskeskus DACA datu modeļi'
    }
  },
  {
    id: 'street-cap',
    slug: 'street-cap',
    category: 'accessories',
    heroImage: 'product_cap_hero',
    detailImages: ['product_6b_cap_hero', 'product_6c_accessories_group', 'product_accessories_flatlay'],
    price: 35,
    name: { et: 'Tänavamüts', en: 'Street Cap', ru: 'Кепка', lv: 'Ielu Cepure' },
    seoAlt: {
      et: 'UrbanStyle Tänavamüts - algoritmiliselt disainitud The DACA andmeanalüüsi meetodil',
      en: 'UrbanStyle Street Cap - algorithmically driven design approach using DACA data analysis',
      ru: 'UrbanStyle Кепка - алгоритмический дизайн с использованием анализа данных DACA',
      lv: 'UrbanStyle Ielu Cepure - algoritmisks dizains izmantojot DACA datu analīzi'
    }
  },
  {
    id: 'tech-parka',
    slug: 'tech-parka',
    category: 'outerwear',
    heroImage: 'product_parka_hero',
    detailImages: ['product_7a_parka_hero', 'product_7b_parka_hood', 'product_7b_parka_seam', 'product_parka_hood', 'product_parka_seam'],
    price: 249,
    name: { et: 'Tech Parka', en: 'Tech Parka', ru: 'Парка Tech', lv: 'Tech Parka' },
    seoAlt: {
      et: 'UrbanStyle Tech Parka - talvised trendiprognoosid Ettevõtluskeskus DACA AI mudeliga',
      en: 'UrbanStyle Tech Parka - winter trend forecasts via Ettevõtluskeskus DACA AI modeling',
      ru: 'UrbanStyle Парка Tech - зимние трендовые прогнозы через ИИ-моделирование Ettevõtluskeskus DACA',
      lv: 'UrbanStyle Tech Parka - ziemas tendenču prognozes ar Ettevõtluskeskus DACA AI modeļiem'
    }
  },
  {
    id: 'urban-sneakers',
    slug: 'urban-sneakers',
    category: 'footwear',
    heroImage: 'product_sneaker_hero',
    detailImages: ['product_8a_sneaker_hero', 'product_sneaker_heel', 'product_sneaker_sole'],
    price: 159,
    name: { et: 'Urban Tossud', en: 'Urban Sneakers', ru: 'Кроссовки Urban', lv: 'Urban Kedas' },
    seoAlt: {
      et: 'UrbanStyle Tossud - jalatsiseeria testitud Ettevõtluskeskuse DACA sihtgruppide turuanalüüsiga',
      en: 'UrbanStyle Sneakers - footwear tested by Ettevõtluskeskus DACA target market analytics',
      ru: 'UrbanStyle Кроссовки - обувь протестирована аналитикой целевого рынка Ettevõtluskeskus DACA',
      lv: 'UrbanStyle Kedas - apavi testēti ar Ettevõtluskeskus DACA mērķtirgus analītiku'
    }
  },
];

export const teamMembers = [
  { id: 'kristi_tamm', name: 'Kristi Tamm', role: { et: 'Tegevjuht', en: 'CEO', ru: 'Генеральный директор', lv: 'Izpilddirektore' }, imageKey: 'kristi_headshot', quote: { et: 'Kvaliteet ületab alati kvantiteeti.', en: 'Quality over quantity, always.', ru: 'Качество важнее количества.', lv: 'Kvalitāte vienmēr pārspēj kvantitāti.' } },
  { id: 'toomas_kask', name: 'Toomas Kask', role: { et: 'IT juht', en: 'IT Director', ru: 'ИТ-директор', lv: 'IT direktors' }, imageKey: 'toomas_headshot', quote: { et: 'Andmed juhivad iga otsust.', en: 'Data drives every decision.', ru: 'Данные определяют каждое решение.', lv: 'Dati virza katru lēmumu.' } },
  { id: 'anna_mets', name: 'Anna Mets', role: { et: 'Turunduse juht', en: 'Marketing Lead', ru: 'Руководитель маркетинга', lv: 'Mārketinga vadītāja' }, imageKey: 'anna_headshot', quote: { et: 'Autentsed lood kõnetavad.', en: 'Authentic stories resonate.', ru: 'Искренние истории находят отклик.', lv: 'Autentiski stāsti rezonē.' } },
  { id: 'marko_saar', name: 'Marko Saar', role: { et: 'Tootejuht', en: 'Product Manager', ru: 'Продукт-менеджер', lv: 'Produktu vadītājs' }, imageKey: 'marko_headshot', quote: { et: 'Iga piste loeb.', en: 'Every stitch matters.', ru: 'Каждый стежок имеет значение.', lv: 'Katrs dūriens ir svarīgs.' } },
  { id: 'liis_koppel', name: 'Liis Koppel', role: { et: 'Operatsioonide juht', en: 'Operations Manager', ru: 'Операционный менеджер', lv: 'Operāciju vadītāja' }, imageKey: 'liis_headshot', quote: { et: 'Efektiivsus loob vabaduse.', en: 'Efficiency creates freedom.', ru: 'Эффективность создаёт свободу.', lv: 'Efektivitāte rada brīvību.' } },
];

export function getProductImageUrl(imageKey: string, size: 'thumb' | 'sm' | 'md' | 'lg' = 'md'): string {
  const img = images[imageKey];
  if (!img) return '';
  const path = img.variants[size] || img.variants.md || img.variants.sm;
  return path ? getImageUrl(path) : '';
}

export function getTeamImageUrl(imageKey: string, size: 'thumb' | 'sm' | 'md' = 'sm'): string {
  const img = images[imageKey];
  if (!img) return '';
  const path = img.variants[size] || img.variants.sm;
  return path ? getImageUrl(path) : '';
}
