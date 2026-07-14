import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Search,
  ArrowRight,
  MapPin,
  Building2,
  Factory,
  Warehouse,
  ChevronDown,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─────────── Page Hero ─────────── */
function PageHero() {
  return (
    <section
      className="relative w-full flex items-center justify-center"
      style={{ height: '50vh', minHeight: 350, backgroundColor: '#17171C' }}
    >
      <div className="text-center px-6 max-w-[900px]">
        <p className="mono-label mb-4" style={{ color: '#4A3E3D' }}>
          SINGAPORE INDUSTRIAL PROPERTY DIRECTORY
        </p>
        <h1 className="font-serif text-white font-semibold mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-1px' }}>
          All Singapore Industrial Properties
        </h1>
        <p className="font-sans text-lg mx-auto" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 700 }}>
          Comprehensive guide to industrial properties across Singapore. Browse B1 light industrial units, B2 heavy factories, warehouses, and business parks by tenure, district, and property type.
        </p>
        {/* Search Bar */}
        <div className="mt-8 relative max-w-[600px] mx-auto">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#9797A3' }} />
          <input
            type="text"
            placeholder="Search by district, property type, or keyword..."
            className="w-full h-14 pl-12 pr-4 rounded-xl font-sans text-base outline-none transition-all"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#4A3E3D' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
          />
        </div>
      </div>
    </section>
  )
}

