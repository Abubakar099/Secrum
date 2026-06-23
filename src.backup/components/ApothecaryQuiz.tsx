import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Star, Sparkles, RefreshCw, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ApothecaryQuizProps {
  onAddToCart: (product: Product, quantity: number, customPrice?: number) => void;
  onViewDetails: (product: Product) => void;
}

interface Question {
  id: number;
  text: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    desc: string;
    value: string; // ties to categories or products
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Describe your current skin mood.",
    subtitle: "What is your complexion communicating to you?",
    options: [
      { id: '1a', label: 'DEHYDRATED & THIRSTY', desc: 'Tight, showing fine dehydration lines, seeking glass-like bounce.', value: 'elixirs' },
      { id: '1b', label: 'REACTIVE & CONGESTED', desc: 'Calming down redness, seeking sebum-clearing structural balance.', value: 'oils' },
      { id: '1c', label: 'TENSIONED & CHRONIC', desc: 'Seeking deep organic detoxification, mineral renewal, or lipid seals.', value: 'clays' }
    ]
  },
  {
    id: 2,
    text: "What is your ambient environment?",
    subtitle: "Nature influences your epidermal moisture exchange.",
    options: [
      { id: '2a', label: 'URBAN CITY SPACES', desc: 'Heavy blue light, heating/cooling, high pollution, seeking protective barriers.', value: 'secrum-04' },
      { id: '2b', label: 'TEMPERATE / PURE OUTDOORS', desc: 'Balanced humidity but looking for deep high-altitude floral vitality.', value: 'secrum-06' },
      { id: '2c', label: 'ARID / EXTREME COLD', desc: 'High wind chill or low indoor air moisture desiring concentrated lipid melts.', value: 'secrum-01' }
    ]
  },
  {
    id: 3,
    text: "Identify your ideal texture indulgence.",
    subtitle: "The tactile weight must bring sensory pleasure.",
    options: [
      { id: '3a', label: 'SILKY OR WATER DEW', desc: 'Absorbs instantly. Weightless fluid hydration dripping with actives.', value: 'elixirs' },
      { id: '3b', label: 'TACTILE ORGANIC BUTTER/CLAY', desc: 'Rich, grounding, slow, or luxurious leave-on nourishment.', value: 'clays' },
      { id: '3c', label: 'CONCENTRATED botanical lipid oil', desc: 'Provides active botanical insulation and healthy natural gloss.', value: 'oils' }
    ]
  }
];

