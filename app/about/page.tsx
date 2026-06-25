import { motion } from "motion/react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Mail, MapPin, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] text-[#4a4a4a] uppercase mb-4">
              OUR STORY
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#222222] mb-6 tracking-wide">
              Quiet Luxury, Pure Science
            </h1>
            <p className="text-sm md:text-base text-[#4a4a4a] leading-relaxed mb-6">
              Secrum is a botanical apothecary founded in 2021 with one mission: to distill the most bio-active nutrients
              from glacier-grown alpine flora and fjord-drawn marine silts, sealed in photoprotective twilight violet glass.
            </p>
            <p className="text-sm text-[#4a4a4a] leading-relaxed">
              We reject the noise of fast beauty. Instead, we practice serene, clinical precision—sourcing, testing, and
              formulating with the rigor of a laboratory and the reverence of an apothecary.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600"
              alt="Apothecary workspace"
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#e8e2d9]/15 py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#222222]">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Botanical Intelligence",
                description:
                  "Each formula is engineered with the precision of a laboratory and the reverence of a classical apothecary. We source from fair-trade cooperatives practicing wildcrafted harvesting.",
              },
              {
                title: "Transparency",
                description:
                  "100% trace-to-seed transparency. Every ingredient is documented, tested, and verified. We believe in the right to know exactly what touches your skin.",
              },
              {
                title: "Minimalism",
                description:
                  "We formulate with only what is necessary. No synthetic fillers, artificial fragrances, or superficial marketing. Just active, effective botanical wisdom.",
              },
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <h3 className="font-serif text-xl text-[#222222] mb-4">{value.title}</h3>
                <p className="text-sm text-[#4a4a4a] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="text-center mb-16">
          <p className="font-mono text-[9px] tracking-[0.25em] text-[#4a4a4a] uppercase mb-4">METHODOLOGY</p>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#222222]">Our Formulation Process</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              number: "01",
              title: "Source",
              description: "Partner with fair-trade alpine flora cooperatives and fjord extraction specialists.",
            },
            {
              number: "02",
              title: "Extract",
              description: "Use low-temperature extraction methods to preserve botanical compounds and cellular integrity.",
            },
            {
              number: "03",
              title: "Test",
              description: "Conduct micro-clinical assays for dermal biocompatibility and potency verification.",
            },
            {
              number: "04",
              title: "Seal",
              description: "Package in photoprotective twilight-violet glass to preserve light-sensitive nutrients.",
            },
          ].map((step, idx) => (
            <div key={idx} className="text-left">
              <p className="font-mono text-2xl font-bold text-[#e8e2d9] mb-2">{step.number}</p>
              <h3 className="font-semibold text-[#222222] mb-2">{step.title}</h3>
              <p className="text-xs text-[#4a4a4a] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#222222] text-[#f5f5f0] py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-4 opacity-80">CONTACT ATELIER</p>
              <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">Email</p>
                    <a href="mailto:hello@secrum.com" className="hover:opacity-80 transition-opacity">
                      hello@secrum.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">Address</p>
                    <p>72 Rue de l'Apotheke</p>
                    <p>Geneva, CH-1201</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">Hours</p>
                    <p>Monday – Friday: 10am – 6pm CET</p>
                    <p>Saturday: 11am – 5pm CET</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-4 opacity-80">CONTACT FORM</p>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-[#f5f5f0] py-2 px-0 focus:outline-none placeholder-[#f5f5f0]/40 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">Email</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-transparent border-b border-[#f5f5f0] py-2 px-0 focus:outline-none placeholder-[#f5f5f0]/40 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">Subject</label>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full bg-transparent border-b border-[#f5f5f0] py-2 px-0 focus:outline-none placeholder-[#f5f5f0]/40 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">Message</label>
                  <textarea
                    placeholder="Your message"
                    rows={4}
                    className="w-full bg-transparent border-b border-[#f5f5f0] py-2 px-0 focus:outline-none placeholder-[#f5f5f0]/40 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3 bg-[#f5f5f0] text-[#222222] rounded-sm text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[#e8e2d9] transition-all duration-300 cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#222222] mb-6">
            Ready to Begin Your Ritual?
          </h2>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] px-8 py-3 rounded-sm text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
