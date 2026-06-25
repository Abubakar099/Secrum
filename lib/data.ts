import type { Product, Testimonial, FAQItem } from "./types"

export const PRODUCTS: Product[] = [
  {
    id: "secrum-01",
    number: "N° 01",
    name: "Luminous Complexion Concentrate",
    tagline: "Hydrating Botanical Hyaluronic Complex",
    price: 84,
    category: "serums",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
    description:
      "An advanced humectant treatment distilled from mountain-grown rose petals, paired with triple-weight hyaluronic acid. Penetrates deeply to fortify the cellular lipid barrier, restoring bouncy resilience and a translucent, dewy glow.",
    ingredients: [
      "Pure Rose Damascena Distillate",
      "Sodium Hyaluronate (Multi-molecular weight)",
      "Organic Aloe Barbadensis Leaf Juice",
      "Centella Asiatica (Gotu Kola) Extract",
      "Vegetable Glycerin",
      "Provitamin B5 (Panthenol)",
    ],
    usage:
      "After cleansing and toning, press 3 to 4 drops gently into the damp face, neck, and décolletage. Follow with oils or moisture melts.",
    volume: "30 ml / 1.0 fl. oz",
    rating: 4.8,
    reviewsCount: 42,
    featured: true,
    skinConcerns: ["Hydration", "Glow Skin", "Brightening"],
  },
  {
    id: "secrum-02",
    number: "N° 02",
    name: "Ceramide Barrier Recovery",
    tagline: "Rich Moisture-Lock Barrier Cream",
    price: 72,
    category: "moisturizers",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
    description:
      "A botanical lipid matrix that mirrors the skin's natural sebum. Combining ultra-lightweight sugarcane squalane with purifying alpine eucalyptus oil, it calms redness, purges environmental residue, and refines uneven textures.",
    ingredients: [
      "Sugarcane Squalane (99% pure)",
      "Cold-Pressed Simmondsia Chinensis (Jojoba) Oil",
      "Eucalyptus Globulus Leaf Oil",
      "Rosa Canina (Rosehip) Seed Oil",
      "Tocopherol (Vit E)",
      "Organic Rosemary Leaf Extract",
    ],
    usage:
      "Warm 2 drops in your palms and press firmly onto the skin as the final step of your evening ritual.",
    volume: "50 ml / 1.7 oz",
    rating: 4.9,
    reviewsCount: 108,
    featured: true,
    skinConcerns: ["Hydration", "Sensitive Skin", "Anti-Aging"],
  },
  {
    id: "secrum-03",
    number: "N° 03",
    name: "Squalane & Rose Gold Infusion",
    tagline: "Active Lipid Recharging Infusion",
    price: 95,
    category: "moisturizers",
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800",
    description:
      "Our award-winning whipped luxury butter. Marula and Kalahari Melon Seed lipids form a highly protective humectant mask that seals-in active nutrients during skin peak repair hours, smoothing fine lines by morning.",
    ingredients: [
      "Cold-Pressed Sclerocarya Birrea (Marula) Seed Oil",
      "Wild-Harvested Kalahari Melon Seed Lipids",
      "Organic Butyrospermum Parkii (Shea) Butter",
      "Ceramide NP",
      "Pomegranate Seed Concentrate",
      "Jasmine Officinale Flower Absolute",
    ],
    usage:
      "After serums, melt a pea-sized amount between your fingertips and massage in a slow upward motion.",
    volume: "30 ml / 1.0 fl. oz",
    rating: 4.9,
    reviewsCount: 215,
    featured: true,
    skinConcerns: ["Glow Skin", "Anti-Aging", "Dark Spots / Pigmentation"],
  },
  {
    id: "secrum-04",
    number: "N° 04",
    name: "Gentle Molecular Cleansing Milk",
    tagline: "Soothing Botanical pH-Balanced Cleanser",
    price: 48,
    category: "cleansers",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
    description:
      "Sourced from glaciated Canadian fjords, this nutrient-dense marine silt pulls impurities while infusing over 60 rare minerals. Enriched with fine premium Matcha for powerful antioxidant protection and thermal skin cooling.",
    ingredients: [
      "Glacial Marine Clay/Silt",
      "Organic Camellia Sinensis (Matcha Green Tea) Powder",
      "Colloidal Oatmeal",
      "Kombu Seaweed Extract",
      "Allantoin",
      "Santalum Album (Sandalwood) Oil",
    ],
    usage:
      "Apply an even layer to clean skin. Relax for 10 minutes as it lightly sets. Rinse gently with warm water, using small circular motions.",
    volume: "150 ml / 5.1 fl. oz",
    rating: 4.7,
    reviewsCount: 56,
    featured: true,
    skinConcerns: ["Sensitive Skin", "Hydration", "Acne Care"],
  },
  {
    id: "secrum-05",
    number: "N° 05",
    name: "Resurfacing Retinoid Overnight",
    tagline: "Active Treatment Formulated with Licorice Root",
    price: 98,
    category: "serums",
    image:
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800",
    description:
      "A silky hyper-targeted serum with 10% pure Niacinamide to dramatically reverse sun damage, age spots, and acne scarring. Licorice root and natural bearberry extract work synergetically to dissolve hyperpigmentation.",
    ingredients: [
      "Niacinamide (Vitamin B3 10%)",
      "Glycyrrhiza Glabra (Licorice) Root Extract",
      "Arctostaphylos Uva-Ursi (Bearberry) Extract",
      "Siberian Ginseng Root Oil",
      "Phytophid Cellular Water",
      "White Tea Leaf Extract",
    ],
    usage:
      "Apply 2-3 drops morning and evening before creams. Layer with sun protection in the morning.",
    volume: "30 ml / 1.0 fl. oz",
    rating: 4.6,
    reviewsCount: 12,
    featured: false,
    skinConcerns: ["Anti-Aging", "Dark Spots / Pigmentation", "Acne Care"],
  },
  {
    id: "secrum-06",
    number: "N° 06",
    name: "Detoxifying Mineral Mud Mask",
    tagline: "Skin-Refining Tonic Distilled from High Swiss Flora",
    price: 58,
    category: "exfoliants",
    image:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=800",
    description:
      "An astringent mineral mist crafted with fresh glacial runoff, steam-distilled Swiss alpine herbs, and prebiotics. Harmonizes the skin pH immediately, balances the biome, and tightens pores.",
    ingredients: [
      "Glacial Water Carrier",
      "Alpine Willowherb (Epilobium Fleischeri) Extract",
      "Inulin Prebiotics",
      "Siberian Fir Oil",
      "Calendula Officinalis Distillate",
      "Salicylic Acid (0.5% Willow Bark)",
    ],
    usage:
      "Mist generously over dry skin after cleansing, or mist throughout the day to recharge skin vitality.",
    volume: "100 ml / 3.4 oz",
    rating: 4.8,
    reviewsCount: 38,
    featured: false,
    skinConcerns: ["Acne Care", "Brightening", "Glow Skin"],
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "Secrum has transformed my approach to self-care. The textures feel completely bespoke, mimicking a high-end botanical sanctuary. No unnecessary fillers—just active, serene, glass-bottle beauty.",
    author: "Elena Rostov",
    role: "Editorial Director, L'Élément",
    rating: 5,
  },
  {
    id: "test-2",
    quote:
      "The Rose Quartz Elixir coupled with the Balancing Oil is absolute morning magic. My chronic eczema has calmed down, and the radiant plumpness of my face is noticeable. The minimalism isn't just visual; the formulation is wonderfully clean.",
    author: "Julian Chen",
    role: "Architectural Designer, Studio Chen",
    rating: 5,
  },
  {
    id: "test-3",
    quote:
      "The Glacial Marine Mud smells deeply of natural ceremonial tea leaves and grounding sandalwood. It's an ethereal scent that transports me away from high urban stress. Truly therapeutic apothecary work.",
    author: "Sophia Sterling",
    role: "Fine Art Curator, MOMA",
    rating: 5,
  },
]

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question:
      "How do the active botanicals remain shelf-stable without toxic preservatives?",
    answer:
      "We employ dynamic self-preserving natural hurdle systems, incorporating silver citrate, lactobacillus ferment, organic anise root extract, and airless twilight-violet glass vessels that shield light-sensitive nutrients.",
  },
  {
    id: "faq-2",
    question:
      "Do you offer international shipping for your boutique apothecary bottles?",
    answer:
      "Yes, we ship worldwide with carbon-neutral parcel carriers. All items are packed in custom organic wood shavings and hand-pressed cotton linen satchels to prevent glass damage.",
  },
  {
    id: "faq-3",
    question:
      "Are Secrum products safe for highly sensitive or hyper-reactive skin types?",
    answer:
      "Absolutely. We strictly formulate without artificial fragrances, parabens, sulfates, essential oil overrides, or synthetic essential lipids. We screen every batch in micro-clinical assays to ensure optimal dermal biocompatibility.",
  },
  {
    id: "faq-4",
    question: "What is your ethical sourcing and organic verification philosophy?",
    answer:
      "We source our silts, clays, and high-altitude swiss mountain flora through fair-trade co-operatives that practice wildcrafted harvesting, ensuring zero land erosion and 100% trace-to-seed transparency.",
  },
]

