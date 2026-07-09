export type ProductCategory =
  | "cleansers"
  | "serums"
  | "moisturizers"
  | "exfoliants"
  | "elixirs"
  | "oils"
  | "clays"
  | "essences"
  | (string & {})

export interface ProductImage {
  id: string
  imageUrl: string
  alt: string
  displayOrder: number
}

export interface Product {
  id: string
  number: string
  name: string
  tagline: string
  price: number
  category: ProductCategory
  image?: string // Deprecated - use images array instead
  images?: ProductImage[]
  description: string
  ingredients: string[]
  usage: string
  volume: string
  rating: number
  reviewsCount: number
  featured?: boolean
  skinConcerns: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  rating: number
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export type SortOrder = "default" | "price-asc" | "price-desc"
