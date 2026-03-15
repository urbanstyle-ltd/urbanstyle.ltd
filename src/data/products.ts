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
    name: { et: 'Denim Jakk', en: 'Denim Jacket', ru: 'Джинсовая Куртка' },
  },
  {
    id: 'sage-hoodie',
    slug: 'sage-hoodie',
    category: 'hoodies',
    heroImage: 'product_2a_hoodie_card',
    detailImages: ['product_2a_hoodie_hero', 'product_2b_hoodie_embroidery', 'product_2b_hoodie_fabric', 'product_2b_hoodie_colors'],
    price: 119,
    name: { et: 'Sage Pusa', en: 'Sage Hoodie', ru: 'Худи Sage' },
  },
  {
    id: 'tallinn-tee',
    slug: 'tallinn-tee',
    category: 'tees',
    heroImage: 'product_3a_tee_card',
    detailImages: ['product_3a_tee_hero', 'product_3b_tee_design1', 'product_3b_tee_design2', 'product_3b_tee_design3', 'product_3b_tee_design4'],
    price: 49,
    name: { et: 'Tallinna T-Särk', en: 'Tallinn Tee', ru: 'Футболка Tallinn' },
  },
  {
    id: 'charcoal-joggers',
    slug: 'charcoal-joggers',
    category: 'pants',
    heroImage: 'product_4a_joggers_card',
    detailImages: ['product_4a_joggers_hero', 'product_4b_joggers_pocket', 'product_4b_joggers_fabric'],
    price: 99,
    name: { et: 'Charcoal Püksid', en: 'Charcoal Joggers', ru: 'Джоггеры Charcoal' },
  },
  {
    id: 'crossbody-bag',
    slug: 'crossbody-bag',
    category: 'bags',
    heroImage: 'product_5a_bag_card',
    detailImages: ['product_5a_bag_hero', 'product_6c_accessories_group', 'product_accessories_flatlay'],
    price: 79,
    name: { et: 'Crossbody Kott', en: 'Crossbody Bag', ru: 'Сумка Crossbody' },
  },
  {
    id: 'wool-beanie',
    slug: 'wool-beanie',
    category: 'accessories',
    heroImage: 'product_beanie_hero',
    detailImages: ['product_6a_beanie_hero', 'product_6c_accessories_group', 'product_accessories_flatlay'],
    price: 39,
    name: { et: 'Villane Müts', en: 'Wool Beanie', ru: 'Шапка' },
  },
  {
    id: 'street-cap',
    slug: 'street-cap',
    category: 'accessories',
    heroImage: 'product_cap_hero',
    detailImages: ['product_6b_cap_hero', 'product_6c_accessories_group', 'product_accessories_flatlay'],
    price: 35,
    name: { et: 'Tänavamüts', en: 'Street Cap', ru: 'Кепка' },
  },
  {
    id: 'tech-parka',
    slug: 'tech-parka',
    category: 'outerwear',
    heroImage: 'product_parka_hero',
    detailImages: ['product_7a_parka_hero', 'product_7b_parka_hood', 'product_7b_parka_seam', 'product_parka_hood', 'product_parka_seam'],
    price: 249,
    name: { et: 'Tech Parka', en: 'Tech Parka', ru: 'Парка Tech' },
  },
  {
    id: 'urban-sneakers',
    slug: 'urban-sneakers',
    category: 'footwear',
    heroImage: 'product_sneaker_hero',
    detailImages: ['product_8a_sneaker_hero', 'product_sneaker_heel', 'product_sneaker_sole'],
    price: 159,
    name: { et: 'Urban Tossud', en: 'Urban Sneakers', ru: 'Кроссовки Urban' },
  },
];

export const teamMembers = [
  { id: 'kristi_tamm', name: 'Kristi Tamm', role: { et: 'Tegevjuht', en: 'CEO', ru: 'Генеральный директор' }, imageKey: 'kristi_headshot', quote: { et: 'Kvaliteet ületab alati kvantiteeti.', en: 'Quality over quantity, always.', ru: 'Качество важнее количества.' } },
  { id: 'toomas_kask', name: 'Toomas Kask', role: { et: 'IT juht', en: 'IT Director', ru: 'ИТ-директор' }, imageKey: 'toomas_headshot', quote: { et: 'Andmed juhivad iga otsust.', en: 'Data drives every decision.', ru: 'Данные определяют каждое решение.' } },
  { id: 'anna_mets', name: 'Anna Mets', role: { et: 'Turunduse juht', en: 'Marketing Lead', ru: 'Руководитель маркетинга' }, imageKey: 'anna_headshot', quote: { et: 'Autentsed lood kõnetavad.', en: 'Authentic stories resonate.', ru: 'Искренние истории находят отклик.' } },
  { id: 'marko_saar', name: 'Marko Saar', role: { et: 'Tootejuht', en: 'Product Manager', ru: 'Продукт-менеджер' }, imageKey: 'marko_headshot', quote: { et: 'Iga piste loeb.', en: 'Every stitch matters.', ru: 'Каждый стежок имеет значение.' } },
  { id: 'liis_koppel', name: 'Liis Koppel', role: { et: 'Operatsioonide juht', en: 'Operations Manager', ru: 'Операционный менеджер' }, imageKey: 'liis_headshot', quote: { et: 'Efektiivsus loob vabaduse.', en: 'Efficiency creates freedom.', ru: 'Эффективность создаёт свободу.' } },
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
