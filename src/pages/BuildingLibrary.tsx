import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, MapPin, ArrowRight, Filter, Calendar } from 'lucide-react'
import { industrialBuildings, buildingDistricts } from '../data/buildingLibrary'

gsap.registerPlugin(ScrollTrigger)

/* ──────── Hero ──────── */
function Hero() {
  return (
    <section className="relative w-full flex items-end" style={{ height: '50vh', minHeight: 350 }}>
      <img
        src="/images/singapore-skyline.jpg"
        alt="Singapore industrial building library - SG Industrial Properties"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(23,23,28,0.95) 0%, rgba(23,23,28,0.6) 50%, transparent 100%)' }}
      />
      <div className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-12">
        <span className="inline-block font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={{ backgroundColor: '#4A3E3D', color: '#FFFFFF' }}>
          37 INDUSTRIAL BUILDINGS
        </span>
        <h1 className="font-serif text-white font-semibold mb-4" style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-1px', lineHeight: 1.1 }}>
          Singapore Industrial Building Library
        </h1>
        <p className="font-sans text-base max-w-[600px]" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Comprehensive database of B1, B2 industrial properties, warehouses, food factories, and terrace factories across all Singapore districts. For sale and for rent.
        </p>
      </div>
    </section>
  )
}

/* ──────── Building Card ──────── */
function BuildingCard({ building, index }: { building: typeof industrialBuildings[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!cardRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current!, {
        opacity: 0, y: 30, duration: 0.5, delay: index * 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current!, start: 'top 90%' }
      })
    }, cardRef.current)
    return () => ctx.revert()
  }, [index])

  return (
    <article
      ref={cardRef}
      className="building-card rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ border: '1px solid #E8E4DC', backgroundColor: '#fff' }}
    >
      <Link to={`/properties/${building.slug}`} className="block">
        <div className="p-6">
          {/* District badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-sans text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(246,180,107,0.15)', color: '#C45D8C' }}>
              {building.district}
            </span>
            <span className="font-sans text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(99,144,181,0.12)', color: '#6390B5' }}>
              {building.type.split(' ')[0]}
            </span>
          </div>
          
          {/* Name */}
          <h2 className="font-serif text-xl font-medium mb-2" style={{ color: '#1C1A17' }}>
            {building.name}
          </h2>
          
          {/* Type */}
          <p className="font-sans text-sm mb-3" style={{ color: '#1C1A17' }}>
            {building.type}
          </p>
          
          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={12} style={{ color: '#4A3E3D' }} />
              <span className="font-sans text-xs" style={{ color: '#1C1A17' }}>{building.tenure}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={12} style={{ color: '#4A3E3D' }} />
              <span className="font-sans text-xs" style={{ color: '#1C1A17' }}>{building.storeys} storeys</span>
            </div>
          </div>
          
          {/* Ramp up */}
          <div className="flex items-center gap-2 mb-4 p-2 rounded-lg" style={{ backgroundColor: '#F7F5F0' }}>
            <MapPin size={12} style={{ color: '#6390B5' }} />
            <span className="font-sans text-xs" style={{ color: '#1C1A17' }}>Ramp up: {building.rampUp}</span>
          </div>
          
          {/* Read more */}
          <div className="flex items-center gap-1 font-sans text-sm font-medium" style={{ color: '#4A3E3D' }}>
            View Details <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </article>
  )
}