export default function ApothecaryQuiz({ onAddToCart, onViewDetails }: ApothecaryQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);
  const [matchingReason, setMatchingReason] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const handleSelectOption = (questionId: number, value: string) => {
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 350);
    } else {
      // Calculate output matches
      calculateDiagnosis(updatedAnswers);
    }
  };

  const calculateDiagnosis = (finalAnswers: Record<number, string>) => {
    const categoryPreference = finalAnswers[1] || 'elixirs'; // elixirs, oils, clays
    const environmentalNeed = finalAnswers[2] || ''; // product ID
    const texturePreference = finalAnswers[3] || 'elixirs'; // elixirs, clays, oils

    let recommended: Product;

    // Search matches from our PRODUCTS list
    // First, try matching environmental specific needs directly
    const directMatch = PRODUCTS.find(p => p.id === environmentalNeed);
    if (directMatch) {
      recommended = directMatch;
    } else {
      // Else, match category preference
      const list = PRODUCTS.filter(p => p.category === categoryPreference || p.category === texturePreference);
      if (list.length > 0) {
        recommended = list[Math.floor(Math.random() * list.length)];
      } else {
        recommended = PRODUCTS[0]; // fallback to Rose Elixir
      }
    }

    // Set custom text matching reasons
    let reason = '';
    if (recommended.id === 'secrum-01') {
      reason = "Your skin craves hydration with lightweight humectants. The Rose Quartz Elixir will infuse multi-weight hyaluronic acid to restore cellular bounce instantly.";
    } else if (recommended.id === 'secrum-02') {
      reason = "Due to environmental stress and congestion, sugarcane squalane is optimal. Our Botanical Balancing Oil will harmonize sebum production without heavy pore residue.";
    } else if (recommended.id === 'secrum-03') {
      reason = "A deep glacial silt is matched. The Sea Silt Restorative Mud drains toxins from urban congestion and infuses over sixty high-potency marine minerals.";
    } else if (recommended.id === 'secrum-04') {
      reason = "You seek targeted repair from spots or light stress. Brightening Niacinamide Dew utilizes 10% pure Vitamin B3 to erase hyperpigmentation and reveal translucent glow.";
    } else if (recommended.id === 'secrum-05') {
      reason = "Your arid environmental response requires lipid insulation. The Marula Moisture Melt Whipped Butter locks in deep cellular repair while you undergo slow sleep.";
    } else {
      reason = "To balance your complexion's pH biome, this High Swiss botanical tonic regulates pores and injects active mineral prebiotics immediately.";
    }

    setMatchedProduct(recommended);
    setMatchingReason(reason);
    setCurrentStep(QUIZ_QUESTIONS.length); // step into completion index
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setMatchedProduct(null);
    setMatchingReason('');
    setIsAdded(false);
  };

  const handleAddDiscountedToCart = () => {
    if (!matchedProduct) return;
    const discountedPrice = Math.round(matchedProduct.price * 0.9); // 10% off
    onAddToCart(matchedProduct, 1, discountedPrice);
    setIsAdded(true);
  };

  return (
    <div className="bg-[#e8e2d9]/45 border border-[#e8e2d9]/80 rounded-[8px] p-6 md:p-10 text-left">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-2.5 mb-2.5">
          <HelpCircle className="w-5 h-5 text-[#222222]" />
          <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-[#4a4a4a] uppercase">
            SKIN DIAGNOSTIC ATELIER
          </span>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#222222] tracking-wide mb-2">
          Discover Your Perfect Biome Match
        </h3>
        <p className="text-xs text-[#4a4a4a] font-light leading-relaxed mb-8 max-w-xl">
          Skincare is highly bespoke. Respond to these three luxury criteria, and our botanical lab will isolate the supreme formula for your immediate daily routine.
        </p>

        <AnimatePresence mode="wait">
          {currentStep < QUIZ_QUESTIONS.length ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Question text */}
              <div>
                <span className="font-mono text-[10.5px] tracking-widest text-[#4a4a4a]">
                  CRUSH POINT 0{QUIZ_QUESTIONS[currentStep].id} OF 03
                </span>
                <h4 className="font-serif text-xl font-normal text-[#222222] mt-1.5">
                  {QUIZ_QUESTIONS[currentStep].text}
                </h4>
                <p className="text-[11.5px] italic text-[#4a4a4a] mt-0.5">
                  {QUIZ_QUESTIONS[currentStep].subtitle}
                </p>
              </div>

              {/* Options list */}
              <div className="space-y-3.5">
                {QUIZ_QUESTIONS[currentStep].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep].id, opt.value)}
                    className="w-full p-4 text-left border border-[#e8e2d9] rounded-[4px] bg-[#f5f5f0]/80 hover:bg-[#222222] hover:text-[#f5f5f0] group transition-all duration-300 flex items-start justify-between cursor-pointer"
                  >
                    <div className="pr-4">
                      <span className="block font-sans text-[10px] font-bold tracking-widest uppercase mb-1">
                        {opt.label}
                      </span>
                      <span className="block text-[11.5px] font-light text-[#4a4a4a] group-hover:text-[#f5f5f0]/80 leading-relaxed">
                        {opt.desc}
                      </span>
                    </div>
                    <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity text-[#f5f5f0] mt-1">
                      SELECT →
                    </span>
                  </button>
                ))}
              </div>

              {/* Progression Indicator dot */}
              <div className="flex space-x-1 items-center pt-2">
                {[...Array(QUIZ_QUESTIONS.length)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentStep ? 'w-6 bg-[#222222]' : 'w-1.5 bg-[#e8e2d9]'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            matchedProduct && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#f5f5f0] border border-[#e8e2d9] rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8"
              >
                {/* Product image match */}
                <div className="w-full md:w-1/3 aspect-[4/5] bg-[#e8e2d9]/25 rounded-[4px] overflow-hidden flex-shrink-0 relative">
                  <img
                    src={matchedProduct.image}
                    alt={matchedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#222222]/90 text-[#f5f5f0] text-[8px] font-sans font-bold tracking-[0.2em] py-0.5 px-2 rounded-xs">
                    MATCHED ATELIER
                  </div>
                </div>

                {/* Match descriptions */}
                <div className="flex-grow text-left space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#4a4a4a] tracking-widest uppercase">
                      DIAGNOSIS MATCH: {matchedProduct.number}
                    </span>
                    <h4 className="font-serif text-2xl font-normal text-[#222222] mt-0.5">
                      {matchedProduct.name}
                    </h4>
                    <p className="font-sans text-xs italic text-[#4a4a4a]">
                      {matchedProduct.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-[#4a4a4a] font-light leading-relaxed">
                    {matchingReason} The active micro-nutrients are uniquely suited to counteract your primary environmental factors.
                  </p>

                  <div className="flex items-center space-x-2.5 text-xs text-[#222222]">
                    <div className="flex items-center">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-semibold ml-1">{matchedProduct.rating}</span>
                    </div>
                    <span>·</span>
                    <span className="font-mono">{matchedProduct.volume}</span>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-3">
                    <button
                      onClick={handleAddDiscountedToCart}
                      disabled={isAdded}
                      className={`py-3.5 px-6 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-800 text-[#f5f5f0] border border-emerald-800'
                          : 'bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>ADDED WITH -10% DISCOUNT</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>CLAIM MATCHED REGIMEN (-10%) · ${Math.round(matchedProduct.price * 0.9)}.00</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onViewDetails(matchedProduct)}
                      className="py-3 px-5 border border-[#222222] hover:bg-[#222222]/5 text-[#222222] rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer"
                    >
                      READ MATRIX
                    </button>

                    <button
                      onClick={handleReset}
                      className="text-xs text-[#4a4a4a] hover:text-[#222222] underline py-2 flex items-center justify-center space-x-1.5 cursor-pointer"
                      title="Retake diagnosis"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>RETAKE</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
