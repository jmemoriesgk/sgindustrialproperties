import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Search, Filter, MapPin, ArrowRight } from 'lucide-react'
import { listings, districts, propertyTypes } from '../data/listings'

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filtered = useMemo(() => {
    let result = [...listings]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q) ||
        l.district.toLowerCase().includes(q) ||
        l.type.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.features.some(f => f.toLowerCase().includes(q))
      )
    }

    if (selectedDistrict) {
      result = result.filter(l => l.district === selectedDistrict)
    }
    if (selectedType) {
      result = result.filter(l => l.type === selectedType)
    }
    if (selectedStatus) {
      switch (selectedStatus) {
        case 'available':
          result = result.filter(l => l.status === 'available')
          break
        case 'rent':
          result = result.filter(l => l.listingType === 'rent')
          break
        case 'rented':
          result = result.filter(l => l.status === 'rented')
          break
        case 'sold':
          result = result.filter(l => l.status === 'sold')
          break
        default:
          result = result.filter(l => l.status === selectedStatus)
      }
    }

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'size-small': result.sort((a, b) => a.size - b.size); break
      case 'size-large': result.sort((a, b) => b.size - a.size); break
      default: result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    }

    return result
  }, [searchQuery, selectedDistrict, selectedType, selectedStatus, sortBy])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const statusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; label: string }> = {
      available: { bg: '#E8F5E9', text: '#2E7D32', label: 'For Sale' },
      sold: { bg: '#F5F5F5', text: '#6B6560', label: 'Not Available (Sold)' },
      rented: { bg: '#E3F2FD', text: '#1565C0', label: 'Not Available (Rented)' },
      withdrawn: { bg: '#FFF3E0', text: '#E65100', label: 'Withdrawn' },
    }
    const s = styles[status] || styles.available
    return <span className="font-sans text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: s.bg, color: s.text }}>{s.label}</span>
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedDistrict('')
    setSelectedType('')
    setSelectedStatus('')
    setSortBy('newest')
    setCurrentPage(1)
  }

  return (
    <>
      <Helmet>
        <title>Industrial Property Listings Singapore | For Sale & Rent | SG Industrial Properties</title>
        <meta name="description" content="Browse industrial properties for sale in Singapore. B1/B2 factories, warehouses, food hubs. Filter by district, type, price, size. Contact James Goh R002565A +65 9768 7722." />
        <meta name="keywords" content="industrial property for sale singapore, b1 industrial, b2 factory, warehouse for sale, food hub, ramp up factory, commercial property, tuas, jurong, macpherson, kallang, no absd, sg industrial properties" />
        <link rel="canonical" href="https://sgindustrialproperties.com/listings" />
      </Helmet>

      {/* Hero */}
      <section style={{ backgroundColor: '#F7F5F0' }} className="py-16">
        <div className="max-w-[1128px] mx-auto px-6">
          <p className="mono-label mb-3">PROPERTY LISTINGS</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-4" style={{ color: '#1C1A17', letterSpacing: '-1px' }}>
            Industrial Properties For Sale
          </h1>
          <p className="font-sans text-lg mb-8" style={{ color: '#6B6560', maxWidth: 600 }}>
            Discover B1 industrial units, B2 factories, warehouses, and food hubs across Singapore. All industrial properties come with No ABSD.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-[600px]">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#6B6560' }} />
            <input
              type="text"
              placeholder="Search by name, address, district, type, or features..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }}
              className="w-full pl-12 pr-4 py-4 rounded-xl font-sans text-base border"
              style={{ borderColor: '#E8E4DC', backgroundColor: '#fff', color: '#1C1A17' }}
            />
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section ref={sectionRef} style={{ backgroundColor: '#fff' }} className="py-12">
        <div className="max-w-[1128px] mx-auto px-6">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Filter size={18} style={{ color: '#6B6560' }} />
            <select value={selectedDistrict} onChange={e => { setSelectedDistrict(e.target.value); setCurrentPage(1) }} className="font-sans text-sm px-4 py-2.5 rounded-lg border" style={{ borderColor: '#E8E4DC', backgroundColor: '#fff', color: '#1C1A17' }}>
              <option value="">All Districts</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={selectedType} onChange={e => { setSelectedType(e.target.value); setCurrentPage(1) }} className="font-sans text-sm px-4 py-2.5 rounded-lg border" style={{ borderColor: '#E8E4DC', backgroundColor: '#fff', color: '#1C1A17' }}>
              <option value="">All Types</option>
              {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={selectedStatus} onChange={e => { setSelectedStatus(e.target.value); setCurrentPage(1) }} className="font-sans text-sm px-4 py-2.5 rounded-lg border" style={{ borderColor: '#E8E4DC', backgroundColor: '#fff', color: '#1C1A17' }}>
              <option value="">All Status</option>
              <option value="available">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="rented">Not Available (Rented)</option>
              <option value="sold">Not Available (Sold)</option>
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="font-sans text-sm px-4 py-2.5 rounded-lg border" style={{ borderColor: '#E8E4DC', backgroundColor: '#fff', color: '#1C1A17' }}>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="size-small">Size: Small to Large</option>
              <option value="size-large">Size: Large to Small</option>
            </select>
            {(searchQuery || selectedDistrict || selectedType || selectedStatus) && (
              <button onClick={clearFilters} className="font-sans text-sm px-4 py-2.5 rounded-lg border" style={{ borderColor: '#E8E4DC', color: '#6B6560' }}>Clear Filters</button>
            )}
            <span className="font-sans text-sm ml-auto" style={{ color: '#6B6560' }}>{filtered.length} listing{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          {/* Listing Cards */}
          {paginated.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-sans text-lg mb-4" style={{ color: '#6B6560' }}>No listings match your criteria.</p>
              <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map(listing => (
                <Link to={`/listings/${listing.slug}`} key={listing.id} className="group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                  <div className="relative h-52 overflow-hidden" style={{ backgroundColor: '#F7F5F0' }}>
                    <img src={listing.photos[0]} alt={listing.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute top-3 left-3">{statusBadge(listing.status)}</div>
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-xs uppercase mb-2" style={{ color: '#4A3E3D', letterSpacing: '1.5px' }}>{listing.type}</p>
                    <h3 className="font-serif text-lg font-medium mb-2" style={{ color: '#1C1A17' }}>{listing.name}</h3>
                    <p className="font-sans text-sm mb-3 flex items-center gap-1" style={{ color: '#6B6560' }}>
                      <MapPin size={14} /> {listing.address}, {listing.districtCode}
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-sans text-xl font-semibold" style={{ color: '#1C1A17' }}>{listing.priceDisplay}</span>
                      <span className="font-sans text-sm" style={{ color: '#6B6560' }}>{listing.sizeDisplay}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {listing.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="font-sans text-xs px-2 py-1 rounded" style={{ backgroundColor: '#F7F5F0', color: '#4A4540' }}>{f}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #E8E4DC' }}>
                      <div className="flex items-center gap-2">
                        <img src={listing.agentPhoto} alt={listing.agent} className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-sans text-sm" style={{ color: '#1C1A17' }}>{listing.agent}</span>
                      </div>
                      <ArrowRight size={16} style={{ color: '#4A3E3D' }} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); window.scrollTo({ top: sectionRef.current?.offsetTop || 0, behavior: 'smooth' }) }}
                  className="font-sans text-sm w-10 h-10 rounded-lg transition-colors"
                  style={{
                    backgroundColor: page === currentPage ? '#1C1A17' : '#fff',
                    color: page === currentPage ? '#fff' : '#1C1A17',
                    border: '1px solid #E8E4DC',
                  }}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
