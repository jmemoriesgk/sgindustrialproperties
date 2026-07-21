import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Building2, Calendar, Layers, Zap, Car, Train } from 'lucide-react'
import { getBuildingBySlug, getRelatedBuildings } from '../data/buildingLibrary'

export default function BuildingDetail() {
  const { slug } = useParams<{ slug: string }>()
  const building = getBuildingBySlug(slug || '')
  const related = building ? getRelatedBuildings(building.slug, 4) : []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!building) {
    return <Navigate to="/properties" replace />
  }

  // Generate SEO keywords from building data
  const seoKeywords = [
    building.name.toLowerCase(),
    building.slug.replace(/-/g, ' '),
    `${building.name} singapore`,
    `${building.name} for rent`,
    `${building.name} for sale`,
    `${building.type.toLowerCase()} singapore`,
    `${building.district.toLowerCase()} industrial property`,
    `industrial property ${building.address.split(',')[0].toLowerCase()}`,
    `b1 industrial ${building.district.toLowerCase()}`,
    `b2 industrial ${building.district.toLowerCase()}`,
    'sg industrial properties',
    'sg industrial group',
    'industrial property for sale singapore',
    'industrial property for rent singapore',
    'no absd',
  ].join(', ')

  // FAQ schema specific to this building
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${building.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${building.name} is a ${building.type} located at ${building.address}, Singapore ${building.district}. It offers ${building.rampUp} and has a ${building.tenure}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Where is ${building.name} located?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${building.name} is located at ${building.address}, Singapore ${building.district}. Nearby MRT stations include ${building.mrt}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What type of industrial property is ${building.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${building.name} is a ${building.type} with ${building.storeys} storeys. It features ${building.ceilingHeight} ceiling height, ${building.floorLoading} floor loading, and ${building.power} power supply.`,
        },
      },
    ],
  }

  // RealEstateListing schema
  const listingSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: `${building.name} - ${building.type}`,
    description: `${building.name} is a ${building.type} at ${building.address}, Singapore ${building.district}. ${building.tenure}. Features ${building.ceilingHeight} ceiling height, ${building.floorLoading} floor loading, and ${building.rampUp} access.`,
    url: `https://sgindustrialproperties.com/properties/${building.slug}`,
    datePosted: new Date().toISOString().split('T')[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: building.address,
      addressCountry: 'SG',
    },
  }

  return (
    <>
      <Helmet>
        <title>{building.name} | {building.type} {building.district} Singapore | For Sale & Rent | SG Industrial Properties</title>
        <meta name="description" content={`${building.name} - ${building.type} at ${building.address}, Singapore ${building.district}. ${building.tenure}. ${building.storeys} storeys, ${building.ceilingHeight} ceiling, ${building.floorLoading}. Contact SG Industrial Properties & Group.`} />
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href={`https://sgindustrialproperties.com/properties/${building.slug}`} />
        <meta property="og:title" content={`${building.name} | ${building.type} ${building.district} | SG Industrial Properties`} />
        <meta property="og:description" content={`${building.name} - ${building.type} at ${building.address}, Singapore ${building.district}. ${building.tenure}. Contact us for viewing.`} />
        <meta property="og:url" content={`https://sgindustrialproperties.com/properties/${building.slug}`} />
        <meta property="og:type" content="realestate.listing" />
      </Helmet>

      {/* Hero */}
      <section className="relative w-full flex items-end" style={{ height: '45vh', minHeight: 300 }}>
        <img
          src="/images/industrial-interior.jpg"
          alt={`${building.name} ${building.type} at ${building.address} Singapore ${building.district}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(23,23,28,0.95) 0%, rgba(23,23,28,0.5) 60%, transparent 100%)' }} />
        <div className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-10">
          <Link to="/properties" className="inline-flex items-center gap-1 font-sans text-sm mb-4 transition-colors hover:text-[#4A3E3D]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <ArrowLeft size={14} /> Back to Building Library
          </Link>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="font-sans text-[10px] font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#4A3E3D', color: '#1C1A17' }}>{building.district}</span>
            <span className="font-sans text-[10px] font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(198,93,140,0.2)', color: '#fff' }}>{building.type}</span>
          </div>
          <h1 className="font-serif text-white font-semibold mb-2" style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.5px', lineHeight: 1.15 }}>
            {building.name}
          </h1>
          <p className="font-sans text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>{building.address}, Singapore {building.district}</p>
        </div>
      </section>

      {/* Specs Grid */}
      <section style={{ backgroundColor: '#F7F5F0' }} className="py-16">
        <div className="max-w-[1128px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-medium mb-6" style={{ color: '#1C1A17' }}>Property Specifications</h2>
              
              <div className="bg-white rounded-xl p-6 mb-6" style={{ border: '1px solid #E8E4DC' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: Building2, label: 'Project Name', value: building.name },
                    { icon: Layers, label: 'Property Type', value: building.type },
                    { icon: Calendar, label: 'Tenure', value: building.tenure },
                    { icon: Building2, label: 'Storeys', value: `${building.storeys} storeys` },
                    { icon: ArrowRight, label: 'Ceiling Height', value: building.ceilingHeight },
                    { icon: Layers, label: 'Floor Loading', value: building.floorLoading },
                    { icon: Zap, label: 'Power Supply', value: building.power },
                    { icon: ArrowRight, label: 'Ramp Up Access', value: building.rampUp },
                    { icon: Car, label: 'Loading Bay', value: building.loadingBay },
                    { icon: Car, label: 'Parking', value: building.carpark },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F7F5F0' }}>
                      <item.icon size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#4A3E3D' }} />
                      <div>
                        <p className="font-sans text-xs font-medium mb-0.5" style={{ color: '#1C1A17' }}>{item.label}</p>
                        <p className="font-sans text-sm font-medium" style={{ color: '#1C1A17' }}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Summary */}
              <h3 className="font-serif text-xl font-medium mb-4" style={{ color: '#1C1A17' }}>Location</h3>
              <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #E8E4DC' }}>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Train size={18} style={{ color: '#6390B5' }} />
                    <div>
                      <p className="font-sans text-xs font-medium mb-0.5" style={{ color: '#1C1A17' }}>Nearest MRT</p>
                      <p className="font-sans text-sm" style={{ color: '#1C1A17' }}>{building.mrt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div>
              <div className="bg-white rounded-xl p-6 sticky top-24" style={{ border: '1px solid #E8E4DC' }}>
                <h3 className="font-serif text-lg font-medium mb-4" style={{ color: '#1C1A17' }}>Interested in {building.name}?</h3>
                <p className="font-sans text-sm mb-6" style={{ color: '#1C1A17' }}>
                  Contact SG Industrial Properties & Group for availability, pricing, and viewing arrangements.
                </p>
                <div className="space-y-3">
                  <a href="tel:+6597687722" className="btn-bronze w-full text-center block">Call +65 9768 7722</a>
                  <a
                    href="https://www.privyr.com/form/1U3bZG2k#sg-industrial-enquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-dark w-full text-center block"
                  >
                    Enquire Online
                  </a>
                </div>
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid #F7F5F0' }}>
                  <p className="font-sans text-xs mb-2" style={{ color: '#1C1A17' }}>Managed by</p>
                  <p className="font-sans text-sm font-medium" style={{ color: '#1C1A17' }}>SG Industrial Properties & Group</p>
                  <p className="font-sans text-xs mt-1" style={{ color: '#1C1A17' }}>James Goh (R002565A)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Buildings */}
      {related.length > 0 && (
        <section style={{ backgroundColor: '#fff' }} className="py-20">
          <div className="max-w-[1128px] mx-auto px-6">
            <h2 className="font-serif text-2xl font-medium mb-8" style={{ color: '#1C1A17' }}>
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((b) => (
                <Link
                  key={b.slug}
                  to={`/properties/${b.slug}`}
                  className="block rounded-xl p-5 transition-all duration-200 hover:-translate-y-1"
                  style={{ border: '1px solid #E8E4DC', backgroundColor: '#F7F5F0' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-sans text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(246,180,107,0.15)', color: '#C45D8C' }}>
                      {b.district}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-1" style={{ color: '#1C1A17' }}>{b.name}</h3>
                  <p className="font-sans text-xs mb-3" style={{ color: '#1C1A17' }}>{b.type}</p>
                  <div className="flex items-center gap-1" style={{ color: '#4A3E3D' }}>
                    <span className="font-sans text-xs">View Details</span>
                    <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }} />
    </>
  )
}