export const NEW_ARRIVALS: Product[] = [
  {
    id: "new-1",
    number: "N° 07",
    name: "3 Liquid Blush Bundle.",
    tagline: "Multi-use velvet emulsion tints for cheeks and lips",
    price: 30,
    category: "elixirs",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
    description:
      "An exclusive value set containing three fluid velvet blush formulas designed for perfect cheek warmth and lip flush integration. Contains organic squalane and rose extracts.",
    ingredients: ["Sugarcane Squalane", "Damask Rose extract", "Natural Earth pigments"],
    usage: "Dab 1-2 drops onto warmth points of cheeks and blend outwards with fingers.",
    volume: "3 x 15 ml",
    rating: 4.8,
    reviewsCount: 24,
    skinConcerns: ["Glow Skin", "Hydration"],
  },
  {
    id: "new-2",
    number: "N° 08",
    name: "texture signature bag",
    tagline: "Minimalist carry bag for serene storage",
    price: 2,
    category: "essences",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
    description:
      "A custom, beautifully woven thick canvas gift pouch with a matching black grograin tie closure, optimized to stash your daily botanical formulas in complete darkness.",
    ingredients: ["100% Organic Canvas Cotton", "Eco-safe black dye ribbon"],
    usage: "Tether with a single manual loop to shield sensitive light-absorbing elixirs.",
    volume: "Oversized",
    rating: 4.7,
    reviewsCount: 15,
    skinConcerns: ["Sensitive Skin"],
  },
  {
    id: "new-3",
    number: "N° 09",
    name: "Bundle of Texture Corrector BB CREAM",
    tagline: "Skin-refining pigment shield duo",
    price: 38,
    category: "moisturizers",
    image:
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
    description:
      "A special two-pack bundle of our mineral BB creams. Blurs pores and corrects redness while providing deep non-comedogenic moisture and UV reflection.",
    ingredients: ["Cellular Water", "Zinc Oxide", "Titanium Dioxide", "Hyaluronic Acid"],
    usage: "Massage a dry pea-sized drop onto skin after serum, smoothing until fully fused.",
    volume: "2 x 30 ml",
    rating: 4.9,
    reviewsCount: 31,
    skinConcerns: ["Acne Care", "Dark Spots / Pigmentation", "Sensitive Skin"],
  },
  {
    id: "new-4",
    number: "N° 10",
    name: "texture gloss.",
    tagline: "High-shine organic lipid glaze",
    price: 15,
    category: "oils",
    image:
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=600",
    description:
      "A pristine lip-nourishing lipid glide carrying concentrated cold-pressed rose hip seed oil and triple plant esters. Delivers rich reflective glow without being sticky.",
    ingredients: ["Rosehip Seed Oil", "Organic Castor Esters", "Vitamin E complex"],
    usage: "Glide over naked lips or layer over velvet tints for instant glass volume.",
    volume: "10 ml",
    rating: 4.6,
    reviewsCount: 19,
    skinConcerns: ["Hydration", "Glow Skin"],
  },
]