/* ──────── Main Page ──────── */
export default function BuildingLibrary() {
  const [selectedType, setSelectedType] = useState('All')
  const [selectedDistrict, setSelectedDistrict] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredBuildings = industrialBuildings.filter((b) => {
    const matchType = selectedType === 'All' || b.type.startsWith(selectedType)
    const matchDistrict = selectedDistrict === 'All' || b.district === selectedDistrict
    const matchSearch = !searchQuery || 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.type.toLowerCase().includes(searchQuery.toLowerCase())
    return matchType && matchDistrict && matchSearch
  })

  // FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What industrial buildings are available in Singapore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `SG Industrial Properties & Group manages ${industrialBuildings.length} industrial buildings across Singapore including B1 light industrial, B2 heavy industrial, flatted factories, ramp-up factories, terrace factories, food factories, and warehouses in districts 14, 18, 20, 22, 23, 25, and 27.`,
        },
      },
    ],
  }

  // ItemList schema
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: industrialBuildings.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'RealEstateListing',
        name: `${b.name} - ${b.type}`,
        url: `https://sgindustrialproperties.com/properties/${b.slug}`,
        description: `${b.name} is a ${b.type} located at ${b.address}, Singapore ${b.district}. ${b.tenure}. Ramp up access: ${b.rampUp}.`,
      },
    })),
  }

  return (
    <>
      <Helmet>
        <title>Singapore Industrial Building Library | 37 B1 B2 Properties For Sale & Rent | SG Industrial Properties</title>
        <meta name="description" content={`Browse ${industrialBuildings.length} industrial buildings in Singapore. B1, B2, warehouse, food factory, terrace factory for sale and rent. Woodlands, Jurong, Kaki Bukit, Tampines, Yishun, Sembawang. Contact SG Industrial Properties & Group.`} />
        <meta name="keywords" content="industrial building library singapore, b1 industrial properties, b2 industrial properties, warehouse for rent singapore, food factory singapore, terrace factory, ramp up factory, industrial property woodlands, industrial property jurong, industrial property kaki bukit, sg industrial properties, sg industrial group" />
        <link rel="canonical" href="https://sgindustrialproperties.com/properties" />
        <meta property="og:title" content="Singapore Industrial Building Library | 37 Properties | SG Industrial Properties" />
        <meta property="og:description" content={`Browse ${industrialBuildings.length} industrial buildings in Singapore. B1, B2, warehouse, food factory for sale and rent.`} />
        <meta property="og:url" content="https://sgindustrialproperties.com/properties" />
      </Helmet>

      <Hero />

      {/* Filters */}
      <section style={{ backgroundColor: '#F7F5F0' }} className="py-8">
        <div className="max-w-[1128px] mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search building name, type, or district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full font-sans text-sm px-4 py-3 rounded-lg border"
                style={{ borderColor: '#E8E4DC', backgroundColor: '#fff' }}
              />
            </div>
            
            {/* Type filter */}
            <div className="flex items-center gap-2">
              <Filter size={16} style={{ color: '#1C1A17' }} />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="font-sans text-sm px-3 py-3 rounded-lg border"
                style={{ borderColor: '#E8E4DC', backgroundColor: '#fff' }}
              >
                <option value="All">All Types</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="Central Kitchen">Central Kitchen</option>
              </select>
            </div>
            
            {/* District filter */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="font-sans text-sm px-3 py-3 rounded-lg border"
              style={{ borderColor: '#E8E4DC', backgroundColor: '#fff' }}
            >
              <option value="All">All Districts</option>
              {buildingDistricts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          
          {/* Results count */}
          <p className="font-sans text-sm mt-4" style={{ color: '#1C1A17' }}>
            Showing {filteredBuildings.length} of {industrialBuildings.length} buildings
          </p>
        </div>
      </section>

      {/* Building Grid */}
      <section style={{ backgroundColor: '#F7F5F0' }} className="pb-24">
        <div className="max-w-[1128px] mx-auto px-6">
          {filteredBuildings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBuildings.map((b, i) => (
                <BuildingCard key={b.slug} building={b} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-sans text-lg" style={{ color: '#1C1A17' }}>
                No buildings match your filters. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content */}
      <section style={{ backgroundColor: '#fff' }} className="py-16">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="font-serif text-2xl font-medium mb-4" style={{ color: '#1C1A17' }}>
            Singapore Industrial Property Database
          </h2>
          <p className="font-sans text-base leading-relaxed mb-4" style={{ color: '#1C1A17' }}>
            <strong>SG Industrial Properties & SG Industrial Group</strong> maintains Singapore's most comprehensive industrial building library with {industrialBuildings.length} properties across all major industrial districts. Our portfolio includes B1 light industrial units, B2 heavy industrial factories, flatted factories, ramp-up factories, terrace factories, food factories, and warehouses.
          </p>
          <p className="font-sans text-base leading-relaxed" style={{ color: '#1C1A17' }}>
            Whether you are looking for industrial property <strong>for sale</strong> or <strong>for rent</strong> in Woodlands, Jurong, Kaki Bukit, Tampines, Yishun, Sembawang, or any other Singapore district, our building library helps you find the perfect match. All properties come with <strong>No ABSD</strong>. Contact James Goh (R002565A) at +65 9768 7722 for enquiries.
          </p>
        </div>
      </section>

      {/* Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
    </>
  )
}
