export interface Product {
  id: string;
  number: string;
  name: string;
  tagline: string;
  price: number;
  category: 'cleansers' | 'serums' | 'moisturizers' | 'exfoliants' | 'elixirs' | 'oils' | 'clays' | 'essences' | string;
  image: string;
  description: string;
  ingredients: string[];
  usage: string;
  volume: string;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  skinConcerns: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