export const BEST_DEALS: Product[] = [
  {
    id: "deal-1",
    number: "N° 11",
    name: "Radiant Hydration Duo",
    tagline: "Concentrated serum & restorative moisture kit",
    price: 48,
    category: "serums",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600",
    description:
      "A curated limited bundle featuring our active Botanical Saturated Elixir and recovery cream. Targets dry, depleted skin barriers for instant deep plumpness.",
    ingredients: ["Phytophil complexes", "Rose extract", "Shea tree lipid"],
    usage: "Pat 2 drops of serum, wait thirty seconds, and seal with a generous layer of recovery cream.",
    volume: "2-Piece Set",
    rating: 4.9,
    reviewsCount: 42,
    skinConcerns: ["Hydration", "Sensitive Skin"],
  },
  {
    id: "deal-2",
    number: "N° 12",
    name: "Squalane Glow Concentrate",
    tagline: "Sealed cellular lipid for high-shine look",
    price: 29,
    category: "oils",
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
    description:
      "An advanced lipid-replenisher that locks water in the dermis, giving an instant luminous glassy glow without leaving any surface heaviness.",
    ingredients: ["Sugarcane Squalane", "Silver Citrate"],
    usage: "Add 2 drops to moist palms and massage onto face in circular motions.",
    volume: "30 ml / 1.0 fl. oz",
    rating: 4.8,
    reviewsCount: 18,
    skinConcerns: ["Glow Skin", "Hydration"],
  },
  {
    id: "deal-3",
    number: "N° 13",
    name: "Glacial Clay Purifying Set",
    tagline: "Deep silt mask and soothing pore mist",
    price: 39,
    category: "essences",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
    description:
      "A ceremonial dual set engineered to deeply refine skin texture, remove urban pollution metals, and lock in prebiotic hydration.",
    ingredients: ["Swiss Glacial Silt", "Charcoal", "Inulin prebiotics"],
    usage: "Apply Clay for 10 minutes, rinse, and spray Alpine Tonic generously.",
    volume: "Set",
    rating: 4.7,
    reviewsCount: 22,
    skinConcerns: ["Acne Care", "Sensitive Skin"],
  },
  {
    id: "deal-4",
    number: "N° 14",
    name: "Alpine Botanical Recovery Mist",
    tagline: "Instant therapeutic skin-barrier reload",
    price: 19,
    category: "essences",
    image:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600",
    description:
      "A micro-dispersal mist of Alpine willowherb, prebiotics, and floral distillate. Instant cooling, anti-inflammatory relief for irritated or sunburned skin.",
    ingredients: ["Glacial Runoff Water", "Prebiotics", "Alpine Willowherb"],
    usage: "Mist face from 20cm away whenever redness or dryness occurs.",
    volume: "50 ml",
    rating: 4.8,
    reviewsCount: 14,
    skinConcerns: ["Sensitive Skin", "Hydration"],
  },
]
