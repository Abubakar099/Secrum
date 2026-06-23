import { useState } from 'react';
import { X, Star, Heart, Check, HelpCircle, Wind, ShieldCheck, Milestone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantityToAdd: number) => void;
  saved?: boolean;
  onToggleSave?: (productId: string) => void;
}

type TabType = 'details' | 'ingredients' | 'ritual';

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  saved = false,
  onToggleSave
}: ProductDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [quantity, setQuantity] = useState(1);
  const [isCopied, setIsCopied] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
    setQuantity(1); // Reset
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/#shop/${product.id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle frosted dark backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#222222] z-50 backdrop-blur-sm"
          />

          {/* Centered Modal stage */}
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative w-full max-w-4xl bg-[#f5f5f0] rounded-[8px] overflow-hidden shadow-2xl flex flex-col md:flex-row text-left max-h-[90vh] md:max-h-none"
              id={`detail-modal-container-${product.id}`}
            >
              {/* Close Icon Trigger */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-[#f5f5f0]/80 backdrop-blur-xs hover:bg-[#222222] text-[#222222] hover:text-[#f5f5f0] rounded-full transition-all duration-300 cursor-pointer shadow-xs"
                aria-label="Close Product View"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Premium imagery and high-luxury values */}
              <div className="w-full md:w-1/2 bg-[#e8e2d9]/40 relative flex flex-col justify-between overflow-hidden">
                <div className="aspect-[4/5] w-full relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/30 to-transparent pointer-events-none" />
                  
                  {/* Botanical Quality Seal Stamp text */}
                  <div className="absolute bottom-5 left-5 text-[#f5f5f0]">
                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase opacity-90">S E C R U M   L A B S</p>
                    <p className="font-serif text-lg font-normal italic tracking-wide mt-0.5">Bio-Intelligent Skincare</p>
                  </div>
                </div>

                {/* Sourcing credentials below image */}
                <div className="p-6 bg-[#e8e2d9]/25 hidden md:grid grid-cols-3 gap-2.5 text-center">
                  <div className="flex flex-col items-center">
                    <Wind className="w-4 h-4 text-[#4a4a4a] mb-1.5 stroke-[1.2]" />
                    <span className="font-sans text-[8.5px] font-bold tracking-widest text-[#222222] uppercase">100% ORGANIC</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="w-4 h-4 text-[#4a4a4a] mb-1.5 stroke-[1.2]" />
                    <span className="font-sans text-[8.5px] font-bold tracking-widest text-[#222222] uppercase">HURDLE SAFE</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Milestone className="w-4 h-4 text-[#4a4a4a] mb-1.5 stroke-[1.2]" />
                    <span className="font-sans text-[8.5px] font-bold tracking-widest text-[#222222] uppercase">CRUELTY ZERO</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive specs and story tabs */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-[80vh]">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-serif text-[12px] font-medium tracking-[0.15em] text-[#4a4a4a] uppercase">
                    {product.number} · {product.volume}
                  </span>
                  
                  <div className="flex items-center space-x-1.5">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-[#222222] stroke-[#222222]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-sans text-[11px] text-[#4a4a4a]">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Main Product head */}
                <h2 className="font-serif text-2xl md:text-3xl font-normal tracking-wide text-[#222222] mb-1">
                  {product.name}
                </h2>
                <p className="font-serif text-[13px] font-light italic text-[#4a4a4a] mb-6">
                  {product.tagline}
                </p>

                {/* Tab layout navigator */}
                <div className="flex border-b border-[#e8e2d9] mb-5">
                  {(['details', 'ingredients', 'ritual'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="py-2.5 px-1 mr-6 text-[10.5px] font-sans font-semibold tracking-widest uppercase transition-colors relative cursor-pointer"
                    >
                      <span className={activeTab === tab ? 'text-[#222222]' : 'text-[#4a4a4a]/60 hover:text-[#222222]'}>
                        {tab === 'details' && 'EFFICACY'}
                        {tab === 'ingredients' && 'INGREDIENTS'}
                        {tab === 'ritual' && 'RITUAL GUIDELINE'}
                      </span>
                      {activeTab === tab && (
                        <motion.div
                          layoutId="modalTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#222222]"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content Box */}
                <div className="min-h-[140px] text-xs leading-relaxed font-light text-[#4a4a4a] mb-6">
                  {activeTab === 'details' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <p>{product.description}</p>
                      <ul className="space-y-2 pt-2.5">
                        <li className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                          <span>Dermatologically tested for hyper-reactive epidermal states</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                          <span>Provides intense barrier lock-in hydration for up to 18 hours</span>
                        </li>
                      </ul>
                    </motion.div>
                  )}

                  {activeTab === 'ingredients' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <p className="italic">
                        Our active botanical matrix focuses strictly on nutrient density.
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2.5">
                        {product.ingredients.map((ing, idx) => (
                          <div key={idx} className="flex items-start space-x-1 py-1 border-b border-[#e8e2d9]/40">
                            <span className="font-mono text-[9px] text-[#222222] mr-1.5">0{idx + 1}.</span>
                            <span className="font-sans text-[11px] text-[#4a4a4a]">{ing}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'ritual' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="bg-[#e8e2d9]/35 p-3.5 rounded-sm mb-3 font-serif italic">
                        "Your routine is your sanctuary. Approach with silent, unhurried appreciation."
                      </div>
                      <p>{product.usage}</p>
                    </motion.div>
                  )}
                </div>

                {/* Interaction Footer actions */}
                <div className="border-t border-[#e8e2d9] pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-sans font-semibold tracking-widest text-[#4a4a4a] uppercase">ATELIER COST</p>
                      <p className="font-sans text-xl font-semibold text-[#222222] mt-0.5">${product.price}.00</p>
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex items-center border border-[#e8e2d9] rounded-sm bg-[#e8e2d9]/25">
                      <button
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="px-3.5 py-1.5 text-xs text-[#222222] font-semibold hover:bg-[#e8e2d9]/20 transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-mono text-[#222222]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="px-3.5 py-1.5 text-xs text-[#222222] font-semibold hover:bg-[#e8e2d9]/20 transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-3 pt-2">
                    {/* Primary Purchase Button */}
                    <button
                      onClick={handleAddToCart}
                      className="col-span-4 py-4 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] text-xs font-semibold tracking-[0.2em] rounded-sm uppercase transition-all duration-300 cursor-pointer text-center flex items-center justify-center space-x-1.5"
                    >
                      <span>ADD {quantity} TO SELECTION BAG</span>
                      <span>·</span>
                      <span>${product.price * quantity}.00</span>
                    </button>

                    {/* Quick share button / Save */}
                    <button
                      onClick={handleShare}
                      className={`py-4 rounded-sm border border-[#222222] transition-all duration-300 flex items-center justify-center text-xs tracking-widest font-semibold cursor-pointer ${
                        isCopied
                          ? 'bg-[#e8e2d9] text-emerald-800 border-emerald-800'
                          : 'bg-transparent text-[#222222] hover:bg-[#e8e2d9]/40'
                      }`}
                      title="Copy private share link"
                    >
                      {isCopied ? 'COPIED' : 'SHARE'}
                    </button>
                  </div>

                  {/* Soft save and notification warning */}
                  {onToggleSave && (
                    <button
                      onClick={() => onToggleSave(product.id)}
                      className="flex items-center justify-center space-x-2 text-[10.5px] font-sans font-semibold tracking-wider text-[#4a4a4a] hover:text-[#222222] py-2 w-full border border-dashed border-[#e8e2d9] hover:border-[#4a4a4a] transition-all duration-300 rounded-xs cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${saved ? 'text-red-500 fill-current' : ''}`} />
                      <span>{saved ? 'REMOVE FROM SAVED SELECTIONS' : 'ADD TO SAVED APOTHECARY SELECTIONS'}</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
