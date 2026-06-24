import { Product, Testimonial, FAQItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'secrum-01',
    number: 'N° 01',
    name: 'Luminous Complexion Concentrate',
    tagline: 'Hydrating Botanical Hyaluronic Complex',
    price: 84,
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    description: 'An advanced humectant treatment distilled from mountain-grown rose petals, paired with triple-weight hyaluronic acid. Penetrates deeply to fortify the cellular lipid barrier, restoring bouncy resilience and a translucent, dewy glow.',
    ingredients: [
      'Pure Rose Damascena Distillate',
      'Sodium Hyaluronate (Multi-molecular weight)',
      'Organic Aloe Barbadensis Leaf Juice',
      'Centella Asiatica (Gotu Kola) Extract',
      'Vegetable Glycerin',
      'Provitamin B5 (Panthenol)'
    ],
    usage: 'After cleansing and toning, press 3 to 4 drops gently into the damp face, neck, and décolletage. Follow with oils or moisture melts.',
    volume: '30 ml / 1.0 fl. oz',
    rating: 4.8,
    reviewsCount: 42,
    featured: true,
    skinConcerns: ['Hydration', 'Glow Skin', 'Brightening']
  },
  {
    id: 'secrum-02',
    number: 'N° 02',
    name: 'Ceramide Barrier Recovery',
    tagline: 'Rich Moisture-Lock Barrier Cream',
    price: 72,
    category: 'moisturizers',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    description: 'A botanical lipid matrix that mirrors the skin’s natural sebum. Combining ultra-lightweight sugarcane squalane with purifying alpine eucalyptus oil, it calms redness, purges environmental residue, and refines uneven textures.',
    ingredients: [
      'Sugarcane Squalane (99% pure)',
      'Cold-Pressed Simmondsia Chinensis (Jojoba) Oil',
      'Eucalyptus Globulus Leaf Oil',
      'Rosa Canina (Rosehip) Seed Oil',
      'Tocopherol (Vit E)',
      'Organic Rosemary Leaf Extract'
    ],
    usage: 'Warm 2 drops in your palms and press firmly onto the skin as the final step of your evening ritual.',
    volume: '50 ml / 1.7 oz',
    rating: 4.9,
    reviewsCount: 108,
    featured: true,
    skinConcerns: ['Hydration', 'Sensitive Skin', 'Anti-Aging']
  },
  {
    id: 'secrum-03',
    number: 'N° 03',
    name: 'Squalane & Rose Gold Infusion',
    tagline: 'Active Lipid Recharging Infusion',
    price: 95,
    category: 'moisturizers',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800',
    description: 'Our award-winning whipped luxury butter. Marula and Kalahari Melon Seed lipids form a highly protective humectant mask that seals-in active nutrients during skin peak repair hours, smoothing fine lines by morning.',
    ingredients: [
      'Cold-Pressed Sclerocarya Birrea (Marula) Seed Oil',
      'Wild-Harvested Kalahari Melon Seed Lipids',
      'Organic Butyrospermum Parkii (Shea) Butter',
      'Ceramide NP',
      'Pomegranate Seed Concentrate',
      'Jasmine Officinale Flower Absolute'
    ],
    usage: 'After serums, melt a pea-sized amount between your fingertips and massage in a slow upward motion.',
    volume: '30 ml / 1.0 fl. oz',
    rating: 4.9,
    reviewsCount: 215,
    featured: true,
    skinConcerns: ['Glow Skin', 'Anti-Aging', 'Dark Spots / Pigmentation']
  },
  {
    id: 'secrum-04',
    number: 'N° 04',
    name: 'Gentle Molecular Cleansing Milk',
    tagline: 'Soothing Botanical pH-Balanced Cleanser',
    price: 48,
    category: 'cleansers',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    description: 'Sourced from glaciated Canadian fjords, this nutrient-dense marine silt pulls impurities while infusing over 60 rare minerals. Enriched with fine premium Matcha for powerful antioxidant protection and thermal skin cooling.',
    ingredients: [
      'Glacial Marine Clay/Silt',
      'Organic Camellia Sinensis (Matcha Green Tea) Powder',
      'Colloidal Oatmeal',
      'Kombu Seaweed Extract',
      'Allantoin',
      'Santalum Album (Sandalwood) Oil'
    ],
    usage: 'Apply an even layer to clean skin. Relax for 10 minutes as it lightly sets. Rinse gently with warm water, using small circular motions.',
    volume: '150 ml / 5.1 fl. oz',
    rating: 4.7,
    reviewsCount: 56,
    featured: true,
    skinConcerns: ['Sensitive Skin', 'Hydration', 'Acne Care']
  },
  {
    id: 'secrum-05',
    number: 'N° 05',
    name: 'Resurfacing Retinoid Overnight',
    tagline: 'Active Treatment Formulated with Licorice Root',
    price: 98,
    category: 'serums',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800',
    description: 'A silky hyper-targeted serum with 10% pure Niacinamide to dramatically reverse sun damage, age spots, and acne scarring. Licorice root and natural bearberry extract work synergetically to dissolve hyperpigmentation.',
    ingredients: [
      'Niacinamide (Vitamin B3 10%)',
      'Glycyrrhiza Glabra (Licorice) Root Extract',
      'Arctostaphylos Uva-Ursi (Bearberry) Extract',
      'Siberian Ginseng Root Oil',
      'Phytophid Cellular Water',
      'White Tea Leaf Extract'
    ],
    usage: 'Apply 2-3 drops morning and evening before creams. Layer with sun protection in the morning.',
    volume: '30 ml / 1.0 fl. oz',
    rating: 4.6,
    reviewsCount: 12,
    featured: false,
    skinConcerns: ['Anti-Aging', 'Dark Spots / Pigmentation', 'Acne Care']
  },
  {
    id: 'secrum-06',
    number: 'N° 06',
    name: 'Detoxifying Mineral Mud Mask',
    tagline: 'Skin-Refining Tonic Distilled from High Swiss Flora',
    price: 58,
    category: 'exfoliants',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=800',
    description: 'An astringent mineral mist crafted with fresh glacial runoff, steam-distilled Swiss alpine herbs, and prebiotics. Harmonizes the skin pH immediately, balances the biome, and tightens pores.',
    ingredients: [
      'Glacial Water Carrier',
      'Alpine Willowherb (Epilobium Fleischeri) Extract',
      'Inulin Prebiotics',
      'Siberian Fir Oil',
      'Calendula Officinalis Distillate',
      'Salicylic Acid (0.5% Willow Bark)'
    ],
    usage: 'Mist generously over dry skin after cleansing, or mist throughout the day to recharge skin vitality.',
    volume: '100 ml / 3.4 oz',
    rating: 4.8,
    reviewsCount: 38,
    featured: false,
    skinConcerns: ['Acne Care', 'Brightening', 'Glow Skin']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: "Secrum has transformed my approach to self-care. The textures feel completely bespoke, mimicking a high-end botanical sanctuary. No unnecessary fillers—just active, serene, glass-bottle beauty.",
    author: "Elena Rostov",
    role: "Editorial Director, L'Élément",
    rating: 5
  },
  {
    id: 'test-2',
    quote: "The Rose Quartz Elixir coupled with the Balancing Oil is absolute morning magic. My chronic eczema has calmed down, and the radiant plumpness of my face is noticeable. The minimalism isn't just visual; the formulation is wonderfully clean.",
    author: "Julian Chen",
    role: "Architectural Designer, Studio Chen",
    rating: 5
  },
  {
    id: 'test-3',
    quote: "The Glacial Marine Mud smells deeply of natural ceremonial tea leaves and grounding sandalwood. It’s an ethereal scent that transports me away from high urban stress. Truly therapeutic apothecary work.",
    author: "Sophia Sterling",
    role: "Fine Art Curator, MOMA",
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: "How do the active botanicals remain shelf-stable without toxic preservatives?",
    answer: "We employ dynamic self-preserving natural hurdle systems, incorporating silver citrate, lactobacillus ferment, organic anise root extract, and airless twilight-violet glass vessels that shield light-sensitive nutrients."
  },
  {
    id: 'faq-2',
    question: "Do you offer international shipping for your boutique apothecary bottles?",
    answer: "Yes, we ship worldwide with carbon-neutral parcel carriers. All items are packed in custom organic wood shavings and hand-pressed cotton linen satchels to prevent glass damage."
  },
  {
    id: 'faq-3',
    question: "Are Secrum products safe for highly sensitive or hyper-reactive skin types?",
    answer: "Absolutely. We strictly formulate without artificial fragrances, parabens, sulfates, essential oil overrides, or synthetic essential lipids. We screen every batch in micro-clinical assays to ensure optimal dermal biocompatibility."
  },
  {
    id: 'faq-4',
    question: "What is your ethical sourcing and organic verification philosophy?",
    answer: "We source our silts, clays, and high-altitude swiss mountain flora through fair-trade co-operatives that practice wildcrafted harvesting, ensuring zero land erosion and 100% trace-to-seed transparency."
  }
];
