import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Phone, MapPin, Building2, Calendar, ArrowUp, Zap, Weight, ExternalLink, CheckCircle } from 'lucide-react'
import { getListingBySlug, getRelatedListings } from '../data/listings'

export default function ListingDetail() {
  const { slug } = useParams<{ slug: string }>()
  const listing = getListingBySlug(slug || '')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!listing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center" style={{ backgroundColor: '#F7F5F0' }}>
        <div className="text-center">
          <h2 className="font-serif text-2xl font-medium mb-4" style={{ color: '#1C1A17' }}>Listing Not Found</h2>
          <p className="font-sans text-base mb-6" style={{ color: '#1C1A17' }}>The property listing you are looking for does not exist.</p>
          <Link to="/listings" className="btn-primary">Browse All Listings</Link>
        </div>
      </div>
    )
  }

  const related = getRelatedListings(listing.id, listing.districtCode)
  const isAvailable = listing.status === 'available'

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": listing.name,
    "description": listing.description,
    "url": `https://sgindustrialproperties.com/listings/${listing.slug}`,
    "image": listing.photos.map(p => `https://sgindustrialproperties.com${p}`),
    "datePosted": listing.dateAdded,
    "price": { "@type": "PriceSpecification", "price": listing.price, "priceCurrency": "SGD" },
    "address": { "@type": "PostalAddress", "streetAddress": listing.address, "addressLocality": "Singapore", "addressCountry": "SG" },
    "floorSize": { "@type": "QuantitativeValue", "value": listing.size, "unitText": "sqft" },
    "broker": { "@type": "RealEstateAgent", "name": listing.agent, "identifier": listing.agentCea, "telephone": listing.agentPhone },
  }

  return (
    <>
      <Helmet>
        <title>{listing.metaTitle}</title>
        <meta name="description" content={listing.metaDescription} />
        <meta name="keywords" content={`${listing.type.toLowerCase()} for sale singapore, ${listing.districtCode.toLowerCase()} industrial, ${listing.address.toLowerCase()}, no absd, sg industrial properties, ${listing.agent.toLowerCase()}`} />
        <link rel="canonical" href={`https://sgindustrialproperties.com/listings/${listing.slug}`} />
        <meta property="og:title" content={listing.metaTitle} />
        <meta property="og:description" content={listing.metaDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://sgindustrialproperties.com/listings/${listing.slug}`} />
        <meta property="og:image" content={`https://sgindustrialproperties.com${listing.photos[0]}`} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Breadcrumbs */}
      <div style={{ backgroundColor: '#F7F5F0', borderBottom: '1px solid #E8E4DC' }}>
        <div className="max-w-[1128px] mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 font-sans text-sm" style={{ color: '#1C1A17' }}>
            <Link to="/" style={{ color: '#4A3E3D' }}>Home</Link>
            <span>/</span>
            <Link to="/listings" style={{ color: '#4A3E3D' }}>Listings</Link>
            <span>/</span>
            <span style={{ color: '#1C1A17' }}>{listing.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Image */}
      <section style={{ backgroundColor: '#1C1A17' }}>
        <div className="max-w-[1128px] mx-auto">
          <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
            <img src={listing.photos[0]} alt={listing.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,26,23,0.9) 0%, transparent 50%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
              <div className="max-w-[1128px] mx-auto">
                <span className="font-sans text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block" style={{ backgroundColor: isAvailable ? '#4A3E3D' : '#FFFFFF', color: '#fff' }}>
                  {listing.status === 'available' ? 'FOR SALE' : listing.status === 'sold' ? 'NOT AVAILABLE (SOLD)' : listing.status === 'rented' ? 'NOT AVAILABLE (RENTED)' : listing.status.toUpperCase()}
                </span>
                <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-2">{listing.name}</h1>
                <p className="font-sans text-lg flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <MapPin size={18} /> {listing.address}, {listing.district}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-[1128px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Details */}
            <div className="lg:col-span-2">
              {/* Price & Key Stats */}
              <div className="flex flex-wrap items-end gap-6 mb-8 pb-8" style={{ borderBottom: '1px solid #E8E4DC' }}>
                <div>
                  <p className="font-mono text-xs uppercase mb-1" style={{ color: '#4A3E3D', letterSpacing: '2px' }}>Asking Price</p>
                  <p className="font-serif text-3xl font-semibold" style={{ color: '#1C1A17' }}>{listing.priceDisplay}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase mb-1" style={{ color: '#4A3E3D', letterSpacing: '2px' }}>Floor Area</p>
                  <p className="font-sans text-xl font-medium" style={{ color: '#1C1A17' }}>{listing.sizeDisplay}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase mb-1" style={{ color: '#4A3E3D', letterSpacing: '2px' }}>PSF</p>
                  <p className="font-sans text-xl font-medium" style={{ color: '#1C1A17' }}>S${Math.round(listing.price / listing.size).toLocaleString()}</p>
                </div>
              </div>

              {/* Description */}
              <h2 className="font-serif text-2xl font-medium mb-4" style={{ color: '#1C1A17' }}>Property Overview</h2>
              <p className="font-sans text-base leading-relaxed mb-8" style={{ color: '#1C1A17' }}>{listing.description}</p>

              {/* Specifications Grid */}
              <h3 className="font-serif text-xl font-medium mb-4" style={{ color: '#1C1A17' }}>Specifications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Building2, label: 'Property Type', value: listing.type },
                  { icon: Calendar, label: 'Tenure', value: listing.tenure },
                  { icon: ArrowUp, label: 'Ceiling Height', value: listing.ceilingHeight },
                  { icon: Weight, label: 'Floor Loading', value: listing.floorLoading },
                  { icon: Zap, label: 'Power Supply', value: listing.powerSupply },
                  { icon: Calendar, label: 'TOP', value: listing.topDate },
                ].map((spec, i) => (
                  <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: '#F7F5F0' }}>
                    <spec.icon size={18} style={{ color: '#4A3E3D' }} className="mb-2" />
                    <p className="font-sans text-xs" style={{ color: '#4A3E3D' }}>{spec.label}</p>
                    <p className="font-sans text-sm font-medium" style={{ color: '#1C1A17' }}>{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <h3 className="font-serif text-xl font-medium mb-4" style={{ color: '#1C1A17' }}>Key Features</h3>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {listing.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} style={{ color: '#4A3E3D' }} />
                    <span className="font-sans text-sm" style={{ color: '#1C1A17' }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Location */}
              <h3 className="font-serif text-xl font-medium mb-4" style={{ color: '#1C1A17' }}>Location & Connectivity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div>
                  <p className="font-sans text-sm font-medium mb-2" style={{ color: '#1C1A17' }}>Nearby MRT</p>
                  {listing.nearbyMRT.map((m, i) => <p key={i} className="font-sans text-sm" style={{ color: '#1C1A17' }}>{m}</p>)}
                </div>
                <div>
                  <p className="font-sans text-sm font-medium mb-2" style={{ color: '#1C1A17' }}>Expressway Access</p>
                  {listing.nearbyExpressway.map((e, i) => <p key={i} className="font-sans text-sm" style={{ color: '#1C1A17' }}>{e}</p>)}
                </div>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-1">
              {/* Enquiry Card */}
              <div className="rounded-xl p-6 mb-6 sticky top-24" style={{ backgroundColor: '#1C1A17' }}>
                <h3 className="font-serif text-xl font-medium text-white mb-2">
                  {isAvailable ? 'Enquire About This Property' : 'Looking for Similar Properties?'}
                </h3>
                <p className="font-sans text-sm mb-5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {isAvailable
                    ? `Contact ${listing.agent} for a viewing or more details about this ${listing.type.toLowerCase()}.`
                    : `This property is no longer available. Contact ${listing.agent} to find similar properties in ${listing.district}.`}
                </p>

                {/* Agent */}
                <div className="flex items-center gap-3 mb-5 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={listing.agentPhoto} alt={listing.agent} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-sans text-sm font-semibold text-white">{listing.agent}</p>
                    <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>CEA {listing.agentCea}</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <a href={`https://wa.me/${listing.agentPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-bronze flex items-center justify-center gap-2">
                    <Phone size={16} /> WhatsApp {listing.agent}
                  </a>
                  <a href={`tel:${listing.agentPhone.replace(/\s/g, '')}`} className="btn-outline flex items-center justify-center gap-2">
                    <Phone size={16} /> {listing.agentPhone}
                  </a>
                  <a href="https://www.privyr.com/form/1U3bZG2k#sg-industrial-enquiry" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center justify-center gap-2">
                    <ExternalLink size={16} /> Submit Enquiry
                  </a>
                </div>

                <p className="font-sans text-xs mt-4 text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  All industrial properties — No ABSD
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Listings */}
      {related.length > 0 && (
        <section className="py-16" style={{ backgroundColor: '#F7F5F0' }}>
          <div className="max-w-[1128px] mx-auto px-6">
            <h2 className="font-serif text-2xl font-medium mb-8" style={{ color: '#1C1A17' }}>Similar Properties in {listing.districtCode}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(r => (
                <Link to={`/listings/${r.slug}`} key={r.id} className="group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                  <div className="relative h-40 overflow-hidden" style={{ backgroundColor: '#F7F5F0' }}>
                    <img src={r.photos[0]} alt={r.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-sans text-sm font-semibold mb-1" style={{ color: '#1C1A17' }}>{r.name}</h3>
                    <p className="font-sans text-sm font-medium" style={{ color: '#4A3E3D' }}>{r.priceDisplay}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