/* ─────────── Filter Bar ─────────── */
function FilterBar() {
  const filters = [
    { label: 'Tenure', options: ['All', '30 Years', '60 Years', '99 Years', 'Freehold'] },
    { label: 'Property Type', options: ['All', 'B1 Industrial', 'B2 Factory', 'Warehouse', 'Terrace Factory', 'Ramp-Up Unit'] },
    { label: 'District', options: ['All', 'Tuas', 'Jurong', 'Woodlands', 'Changi', 'Paya Lebar', 'Kaki Bukit', 'Yishun', 'Tampines'] },
  ]

  return (
    <div className="sticky top-20 z-40 bg-white border-b" style={{ borderColor: '#DEDEE0' }}>
      <div className="max-w-[1128px] mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center gap-4">
          {filters.map((f) => (
            <div key={f.label} className="relative">
              <select
                className="appearance-none h-10 pl-4 pr-10 rounded-lg font-sans text-sm outline-none cursor-pointer transition-all"
                style={{ border: '1px solid #DEDEE0', color: '#28282A', backgroundColor: '#fff' }}
                defaultValue="All"
              >
                {f.options.map((o) => (
                  <option key={o} value={o}>{f.label}: {o}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9797A3' }} />
            </div>
          ))}
          <div className="ml-auto flex items-center gap-4">
            <span className="font-mono text-xs" style={{ color: '#9797A3' }}>Showing 10 properties</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────── 60 Years Tenure Section ─────────── */
function SixtyYearProperties() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.property-card-60', {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const properties = [
    { title: 'Northpoint Bizhub', type: 'B1 Ramp-Up Factory', tenure: '60 years from 13 July 2010', access: 'Up to 20-foot container ramp-up', location: 'Woodlands' },
    { title: 'Northspring Bizhub', type: 'B2 Clean & Light Ramp-Up', tenure: '60 years from 1 Feb 2011', access: 'Up to 40-foot container ramp-up', location: 'Woodlands' },
    { title: 'Northlink Building', type: 'B1 Ramp-Up Factory', tenure: '60 years from 9 Oct 1999', access: 'Up to 40-foot container loading bay', location: 'Woodlands' },
    { title: 'Aposh Bizhub', type: 'B1 Flatted Factory', tenure: '60 years from 26 Aug 2010', access: 'Up to 40-foot container loading bay', location: 'Central' },
    { title: '8@Admiralty', type: 'B1 Ramp-Up Factory', tenure: '60 years from 9 Oct 2000', access: 'Up to 40-foot container loading bay', location: 'Admiralty / Woodlands' },
    { title: 'Food Xchange @ Admiralty', type: 'Central Kitchen Ramp-Up', tenure: '60 years from 9 Oct 2000', access: 'Up to 40-foot container loading bay', location: 'Admiralty' },
    { title: 'Harvest @ Woodlands', type: 'B1 & B2 Ramp-Up Factory', tenure: '60 years from 5 Oct 2009', access: 'Up to 20-foot container ramp-up', location: 'Woodlands' },
    { title: 'Woodlands Bizhub', type: 'B2 Flatted & Terrace Factory', tenure: '60 years from 21 Oct 2008', access: 'Up to 20-foot container loading bay', location: 'Woodlands' },
  ]

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#F7F5E8' }} className="py-16">
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="mb-10">
          <p className="mono-label mb-2" style={{ color: '#4A3E3D' }}>60 YEARS TENURE</p>
          <h2 className="section-heading mb-3">Long-Tenure Industrial Properties</h2>
          <p className="font-sans text-base" style={{ color: '#28282A', maxWidth: 600 }}>
            Industrial properties with 60-year lease tenure offer a balance between affordability and long-term security. Ideal for owner-occupiers and mid-term investors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((p, i) => (
            <PropertyCard key={i} property={p} refClass="property-card-60" />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── 30 Years Tenure Section ─────────── */
function ThirtyYearProperties() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.property-card-30', {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const properties = [
    { title: 'Win5 @ Yishun', type: 'B1 Ramp-Up Factory', tenure: '30 years from 5 Dec 2012', access: 'Up to 40-foot container loading bay', location: 'Yishun' },
    { title: 'T99 @ Tampines', type: 'B2 Terrace & Ramp-Up', tenure: '30 years from 18 June 2013', access: 'Up to 40-foot container ramp-up', location: 'Tampines' },
    { title: 'Polaris @ Woodlands', type: 'B2 Heavy Industrial', tenure: '30 years from expected 2025', access: '40-foot container ramp-up every level', location: 'Woodlands', extra: 'Sizes: 1,600-100,000 sqft | Ceiling: Up to 6.0m' },
  ]

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#F7F5E8' }} className="py-16">
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="mb-10">
          <p className="mono-label mb-2" style={{ color: '#4A3E3D' }}>30 YEARS TENURE</p>
          <h2 className="section-heading mb-3">Modern Industrial Developments</h2>
          <p className="font-sans text-base" style={{ color: '#28282A', maxWidth: 600 }}>
            Newer industrial properties with 30-year tenure typically offer modern specifications, better facilities, and are designed to current BCA standards. Popular among SMEs and startups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((p, i) => (
            <PropertyCard key={i} property={p} refClass="property-card-30" />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Property Card Component ─────────── */
function PropertyCard({ property, refClass }: { property: any; refClass: string }) {
  return (
    <div
      className={`${refClass} bg-white rounded-xl p-6 transition-all duration-200 hover:-translate-y-1`}
      style={{ border: '1px solid #DEDEE0' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#4A3E3D' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#DEDEE0' }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-serif text-xl font-medium" style={{ color: '#17171C' }}>{property.title}</h3>
        <Link
          to="/launches"
          className="flex items-center gap-1 font-sans text-xs font-medium transition-colors hover:text-[#4A3E3D] flex-shrink-0 ml-4"
          style={{ color: '#9797A3' }}
        >
          Details <ArrowRight size={12} />
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {property.type.includes('B1') && (
          <span className="font-sans text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(120,176,181,0.15)', color: '#17171C' }}>
            B1
          </span>
        )}
        {property.type.includes('B2') && (
          <span className="font-sans text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(198,93,140,0.15)', color: '#17171C' }}>
            B2
          </span>
        )}
        <span className="font-sans text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(246,180,107,0.15)', color: '#17171C' }}>
          {property.tenure.includes('60') ? '60-Year' : '30-Year'}
        </span>
      </div>

      <table className="w-full">
        <tbody>
          <tr>
            <td className="font-sans text-xs py-1.5" style={{ color: '#9797A3', width: '30%' }}>Type</td>
            <td className="font-sans text-xs py-1.5 font-medium" style={{ color: '#28282A' }}>{property.type}</td>
          </tr>
          <tr>
            <td className="font-sans text-xs py-1.5" style={{ color: '#9797A3' }}>Tenure</td>
            <td className="font-sans text-xs py-1.5" style={{ color: '#28282A' }}>{property.tenure}</td>
          </tr>
          <tr>
            <td className="font-sans text-xs py-1.5" style={{ color: '#9797A3' }}>Access</td>
            <td className="font-sans text-xs py-1.5" style={{ color: '#28282A' }}>{property.access}</td>
          </tr>
          <tr>
            <td className="font-sans text-xs py-1.5" style={{ color: '#9797A3' }}>Location</td>
            <td className="font-sans text-xs py-1.5 flex items-center gap-1" style={{ color: '#28282A' }}>
              <MapPin size={10} color="#4A3E3D" /> {property.location}
            </td>
          </tr>
          {property.extra && (
            <tr>
              <td className="font-sans text-xs py-1.5" style={{ color: '#9797A3' }}>Details</td>
              <td className="font-sans text-xs py-1.5" style={{ color: '#28282A' }}>{property.extra}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

/* ─────────── Property Types Guide ─────────── */
function PropertyTypesGuide() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.guide-card', {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const types = [
    {
      icon: Factory,
      title: 'B1 Light Industrial',
      body: 'B1 industrial properties are designed for light, clean industries such as warehousing, logistics, software development, light manufacturing, and assembly. These units are typically located closer to residential areas and have stricter environmental controls. Ceiling heights range from 4-6m and floor loading from 7.5-15 kN/sqm.',
      examples: 'E-commerce warehouses, R&D labs, clean assembly',
      color: '#4A3E3D',
    },
    {
      icon: Building2,
      title: 'B2 Heavy Industrial',
      body: 'B2 industrial properties accommodate heavy industrial activities including manufacturing, fabrication, engineering workshops, and production involving machinery, chemicals, or heavy equipment. These are located in designated industrial zones away from residential areas. Features include high floor loading (15-20 kN/sqm), high ceilings (6-8m), and heavy vehicle access.',
      examples: 'Manufacturing plants, fabrication workshops, logistics hubs',
      color: '#C45D8C',
    },
    {
      icon: Warehouse,
      title: 'Business Parks',
      body: "Business parks in Singapore offer a hybrid of office and industrial space, designed for high-value, knowledge-intensive activities. These include R&D centers, corporate headquarters, tech companies, and biomedical firms. Business parks typically feature modern architecture, landscaped environments, and comprehensive amenities.",
      examples: 'Changi Business Park, one-north, International Business Park',
      color: '#78B0B5',
    },
  ]

  return (
    <section ref={sectionRef} className="py-24" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="mono-label mb-3">GUIDE</p>
          <h2 className="section-heading">Understanding Singapore Industrial Property Types</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {types.map((t, i) => (
            <div
              key={i}
              className="guide-card rounded-xl p-8 transition-all duration-200 hover:-translate-y-1"
              style={{ border: '1px solid #DEDEE0' }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${t.color}20` }}
              >
                <t.icon size={24} color={t.color} />
              </div>
              <h3 className="font-serif text-2xl font-medium mb-4" style={{ color: '#17171C' }}>{t.title}</h3>
              <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: '#28282A' }}>{t.body}</p>
              <p className="font-sans text-xs" style={{ color: '#9797A3' }}>
                <span className="font-medium" style={{ color: '#17171C' }}>Examples: </span>
                {t.examples}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── District Guide ─────────── */
function DistrictGuide() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.district-guide-card', {
        opacity: 0, y: 30, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const districts = [
    { name: 'Tuas', desc: "Singapore's largest industrial zone in the west. Home to the Tuas Port and major logistics hubs. Primarily B2 heavy industrial." },
    { name: 'Jurong', desc: 'Established industrial estate with mixed B1/B2 properties. Excellent port and expressway connectivity via AYE and PIE.' },
    { name: 'Woodlands', desc: 'Fast-growing northern industrial hub with new B2 factory developments. MRT-connected via Thomson-East Coast Line.' },
    { name: 'Changi', desc: 'Eastern industrial zone near Changi Airport. Popular for logistics, aviation-related industries, and business parks.' },
    { name: 'Paya Lebar', desc: 'Central-eastern industrial area transitioning into a mixed-use precinct. Good MRT access and proximity to CBD.' },
    { name: 'Kaki Bukit', desc: 'Established eastern industrial estate with diverse B1 and B2 properties. Near Paya Lebar MRT and KPE expressway.' },
  ]

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#F7F5E8' }} className="py-24">
      <div className="max-w-[1128px] mx-auto px-6">
        <h2 className="section-heading mb-10">Industrial Property by District</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {districts.map((d, i) => (
            <div
              key={i}
              className="district-guide-card bg-white rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 cursor-pointer"
              style={{ border: '1px solid #DEDEE0' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#4A3E3D' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#DEDEE0' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(246,180,107,0.15)' }}>
                  <MapPin size={18} color="#4A3E3D" />
                </div>
                <h3 className="font-serif text-xl font-medium" style={{ color: '#17171C' }}>{d.name}</h3>
              </div>
              <p className="font-sans text-sm" style={{ color: '#9797A3' }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── CTA Banner ─────────── */
function CTABanner() {
  return (
    <section style={{ backgroundColor: '#17171C' }} className="py-20">
      <div className="max-w-[1128px] mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl lg:text-4xl text-white font-medium mb-4">
          Can't Find What You're Looking For?
        </h2>
        <p className="font-sans text-base mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600 }}>
          Contact us for off-market listings and exclusive industrial properties not advertised online. Our network gives you access to 500+ properties before they hit the open market.
        </p>
        <Link to="/launches" className="btn-bronze inline-flex items-center gap-2">
          Contact Us for Off-Market Deals <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}

/* ─────────── Industrial Info Page ─────────── */
export default function IndustrialInfo() {
  return (
    <>
      <Helmet>
        <title>Singapore Industrial Property Directory | B1 B2 Factory Warehouse For Sale | SG Industrial</title>
        <meta name="description" content="Complete directory of Singapore industrial properties. Browse 60-year and 30-year tenure B1/B2 factories, warehouses, ramp-up units in Tuas, Jurong, Woodlands, Changi, and more." />
        <link rel="canonical" href="https://sgindustrialproperties.com/industrial-properties" />
        <meta property="og:title" content="Singapore Industrial Property Directory | SG Industrial" />
        <meta property="og:description" content="Complete directory of B1/B2 factories, warehouses, and industrial properties across Singapore." />
        <meta property="og:url" content="https://sgindustrialproperties.com/industrial-properties" />
      </Helmet>

      <PageHero />
      <FilterBar />
      <SixtyYearProperties />
      <ThirtyYearProperties />
      <PropertyTypesGuide />
      <DistrictGuide />
      <CTABanner />
    </>
  )
}
