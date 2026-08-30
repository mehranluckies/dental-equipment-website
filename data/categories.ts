import type { ProductCategory } from '~/types'
export const categories: ProductCategory[] = [
  {
    id: '1',
    slug: 'intraoral-scanners',
    name: 'Intraoral Scanners',
    description: 'High-precision digital impression systems for chairside scanning',
    icon: 'Scan',
    image: '/images/categories/intraoral-scanners.jpg',
    order: 1
  },
  {
    id: '2',
    slug: 'lab-scanners',
    name: 'Laboratory Scanners',
    description: 'Professional-grade scanners for dental laboratories',
    icon: 'ScanLine',
    image: '/images/categories/lab-scanners.jpg',
    order: 2
  },
  {
    id: '3',
    slug: '3d-printers',
    name: '3D Printers',
    description: 'Advanced dental 3D printing solutions for models, guides, and restorations',
    icon: 'Printer',
    image: '/images/categories/3d-printers.jpg',
    order: 3
  },
  {
    id: '4',
    slug: 'materials',
    name: 'Dental Materials',
    description: 'Premium resins and materials for digital dentistry',
    icon: 'Droplet',
    image: '/images/categories/materials.jpg',
    order: 4
  },
  {
    id: '5',
    slug: 'milling-machines',
    name: 'Milling Machines',
    description: 'CAD/CAM milling systems for same-day restorations',
    icon: 'Cog',
    image: '/images/categories/milling.jpg',
    order: 5
  },
  {
    id: '6',
    slug: 'software',
    name: 'Design Software',
    description: 'Professional dental CAD software solutions',
    icon: 'Monitor',
    image: '/images/categories/software.jpg',
    order: 6
  },
  {
    id: '7',
    slug: 'accessories',
    name: 'Accessories',
    description: 'Essential accessories and post-processing equipment',
    icon: 'Package',
    image: '/images/categories/accessories.jpg',
    order: 7
  }
]
