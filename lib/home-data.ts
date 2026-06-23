import type { Product } from "./types"

export interface PromoProduct extends Product {
  originalPrice?: string
  salePrice: string
  hasDiscount: boolean
}

export interface ConcernCard {
  name: string
  image: string
  tag: string
}

export const NEW_ARRIVALS: PromoProduct[] = [
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
    skinConcerns: ["Glow & Radiance", "Hydration"],
    originalPrice: "Rs.3,597.00 PKR",
    salePrice: "Rs.2,999.00 PKR",
    hasDiscount: true,
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
    salePrice: "Rs.199.00 PKR",
    hasDiscount: false,
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
    skinConcerns: ["Acne & Blemishes", "Dark Spots & Pigmentation", "Sensitive Skin"],
    originalPrice: "Rs.4,598.00  PKR",
    salePrice: "Rs.3,798.00 PKR",
    hasDiscount: true,
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
    skinConcerns: ["Hydration", "Glow & Radiance"],
    originalPrice: "Rs.2,200.00 PKR",
    salePrice: "Rs.1,499.00 PKR",
    hasDiscount: true,
  },
]

export const BEST_DEALS: PromoProduct[] = [
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
    usage:
      "Pat 2 drops of serum, wait thirty seconds, and seal with a generous layer of recovery cream.",
    volume: "2-Piece Set",
    rating: 4.9,
    reviewsCount: 42,
    skinConcerns: ["Hydration", "Sensitive Skin"],
    originalPrice: "Rs.6,500.00 PKR",
    salePrice: "Rs.4,800.00 PKR",
    hasDiscount: true,
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
    skinConcerns: ["Glow & Radiance", "Hydration"],
    originalPrice: "Rs.3,800.00 PKR",
    salePrice: "Rs.2,900.00 PKR",
    hasDiscount: true,
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
    skinConcerns: ["Acne & Blemishes", "Sensitive Skin"],
    originalPrice: "Rs.5,200.00 PKR",
    salePrice: "Rs.3,990.00 PKR",
    hasDiscount: true,
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
    originalPrice: "Rs.2,800.00 PKR",
    salePrice: "Rs.1,950.00 PKR",
    hasDiscount: true,
  },
]

export const COMMON_CONCERNS: ConcernCard[] = [
  {
    name: "Hydration",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    tag: "Hydration",
  },
  {
    name: "Anti-Aging",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    tag: "Anti-Aging",
  },
  {
    name: "Glow & Radiance",
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600",
    tag: "Glow",
  },
  {
    name: "Acne & Blemishes",
    image:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=600",
    tag: "Acne",
  },
  {
    name: "Dark Spots & Pigmentation",
    image:
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
    tag: "Dark Spots",
  },
  {
    name: "Sensitive Skin",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600",
    tag: "Sensitive Skin",
  },
]
