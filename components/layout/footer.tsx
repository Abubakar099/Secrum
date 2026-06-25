"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { useShopStore } from "@/store/shop-store"

export function Footer() {
  const router = useRouter()
  const setCategories = useShopStore((s) => s.setCategories)

  const goToCategory = (category: string) => {
    setCategories([category])
    router.push("/shop")
  }

  const collections = [
    { label: "N° 01 & N° 04 Elixirs", category: "serums" },
    { label: "N° 02 & N° 05 Lipids", category: "moisturizers" },
    { label: "N° 03 Glacial Silt Clays", category: "exfoliants" },
    { label: "N° 06 Alpine Bio-Tonics", category: "cleansers" },
  ]

  const journal = [
    "Atmospheric Silence Sourcing",
    "ECOCERT Certifications Matrix",
    "Triple Hyaluronic Memorandum",
    "Studio Inquiries & FAQ",
  ]

  return (
    <footer className="border-t border-[#e8e2d9] bg-[#f5f5f0] mt-16 md:mt-28 pt-12 md:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-xs mb-10 pb-10 border-b border-[#e8e2d9]">
          <div className="space-y-4">
            <span className="font-serif text-xl font-normal tracking-[0.15em] uppercase text-[#222222]">
              SECRUM
            </span>
            <p className="text-[#4a4a4a] font-light leading-relaxed">
              Quiet luxury apothecary formulating bio-intelligent skincare with glacial Swiss flora
              and oceanic silts. Rejecting fast chemical noise since 2021.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-3.5 pt-1.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full border border-[#222222]/10 hover:border-[#222222] text-[#4a4a4a] hover:text-[#222222] flex items-center justify-center transition-colors duration-300"
                title="Facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full border border-[#222222]/10 hover:border-[#222222] text-[#4a4a4a] hover:text-[#222222] flex items-center justify-center transition-colors duration-300"
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full border border-[#222222]/10 hover:border-[#222222] text-[#4a4a4a] hover:text-[#222222] flex items-center justify-center transition-colors duration-300 font-sans font-bold text-[10px]"
                title="TikTok"
                aria-label="TikTok"
              >
                <span>TT</span>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full border border-[#222222]/10 hover:border-[#222222] text-[#4a4a4a] hover:text-[#222222] flex items-center justify-center transition-colors duration-300 font-sans font-bold text-[10px]"
                title="Pinterest"
                aria-label="Pinterest"
              >
                <span>PIN</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full border border-[#222222]/10 hover:border-[#222222] text-[#4a4a4a] hover:text-[#222222] flex items-center justify-center transition-colors duration-300"
                title="YouTube"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-sans font-bold tracking-widest text-[#222222] uppercase block">
              THE COLLECTIONS
            </span>
            <ul className="space-y-1.5 font-light text-[#4a4a4a]">
              {collections.map((c) => (
                <li key={c.label}>
                  <button onClick={() => goToCategory(c.category)} className="hover:text-black cursor-pointer">
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-sans font-bold tracking-widest text-[#222222] uppercase block">
              JOURNAL & PHILOSOPHY
            </span>
            <ul className="space-y-1.5 font-light text-[#4a4a4a]">
              {journal.map((label) => (
                <li key={label}>
                  <Link href="/about" className="hover:text-black cursor-pointer">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-sans font-bold tracking-widest text-[#222222] uppercase block">
              CORRESPONDENCE NEWSLETTER
            </span>
            <p className="text-[#4a4a4a] font-light leading-relaxed mb-2">
              Subscribe to take part in custom limited batch alerts.
            </p>
            <div className="flex border-b border-[#222222] pb-1">
              <input
                type="email"
                placeholder="Insert secure email..."
                aria-label="Newsletter email"
                className="bg-transparent border-none text-xs text-[#222222] w-full placeholder-[#4a4a4a]/40 focus:outline-none"
              />
              <button className="text-[#222222] font-semibold tracking-widest hover:text-[#4a4a4a] cursor-pointer">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Legal copyrights section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#4a4a4a] font-light space-y-3 sm:space-y-0">
          <p>© 2026 SECRUM Apothecary, Geneva. All rights, formulations, and designs reserved.</p>
          <div className="flex space-x-4">
            <span className="hover:text-black cursor-pointer">Privacy Matrix</span>
            <span>·</span>
            <span className="hover:text-black cursor-pointer">Epidermal Disclaimers</span>
            <span>·</span>
            <span className="hover:text-black cursor-pointer">Secure Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
