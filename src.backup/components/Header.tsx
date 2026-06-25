import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: 'home' | 'shop' | 'about';
  setActiveTab: (tab: 'home' | 'shop' | 'about') => void;
  cartCount: number;
  onOpenCart: () => void;
  savedCount?: number;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  savedCount = 0
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll height to apply dynamic frosting backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' }
  ] as const;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-[#f5f5f0]/95 backdrop-blur-md border-[#e8e2d9] py-4 shadow-[0_10px_30px_rgba(74,74,74,0.03)]'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Brand Identity */}
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col items-start text-left focus:outline-none cursor-pointer group"
          >
            <span className="font-serif text-2xl md:text-3xl font-normal tracking-[0.16em] uppercase text-[#222222] transition-colors duration-300 group-hover:text-[#4a4a4a]">
              Secrum
            </span>
            <span className="text-[8px] font-sans font-semibold tracking-[0.3em] uppercase text-[#4a4a4a] mt-0.5 opacity-80">
              botanical apotheke
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative py-1 text-xs font-semibold tracking-[0.15em] text-[#4a4a4a] hover:text-[#222222] transition-colors duration-300 focus:outline-none cursor-pointer"
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#222222]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Utility Tools */}
          <div className="flex items-center space-x-5">
            {/* Soft Favorite Quick Status */}
            <div className="hidden sm:flex items-center text-xs tracking-widest text-[#4a4a4a]">
              <Heart className="w-3.5 h-3.5 text-[#4a4a4a] mr-1.5" />
              <span className="font-sans text-[11px] font-medium">{savedCount}</span>
            </div>

            {/* Shopping Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full border border-transparent hover:border-[#e8e2d9] bg-[#e8e2d9]/40 hover:bg-[#e8e2d9]/75 transition-all duration-300 cursor-pointer text-[#222222]"
              aria-label="Open cart"
              id="cart-trigger-btn"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#222222] text-[#f5f5f0] text-[9px] font-sans font-bold w-5 h-5 flex items-center justify-center rounded-full border border-[#f5f5f0] shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 md:hidden hover:bg-[#e8e2d9]/50 rounded-full transition-colors duration-300 cursor-pointer text-[#222222]"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Darkened subtle aesthetic backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#222222] z-50 backdrop-blur-xs"
            />

            {/* Dynamic Sliding Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[340px] bg-[#f5f5f0] z-50 px-8 py-10 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-12">
                  <div className="flex flex-col">
                    <span className="font-serif text-xl tracking-widest text-[#222222] uppercase">
                      Secrum
                    </span>
                    <span className="text-[7.5px] font-semibold tracking-widest text-[#4a4a4a] mt-0.5">
                      BOTANICAL APOTHEKE
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-[#e8e2d9]/50 rounded-full transition-colors duration-300 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-[#222222]" />
                  </button>
                </div>

                {/* Vertical menu navigation */}
                <div className="flex flex-col space-y-7">
                  {navItems.map((item, index) => (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className="text-left py-2 font-serif text-lg tracking-wider text-[#4a4a4a] hover:text-[#222222] border-b border-[#e8e2d9]/40 flex items-center justify-between group cursor-pointer"
                    >
                      <span className={activeTab === item.id ? 'text-[#222222] font-semibold' : ''}>
                        {item.id === 'home'
                          ? '01. Home'
                          : item.id === 'shop'
                          ? '02. Shop'
                          : '03. About'}
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-[#222222]" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Mobile Drawer Botanical Footer Accent */}
              <div className="text-left border-t border-[#e8e2d9] pt-6 opacity-80">
                <p className="text-[9px] font-sans font-semibold tracking-[0.2em] text-[#4a4a4a] uppercase">
                  Studio Atelier Hours
                </p>
                <p className="font-serif text-[13px] text-[#222222] mt-1 italic">
                  Mon – Sat, 10am – 6pm
                </p>
                <p className="text-[10px] font-light text-[#4a4a4a] mt-2">
                  72 Rue de l'Apotheke, Geneva
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
