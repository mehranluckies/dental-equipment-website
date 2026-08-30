export interface Product {
  id: string
  slug: string
  name: string
  sku: string
  tagline: string
  description: string
  longDescription: string
  categoryId: string
  heroImage: string
  galleryImages: string[]
  videoUrl?: string
  keyFeatures: Feature[]
  specifications: Specification[]
  applications: string[]
  price?: number
  isNew: boolean
  isFeatured: boolean
  badges: string[]
  relatedProductIds: string[]
  downloadFiles?: DownloadFile[]
  publishedAt: Date
}

export interface ProductCategory {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  image: string
  order: number
}

export interface Feature {
  title: string
  description: string
  icon?: string
}

export interface Specification {
  label: string
  value: string
  group: string
}

export interface DownloadFile {
  title: string
  type: 'brochure' | 'manual' | 'catalog' | 'software'
  fileUrl: string
  fileSize: string
}

export interface Solution {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  heroImage: string
  problem: string
  solutionApproach: string
  workflow: WorkflowStep[]
  benefits: string[]
  productIds: string[]
  caseStudyIds: string[]
  publishedAt: Date
}

export interface WorkflowStep {
  order: number
  title: string
  description: string
  icon: string
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  coverImage: string
  clinicName: string
  doctorName: string
  doctorTitle: string
  country: string
  treatmentType: string
  challenge: string
  solution: string
  results: string
  productIds: string[]
  technology: string[]
  gallery: string[]
  category: string
  publishedAt: Date
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  authorId: string
  categories: string[]
  tags: string[]
  readingTime: number
  publishedAt: Date
}

export interface Author {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
}

export interface Service {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  icon: string
  image: string
  features: string[]
  benefits: string[]
}

export interface Testimonial {
  id: string
  quote: string
  doctorName: string
  doctorTitle: string
  clinicName: string
  country: string
  avatar?: string
  rating: number
  featured: boolean
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
}
