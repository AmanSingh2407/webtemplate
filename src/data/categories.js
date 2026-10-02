// Categories Data Registry

export const CATEGORIES = [
  {
    id: 'cat-1',
    slug: 'website-development',
    name: 'Website Development',
    description: 'Modern, responsive and high-performance websites.',
    icon: 'Globe',
    color: 'blue',
    templateCount: 5
  },
  {
    id: 'cat-2',
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    description: 'Android and iOS applications with engaging user experiences.',
    icon: 'Smartphone',
    color: 'purple',
    templateCount: 5
  },
  {
    id: 'cat-3',
    slug: 'erp-solutions',
    name: 'ERP Solutions',
    description: 'Custom ERP systems to streamline business operations.',
    icon: 'Database',
    color: 'green',
    templateCount: 2
  },
  {
    id: 'cat-4',
    slug: 'crm-solutions',
    name: 'CRM Solutions',
    description: 'Manage customers, sales and relationships efficiently.',
    icon: 'Users',
    color: 'orange',
    templateCount: 2
  },
  {
    id: 'cat-5',
    slug: 'ecommerce-development',
    name: 'eCommerce Development',
    description: 'Scalable online stores with powerful commerce features.',
    icon: 'ShoppingBag',
    color: 'pink',
    templateCount: 12
  },
  {
    id: 'cat-6',
    slug: 'custom-software-development',
    name: 'Custom Software Development',
    description: 'Tailored software designed for your unique business needs.',
    icon: 'Code',
    color: 'violet',
    templateCount: 2
  },
  {
    id: 'cat-7',
    slug: 'cloud-hosting-solutions',
    name: 'Cloud & Hosting Solutions',
    description: 'Reliable, secure and scalable cloud infrastructure.',
    icon: 'Cloud',
    color: 'cyan',
    templateCount: 2
  },
  {
    id: 'cat-8',
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    description: 'SEO, social media and performance marketing solutions.',
    icon: 'TrendingUp',
    color: 'yellow',
    templateCount: 2
  },
  {
    id: 'cat-9',
    slug: 'cms-development',
    name: 'CMS Development',
    description: 'Easy-to-manage content systems for businesses.',
    icon: 'Layout',
    color: 'pink',
    templateCount: 2
  },
  {
    id: 'cat-10',
    slug: 'training-internships',
    name: 'Training & Internships',
    description: 'Industry-oriented training to build real skills.',
    icon: 'GraduationCap',
    color: 'blue',
    templateCount: 2
  },
  {
    id: 'cat-11',
    slug: 'it-consultation-support',
    name: 'IT Consultation & Support',
    description: 'Expert guidance and ongoing technical support.',
    icon: 'Headphones',
    color: 'purple',
    templateCount: 2
  },
  {
    id: 'cat-12',
    slug: 'saas-development',
    name: 'SaaS Development',
    description: 'Scalable SaaS products for modern businesses.',
    icon: 'Layers',
    color: 'green',
    templateCount: 5
  }
];

export const getCategoryBySlug = (slug) => {
  return CATEGORIES.find(c => c.slug === slug) || null;
};
