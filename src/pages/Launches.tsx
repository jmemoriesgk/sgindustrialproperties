import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone, MapPin, Ruler, ArrowUp, Truck, Zap, Calendar, Layers,
  ChevronDown, CheckCircle, MessageCircle, Check,
  Train, Bus, TreePine, HardHat, Gauge, ParkingCircle, Building2,
  Store, Star, Info, Waves, Utensils, ForkKnife,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────── LAUNCHES HERO ─────────────────── */
function LaunchesHero() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.launches-hero > *', { opacity: 0, y: 30, duration: 0.8, stagger: 0.12, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{ backgroundColor: '#1C1A17', minHeight: '50vh' }} className="flex items-center justify-center py-24">
      <div className="launches-hero text-center px-6 max-w-[900px]">
        <p className="mono-label mb-4" style={{ color: '#4A3E3D' }}>NEW INDUSTRIAL / COMMERCIAL LAUNCHES</p>
        <h1 className="font-serif text-white font-semibold mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-1px' }}>
          Latest Industrial & Commercial Projects
        </h1>
        <p className="font-sans text-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 700 }}>
          Discover Singapore's newest industrial and commercial property launches. From multi-user ramp-up factories to food hubs, heritage-adaptive mixed-use developments, and freehold B1 industrial.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          <a href="#gateplus" className="btn-primary text-sm py-3 px-5">Gate+ @ Tukang</a>
          <a href="#ctgold" className="btn-outline text-sm py-3 px-5">CT Gold</a>
          <a href="#space18" className="btn-outline text-sm py-3 px-5">SPACE@18</a>
          <a href="#spacenova" className="btn-outline text-sm py-3 px-5">Space Nova</a>
          <a href="#generations" className="btn-outline text-sm py-3 px-5">Generations@Tannery</a>
          <a href="#gxc" className="btn-outline text-sm py-3 px-5">Gourmet Xchange</a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── PROJECT CARDS ─────────────────── */
function ProjectCards() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', { opacity: 0, y: 40, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  const projects = [
    { id: 'gateplus', name: 'Gate+', location: '@ Tukang, Jurong', tag: 'B2 Multi-User Ramp-Up Factory', badge: 'NEW LAUNCH', badgeColor: '#4A3E3D', image: '/images/gate-plus-hero.jpg',
      alt: 'Gate Plus at Tukang Jurong 10-storey B2 multi-user ramp-up industrial factory',
      stats: [{ label: 'Units', value: '265+' }, { label: 'Tenure', value: '33 Yrs' }, { label: 'TOP', value: 'Jan 2029' }],
      highlights: ['40ft Container Access', 'Green Mark Platinum', '2 Industrial Canteens'] },
    { id: 'ctgold', name: 'CT Gold', location: 'Macpherson', tag: 'B1/B2 Mixed-Use Industrial', badge: '100% FULLY SOLD', badgeColor: '#C45D8C', image: '/images/ct-gold-hero.jpg',
      alt: 'CT Gold at Macpherson modern multi-storey industrial commercial building with glass facade gold accents helical parking',
      stats: [{ label: 'Storeys', value: '10+' }, { label: 'Type', value: 'B1/B2' }, { label: 'Parking', value: 'Helical Ramp' }],
      highlights: ['Glass Facade', 'Ground Floor F&B', 'Integrated Retail'] },
    { id: 'generations', name: 'Generations@Tannery', location: '71 Tannery Lane', tag: 'B1 Industrial — Freehold', badge: 'NEW LAUNCH', badgeColor: '#78B0B5', image: '/images/generations-tannery-hero.png',
      alt: 'Generations at Tannery 12-storey freehold B1 industrial development at 71 Tannery Lane',
      stats: [{ label: 'Units', value: '54' }, { label: 'Tenure', value: 'Freehold' }, { label: 'Storeys', value: '12' }],
      highlights: ['Freehold', '6-min to Mattar MRT', '5 Industrial Canteens'] },
    { id: 'gxc', name: 'Gourmet Xchange', location: '@ 1 Kallang Way', tag: 'B2 (Food) — Heritage Mixed-Use', badge: 'NEW LAUNCH', badgeColor: '#5DC489', image: '/images/gourmet-xchange-hero.jpg',
      alt: 'Gourmet Xchange at Kallang Way 9-storey food hub with heritage terrace block and Kallang River waterfront',
      stats: [{ label: 'Units', value: '272' }, { label: 'Storeys', value: '9+3' }, { label: 'Zone', value: 'Food Hub' }],
      highlights: ['Riverfront', 'Heritage Terrace', 'Green Mark Platinum'] },
    { id: 'space18', name: 'SPACE@18', location: 'Lorong Ampas', tag: 'B1 Clean Industrial — Freehold', badge: 'NEW LAUNCH', badgeColor: '#8E69B6', image: '/images/space-18-hero.jpg',
      alt: 'SPACE@18 at 18 Lorong Ampas 6-storey freehold B1 clean industrial with glass wall facade',
      stats: [{ label: 'Units', value: '46+1' }, { label: 'Tenure', value: 'Freehold' }, { label: 'TOP', value: 'Dec 2026' }],
      highlights: ['Full-Height Glass Facade', '7.0m Ceiling (L1)', '3 Loading Bays'] },
    { id: 'spacenova', name: 'Space Nova', location: 'New Industrial Road', tag: 'B1 Clean Industrial — Freehold', badge: 'NEW LAUNCH', badgeColor: '#6390B5', image: '/images/space-nova-hero.jpg',
      alt: 'Space Nova at 21 New Industrial Road 7-storey freehold B1 clean industrial with glass facade and sky terrace',
      stats: [{ label: 'Units', value: '47' }, { label: 'Tenure', value: 'Freehold' }, { label: 'Storeys', value: '7' }],
      highlights: ['Ramp-Up Access', '4 EV Charging Lots', 'Communal Sky Terrace'] },
  ]

  return (
    <section ref={ref} style={{ backgroundColor: '#F7F5F0' }} className="py-20">
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="mono-label mb-3" style={{ color: '#6B6560' }}>FEATURED LAUNCHES</p>
          <h2 className="section-heading">Explore New Opportunities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map(p => (
            <a key={p.id} href={`#${p.id}`} className="project-card group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2" style={{ border: '1px solid #E8E4DC', backgroundColor: '#fff' }}>
              <div className="relative h-56 overflow-hidden">
                <img src={p.image} alt={p.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-4 left-4 font-sans text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: p.badgeColor, color: p.badge === 'COMING SOON' || p.badge === '100% FULLY SOLD' ? '#fff' : '#1C1A17' }}>{p.badge}</span>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-mono text-xs mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>{p.tag}</p>
                  <h3 className="font-serif text-xl text-white font-medium">{p.name} <span className="font-sans text-sm font-normal">{p.location}</span></h3>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-5" style={{ borderBottom: '1px solid #E8E4DC' }}>
                {p.stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="font-serif text-lg font-semibold" style={{ color: '#1C1A17' }}>{s.value}</p>
                    <p className="font-mono text-xs mt-1" style={{ color: '#6B6560' }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {p.highlights.map((h, i) => (
                    <span key={i} className="font-sans text-xs px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(246,180,107,0.12)', color: '#1C1A17' }}>{h}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-4 font-sans text-sm font-medium" style={{ color: '#4A3E3D' }}>
                  View Full Details <ArrowUp size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   PROJECT 1 — GATE+  (preserved from before)
   ════════════════════════════════════════════════════════════════ */

function GatePlusHero() { return (<section id="gateplus" className="relative w-full flex items-end overflow-hidden scroll-mt-20" style={{ height: '75vh', minHeight: 500, backgroundColor: '#1C1A17' }}>
  <img src="/images/gate-plus-hero.jpg" alt="Gate Plus at Tukang Jurong" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(23,23,28,0.95) 0%, rgba(23,23,28,0.5) 40%, transparent 70%)' }} />
  <div className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-16">
    <span className="inline-block font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={{ backgroundColor: '#4A3E3D', color: '#1C1A17' }}>NEW LAUNCH — B2 Industrial</span>
    <h2 className="font-serif text-white font-semibold mb-2" style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-2px', lineHeight: 1.1 }}>Gate+</h2>
    <p className="font-sans text-xl mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>@ Tukang, Jurong</p>
    <p className="font-sans text-base mb-6 max-w-[600px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
      10-storey multi-user B2 ramp-up industrial factory with 265 production units, publicly accessible heavy vehicle park, 2 industrial canteens, and Green Mark Platinum certification.
    </p>
    <div className="flex flex-wrap gap-6 mb-8">
      {[ { icon: Calendar, text: 'TOP: Jan 2029' }, { icon: Ruler, text: '502,863 sqft GFA' }, { icon: Layers, text: '265 Production Units' }, { icon: Truck, text: '40ft Container Access' }, ].map((s, i) => (<div key={i} className="flex items-center gap-2"><s.icon size={18} color="#4A3E3D" /><span className="font-sans text-sm text-white">{s.text}</span></div>))}
    </div>
    <div className="flex flex-wrap gap-4">
      <a href="#enquiry" className="btn-bronze flex items-center gap-2"><Phone size={16} /> Enquire Now</a>
      <a href="#gateplus-details" className="btn-outline">View Details</a>
    </div>
  </div>
</section>)}

function GatePlusStats() {
  const stats = [{ label: 'Site Area', value: '201,145', unit: 'sqft' }, { label: 'Total Units', value: '265', unit: 'units' }, { label: 'Tenure', value: '33', unit: 'years' }, { label: 'Floor Loading', value: '10', unit: 'kN/m²' },]
  return (<section className="py-8" style={{ backgroundColor: '#1C1A17', borderTop: '1px solid rgba(255,255,255,0.1)' }}><div className="max-w-[1128px] mx-auto px-6"><div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">{stats.map((s, i) => (<div key={i}><span className="font-serif text-3xl lg:text-4xl font-semibold" style={{ color: '#4A3E3D' }}>{s.value}</span><span className="font-sans text-sm ml-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.unit}</span><p className="font-mono text-xs uppercase mt-1" style={{ color: '#6B6560' }}>{s.label}</p></div>))}</div></div></section>)
}

function GatePlusOverview() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gplus-overview > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  return (<section ref={ref} id="gateplus-details" style={{ backgroundColor: '#F7F5F0' }} className="py-20"><div className="max-w-[1128px] mx-auto px-6"><div className="gplus-overview grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"><div>
    <p className="mono-label mb-3" style={{ color: '#4A3E3D' }}>PROJECT OVERVIEW</p>
    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-6" style={{ color: '#1C1A17' }}>Singapore's Next-Generation Industrial Hub</h3>
    <div className="font-sans text-base leading-relaxed space-y-4" style={{ color: '#4A4540' }}>
      <p>Gate+ is a proposed 10-storey multi-user ramp-up industrial factory development located in the heart of Tukang, Jurong. Designed for modern businesses, the development features 265 production units ranging from compact 1,615 sqft suites to expansive 14,596 sqft spaces.</p>
      <p>The development is a joint venture between <strong>Fusion Property Pte. Ltd.</strong> and <strong>BP-Innovue PTE. LTD.</strong>, developed by <strong>Tukang Project Pte. Ltd.</strong> With a Green Mark 2021 Platinum SLE certification and Maintainability Badge, Gate+ sets a new standard for sustainable industrial architecture.</p>
      <p>Strategic location along Corporation Road with direct AYE expressway access, upcoming Tukang MRT station (completion 2029), and proximity to Boon Lay and Lakeside MRT stations.</p>
    </div>
  </div><div className="space-y-2">
    {[{ label: 'Developer', value: 'Tukang Project Pte. Ltd.' }, { label: 'Project Type', value: 'Industrial B2' }, { label: 'Site Area', value: '~18,687 sqm / 201,145 sqft' }, { label: 'Max GFA', value: '~46,717.50 sqm / 502,863 sqft' }, { label: 'Tenure', value: '33 years from 27 Aug 2025' }, { label: 'Est. TOP', value: '30 January 2029' }, { label: 'Est. Legal Completion', value: '30 January 2032' }, { label: 'Sustainability', value: 'Green Mark 2021 Platinum SLE + Maintainability Badge' }, { label: 'Architect', value: '3P Ecotecture Pte Ltd' }, { label: 'M&E Engineer', value: 'Rankine & Hill (Singapore) Pte Ltd' }, { label: 'C&S Engineer', value: 'BCK & Partners Pte Ltd' }].map((item, i) => (
      <div key={i} className="flex justify-between items-center py-3 px-4 rounded-lg" style={{ backgroundColor: i % 2 === 0 ? '#fff' : 'transparent' }}>
        <span className="font-sans text-sm" style={{ color: '#6B6560' }}>{item.label}</span><span className="font-sans text-sm font-medium text-right" style={{ color: '#1C1A17', maxWidth: '60%' }}>{item.value}</span>
      </div>
    ))}
  </div></div></div></section>)
}

function GatePlusUnits() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gplus-unit-card', { opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const unitTypes = [
    { name: 'Grand Suite (L1)', count: '24 units', levels: 'Level 1', height: '7,000mm / 6,300mm', sizes: ['2,228 sqft (AG5)', '2,217 sqft (AG5a)', '2,174 sqft (AG5b)', '2,217 sqft (AG5c)', '2,282 sqft (AGc2)', '2,293 sqft (AG)', '2,347 sqft (AG4)', '2,411 sqft (AG2/AG3)', '2,486 sqft (AG1)', '2,971 sqft (AG6)'], desc: 'Ground floor premium units with highest ceiling clearance, ideal for heavy machinery and direct container loading.', color: '#4A3E3D' },
    { name: 'Standard Suite (L2-L8)', count: '190 units', levels: 'Levels 2 to 8', height: '6,125mm', sizes: ['1,615 sqft (A/Ac)', '1,625 sqft (A1/A2/A3)', '1,658 sqft (Ac1)', '1,711 sqft (Ac2/Ac3)', '1,722 sqft (Ac4)', '1,765 sqft (A4)', '1,668 sqft (A5)', '2,820 sqft (D)'], desc: 'Versatile mid-level production units with ramp-up access for 20-foot containers. Perfect for manufacturing and light assembly.', color: '#78B0B5' },
    { name: 'Pent Suite (L9-L10)', count: '51 units', levels: 'Levels 9 & 10', height: '6,125mm', sizes: ['1,615 sqft (D1/D2)', '1,636 sqft (Dc2)', '1,658 sqft (Dc1/Dc3)', '1,701 sqft (D3/D4)', '2,056 sqft (D5)', '2,530 sqft (Dc)', '14,596 sqft (HVP)'], desc: 'Top-floor units with panoramic views, sky terraces, and premium finishes. Exclusive roof garden and function room access.', color: '#C45D8C' },
  ]
  return (<section ref={ref} className="py-24" style={{ backgroundColor: '#fff' }}><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">265 PRODUCTION UNITS + 2 CANTEENS</p><h3 className="section-heading">Unit Types & Configurations</h3></div><div className="space-y-8">{unitTypes.map((u, i) => (<div key={i} className="gplus-unit-card rounded-xl p-8" style={{ border: '1px solid #E8E4DC' }}><div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div><div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: u.color }} /><h4 className="font-serif text-2xl font-medium mb-1" style={{ color: '#1C1A17' }}>{u.name}</h4><p className="font-mono text-xs mb-4" style={{ color: '#6B6560' }}>{u.count} | {u.levels}</p><div className="flex items-center gap-2 mb-2"><ArrowUp size={14} color={u.color} /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>Ceiling: {u.height}</span></div><p className="font-sans text-sm leading-relaxed" style={{ color: '#6B6560' }}>{u.desc}</p></div><div className="lg:col-span-2"><p className="font-sans text-xs font-semibold uppercase mb-3" style={{ color: '#6B6560' }}>Available Sizes</p><div className="flex flex-wrap gap-2">{u.sizes.map((s, j) => (<span key={j} className="font-sans text-sm px-3 py-2 rounded-lg" style={{ backgroundColor: `${u.color}15`, color: '#1C1A17' }}>{s}</span>))}</div></div></div></div>))}</div><div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: '#F7F5F0', border: '1px solid #E8E4DC' }}><h4 className="font-serif text-xl font-medium mb-4" style={{ color: '#1C1A17' }}>Industrial Canteens</h4><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{[{ name: 'Canteen 1 (Unit 06)', size: '4,327 sqft', power: '300A TPN' }, { name: 'Canteen 2 (Unit 26)', size: '3,197 sqft', power: '250A TPN' }].map((c, i) => (<div key={i} className="bg-white rounded-lg p-4" style={{ border: '1px solid #E8E4DC' }}><p className="font-sans text-sm font-medium" style={{ color: '#1C1A17' }}>{c.name}</p><p className="font-sans text-xs mt-1" style={{ color: '#6B6560' }}>{c.size} | {c.power}</p></div>))}</div></div></div></section>)
}

function GatePlusSpecs() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gplus-spec-card', { opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const specs = [
    { icon: ArrowUp, title: 'Ceiling Heights', items: ['Level 1: 7,000mm / 6,300mm', 'Levels 2-10: 6,125mm', 'Driveway clear headroom: ~4.5m'] },
    { icon: Gauge, title: 'Floor Loading', items: ['Production Units: 10 kN/m²', 'Driveway/Ramp/Loading Bay: 10 kN/m²', 'Canteen: 5 kN/m²', 'Sky Terrace/Roof Garden: 5 kN/m²'] },
    { icon: Zap, title: 'Electrical Provision', items: ['Factory Units (L1-L4): 60A TPN', 'Factory Units (L5-L8): 60A TPN', 'Pent Suite (L9-L10): 60A TPN', 'Heavy Vehicle Strata: 40A SPN', 'Canteen 1: 300A TPN', 'Canteen 2: 250A TPN'] },
    { icon: Layers, title: 'Lift Provision (8 Lifts)', items: ['2x Passenger Lift', '2x Passenger / Fire Lift', '2x Service / Fire Lift', '2x Goods Lift'] },
    { icon: ParkingCircle, title: 'Parking Facilities', items: ['Car Lots: 116 nos', 'EV Lots: 6 nos (1st storey)', 'Lorry Lots: 235 nos', 'Accessible Lots: 9 nos', 'Motorcycle Lots: 8 nos', 'Bicycle Lots: 124 nos', 'Heavy Vehicle Strata Lots: 58 nos'] },
    { icon: HardHat, title: 'Container & Loading', items: ['40ft Loading/Unloading Bays: 3 nos (L1)', '40ft containers accessible to L1', '20ft containers accessible to L2-L9', 'Ramp width: ~8m', 'Roller shutter L1-L8: 6m(W) x 4m(H)', 'Roller shutter L9: 3m(W) x 4m(H)'] },
  ]
  return (<section ref={ref} style={{ backgroundColor: '#F7F5F0' }} className="py-24"><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">TECHNICAL SPECIFICATIONS</p><h3 className="section-heading">Built for Modern Industry</h3></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{specs.map((s, i) => (<div key={i} className="gplus-spec-card bg-white rounded-xl p-6" style={{ border: '1px solid #E8E4DC' }}><div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(246,180,107,0.15)' }}><s.icon size={20} color="#4A3E3D" /></div><h4 className="font-serif text-lg font-medium mb-3" style={{ color: '#1C1A17' }}>{s.title}</h4><ul className="space-y-2">{s.items.map((item, j) => (<li key={j} className="flex items-start gap-2"><CheckCircle size={14} color="#5DC489" className="mt-0.5 flex-shrink-0" /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{item}</span></li>))}</ul></div>))}</div></div></section>)
}

function GatePlusLocation() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gplus-loc > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const transport = [{ icon: Train, label: 'MRT Stations', items: ['Tukang MRT (2029)', 'Jurong Hill MRT (2029)', 'Boon Lay MRT', 'Lakeside MRT'] }, { icon: Bus, label: 'Bus Services', items: ['Corporation Rd: 30, 79, 98, 154, 178, 240', 'Jalan Tukang: Bus 246'] }, { icon: MapPin, label: 'Expressway', items: ['Ayer Rajah Expressway (AYE)'] }]
  const amenities = ['End of Trip facilities with lockers & showers', 'Function room', 'Pavilion', 'Roof Garden', 'Sky Terraces', 'Green Courtyard', '2 Industrial Canteens', 'Publicly Accessible Heavy Vehicle Park']
  return (<section ref={ref} className="py-24" style={{ backgroundColor: '#fff' }}><div className="max-w-[1128px] mx-auto px-6"><div className="gplus-loc grid grid-cols-1 lg:grid-cols-2 gap-12"><div>
    <p className="mono-label mb-3" style={{ color: '#4A3E3D' }}>LOCATION</p>
    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-6" style={{ color: '#1C1A17' }}>Strategically Connected</h3>
    <p className="font-sans text-base leading-relaxed mb-8" style={{ color: '#4A4540' }}>Gate+ is positioned in the rapidly developing Tukang industrial precinct in Jurong, offering excellent connectivity to major transport nodes and expressways. The upcoming Tukang MRT station (estimated completion 2029) will further enhance accessibility.</p>
    <div className="space-y-6">{transport.map((t, i) => (<div key={i} className="flex items-start gap-4"><div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(246,180,107,0.15)' }}><t.icon size={18} color="#4A3E3D" /></div><div><h4 className="font-sans text-sm font-semibold mb-1" style={{ color: '#1C1A17' }}>{t.label}</h4>{t.items.map((item, j) => <p key={j} className="font-sans text-sm" style={{ color: '#6B6560' }}>{item}</p>)}</div></div>))}</div>
  </div><div>
    <p className="mono-label mb-3" style={{ color: '#4A3E3D' }}>AMENITIES</p>
    <h4 className="font-serif text-2xl font-medium mb-6" style={{ color: '#1C1A17' }}>On-Site Recreational Facilities</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{amenities.map((a, i) => (<div key={i} className="flex items-center gap-3 bg-white rounded-lg p-4" style={{ border: '1px solid #E8E4DC' }}><TreePine size={16} color="#5DC489" /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{a}</span></div>))}</div>
  </div></div></div></section>)
}

function GatePlusFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gplus-faq-item', { opacity: 0, y: 20, duration: 0.5, stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } }) }, ref); return () => ctx.revert() }, [])
  const faqs = [
    { q: 'Is there an MRT nearby?', a: 'Tukang MRT and Jurong Hill MRT are both under construction with estimated completion in 2029. Existing nearby stations include Boon Lay MRT and Lakeside MRT.' },
    { q: 'What bus services are available nearby?', a: 'Corporation Road: Bus 30, 79, 98, 154, 178 and 240. Jalan Tukang: Bus 246.' },
    { q: 'What is the nearest expressway?', a: 'Ayer Rajah Expressway (AYE) provides direct vehicular access to and from the development.' },
    { q: 'Where are the EV charging lots located?', a: 'There are 6 EV car park lots located at the 1st storey. No EV lorry lots are provided.' },
    { q: 'What is the driveway height control?', a: 'The driveway clear headroom for all floors is approximately 4.5 meters.' },
    { q: 'Is the development accessible for 20- and 40-foot containers?', a: 'Yes. 40-foot containers are accessible up to Level 1 loading/unloading bay. 20-foot containers are accessible to all floors except Level 10.' },
    { q: 'Are the car/lorry lots seasonal parking?', a: 'Owners will register for parking lots on a first-come, first-served basis after TOP. If oversubscribed, the managing agent will arrange balloting for seasonal parking.' },
    { q: 'Are there 40-foot parking lots or loading/unloading bays?', a: 'There are three 40-foot parking lots at Level 1 strictly for loading and unloading purposes only.' },
    { q: 'What is the width of the ramp?', a: 'Approximately 8 meters wide.' },
    { q: 'What is the distance between unit to unit?', a: 'Level 1 to 8: Approximately 9m / 12m. Level 9: Approximately 6m / 11m.' },
    { q: 'Will the electrical & water meter be installed?', a: 'No. The purchaser must apply to SP and the relevant authorities for approval and installation.' },
    { q: 'Can the production units be amalgamated?', a: "Yes, the units can be amalgamated. However, please refer to the floor plans and this is subject to managing agent and relevant authorities' approval." },
    { q: 'Is void area included in strata area of Grand Suite and Pent Suite?', a: 'No, void areas are not included in strata area.' },
    { q: 'Is city gas pipe or LPG tank available for canteen?', a: 'Canteens are operated by LPG tank and the purchaser of the canteen must engage their own vendor and obtain managing agent and relevant authority approval.' },
  ]
  return (<section ref={ref} style={{ backgroundColor: '#F7F5F0' }} className="py-24"><div className="max-w-[800px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">FREQUENTLY ASKED QUESTIONS</p><h3 className="section-heading">Everything You Need to Know</h3></div><div>{faqs.map((faq, i) => (<div key={i} className="gplus-faq-item border-b cursor-pointer" style={{ borderColor: '#E8E4DC' }} onClick={() => setOpenIndex(openIndex === i ? null : i)}><div className="flex items-center justify-between py-5"><h4 className="font-sans text-base font-medium pr-4" style={{ color: '#1C1A17' }}>{faq.q}</h4><ChevronDown size={20} style={{ color: '#6B6560', transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', flexShrink: 0 }} /></div><div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openIndex === i ? 300 : 0, opacity: openIndex === i ? 1 : 0 }}><p className="font-sans text-sm pb-5 leading-relaxed" style={{ color: '#4A4540' }}>{faq.a}</p></div></div>))}</div></div></section>)
}

/* ════════════════════════════════════════════════════════════════
   PROJECT 2 — CT GOLD  (preserved)
   ════════════════════════════════════════════════════════════════ */

function CTGoldHero() { return (<section id="ctgold" className="relative w-full flex items-end overflow-hidden scroll-mt-20" style={{ height: '75vh', minHeight: 500, backgroundColor: '#1C1A17' }}>
  <img src="/images/ct-gold-hero.jpg" alt="CT Gold at Macpherson modern multi-storey mixed-use industrial commercial building with glass facade" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(23,23,28,0.95) 0%, rgba(23,23,28,0.5) 40%, transparent 70%)' }} />
  <div className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-16">
    <span className="inline-block font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={{ backgroundColor: '#C45D8C', color: '#fff' }}>100% FULLY SOLD — B1/B2 Mixed-Use</span>
    <h2 className="font-serif text-white font-semibold mb-2" style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-2px', lineHeight: 1.1 }}>CT Gold</h2>
    <p className="font-sans text-xl mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>Singapore</p>
    <p className="font-sans text-base mb-6 max-w-[600px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
      A striking multi-storey mixed-use industrial and commercial development featuring contemporary glass architecture, gold accent framework, integrated ground-floor F&amp;B and retail, plus an innovative helical parking ramp.
    </p>
    <div className="flex flex-wrap gap-6 mb-8">
      {[ { icon: Building2, text: '10+ Storeys' }, { icon: Store, text: 'Ground Floor F&B / Retail' }, { icon: ParkingCircle, text: 'Helical Parking Ramp' }, { icon: Star, text: 'Iconic Gold Facade' }, ].map((s, i) => (<div key={i} className="flex items-center gap-2"><s.icon size={18} color="#4A3E3D" /><span className="font-sans text-sm text-white">{s.text}</span></div>))}
    </div>
    <div className="flex flex-wrap gap-4">
      <a href="#enquiry" className="btn-bronze flex items-center gap-2"><Phone size={16} /> Enquire Now</a>
      <a href="#ctgold-details" className="btn-outline">View Details</a>
    </div>
  </div>
</section>) }

function CTGoldOverview() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.ctgold-overview > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  return (<section ref={ref} id="ctgold-details" style={{ backgroundColor: '#F7F5F0' }} className="py-20"><div className="max-w-[1128px] mx-auto px-6"><div className="ctgold-overview grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"><div>
    <p className="mono-label mb-3" style={{ color: '#C45D8C' }}>PROJECT OVERVIEW</p>
    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-6" style={{ color: '#1C1A17' }}>Where Industrial Excellence Meets Modern Design</h3>
    <div className="font-sans text-base leading-relaxed space-y-4" style={{ color: '#4A4540' }}>
      <p>CT Gold at Macpherson represents a bold new vision for Singapore's industrial landscape — a mixed-use development that seamlessly blends productive industrial space with vibrant commercial and F&amp;B offerings at street level. The distinctive gold-accented glass facade makes an instant statement of quality and prestige.</p>
      <p>The development features a contemporary multi-storey tower with a full glass curtain wall, accented by a signature gold framework. The ground floor is activated by commercial units including a flagship <strong>Cafe Gold</strong> F&amp;B concept, alongside showroom and operations spaces.</p>
      <p>A standout architectural feature is the innovative helical parking ramp structure, providing efficient vehicle circulation while creating a dramatic sculptural form that distinguishes CT Gold from conventional industrial buildings.</p>
    </div>
  </div><div className="space-y-2">
    {[{ label: 'Project Name', value: 'CT Gold' }, { label: 'Project Type', value: 'B1 / B2 Mixed-Use Industrial & Commercial' }, { label: 'Building Height', value: '10+ Storeys (estimated)' }, { label: 'Facade', value: 'Glass Curtain Wall with Gold Accent Framework' }, { label: 'Ground Floor', value: 'Integrated F&B, Retail & Showroom Units' }, { label: 'Parking', value: 'Helical Ramp Parking Structure' }, { label: 'Signature Feature', value: 'Iconic Gold Framework Design' }, { label: 'Sustainability', value: 'Landscaped Greenery & Natural Ventilation' }, { label: 'Status', value: '100% Fully Sold' }].map((item, i) => (
      <div key={i} className="flex justify-between items-center py-3 px-4 rounded-lg" style={{ backgroundColor: i % 2 === 0 ? '#fff' : 'transparent' }}><span className="font-sans text-sm" style={{ color: '#6B6560' }}>{item.label}</span><span className="font-sans text-sm font-medium text-right" style={{ color: '#1C1A17', maxWidth: '55%' }}>{item.value}</span></div>
    ))}
  </div></div></div></section>)
}

function CTGoldFeatures() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.ctgold-feature', { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const features = [
    { icon: Building2, title: 'Contemporary Glass Architecture', body: 'Full-height glass curtain wall facade maximises natural daylight for production floors while creating a striking modern silhouette. The reflective glass reduces heat gain and enhances energy efficiency.', color: '#4A3E3D' },
    { icon: Star, title: 'Signature Gold Framework', body: 'The distinctive gold-coloured structural framework creates a premium branded identity visible from major roadways. This unique architectural language sets CT Gold apart from conventional industrial developments.', color: '#C45D8C' },
    { icon: Store, title: 'Ground Floor F&B & Retail', body: "Activated street frontage with Cafe Gold and other commercial units brings life to the development. These spaces serve tenant employees and attract foot traffic from the surrounding industrial precinct.", color: '#78B0B5' },
    { icon: ParkingCircle, title: 'Helical Parking Ramp', body: 'The innovative cylindrical parking structure provides seamless vehicle circulation from ground to upper levels. This space-efficient solution eliminates traditional ramp constraints and adds an iconic architectural element.', color: '#6390B5' },
    { icon: TreePine, title: 'Landscaped Environment', body: 'Generous landscaping surrounds the building with mature trees, green buffers, and pedestrian-friendly walkways. The design prioritises a pleasant working environment uncommon in industrial districts.', color: '#5DC489' },
    { icon: Zap, title: 'Future-Ready Infrastructure', body: 'Designed with modern industrial needs in mind — high-capacity power provisions, smart building systems, EV charging readiness, and flexible floor plates that adapt to diverse tenant requirements.', color: '#8E69B6' },
  ]
  return (<section ref={ref} className="py-24" style={{ backgroundColor: '#fff' }}><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">DESIGN HIGHLIGHTS</p><h3 className="section-heading">Designed to Stand Out</h3><p className="font-sans text-base mt-4 mx-auto" style={{ color: '#4A4540', maxWidth: 600 }}>CT Gold reimagines what an industrial development can look like — premium materials, thoughtful urban design, and tenant-first thinking.</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{features.map((f, i) => (<div key={i} className="ctgold-feature rounded-xl p-6" style={{ border: '1px solid #E8E4DC' }}><div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${f.color}15` }}><f.icon size={20} color={f.color} /></div><h4 className="font-serif text-lg font-medium mb-3" style={{ color: '#1C1A17' }}>{f.title}</h4><p className="font-sans text-sm leading-relaxed" style={{ color: '#4A4540' }}>{f.body}</p></div>))}</div></div></section>)
}

function CTGoldGallery() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.ctgold-img', { opacity: 0, scale: 0.95, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } }) }, ref); return () => ctx.revert() }, [])
  return (<section ref={ref} style={{ backgroundColor: '#F7F5F0' }} className="py-24"><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-10"><p className="mono-label mb-3">VISUAL TOUR</p><h3 className="section-heading">Architectural Impressions</h3></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><div className="ctgold-img rounded-xl overflow-hidden" style={{ border: '1px solid #E8E4DC' }}><img src="/images/ct-gold-hero.jpg" alt="CT Gold evening facade" className="w-full h-80 object-cover object-top" /><div className="p-4 bg-white"><p className="font-sans text-sm font-medium" style={{ color: '#1C1A17' }}>Evening Facade View</p><p className="font-sans text-xs mt-1" style={{ color: '#6B6560' }}>Glass curtain wall with signature gold framework and helical parking structure</p></div></div><div className="ctgold-img rounded-xl overflow-hidden flex flex-col justify-center items-center p-10" style={{ border: '1px solid #E8E4DC', backgroundColor: '#fff', minHeight: 320 }}><div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(198,93,140,0.15)' }}><Info size={28} color="#C45D8C" /></div><h4 className="font-serif text-xl font-medium mb-2" style={{ color: '#1C1A17' }}>100% Fully Sold</h4><p className="font-sans text-sm text-center max-w-[320px]" style={{ color: '#6B6560' }}>All units at CT Gold have been fully sold. For enquiries on similar upcoming industrial launches or resale opportunities, contact our team.</p></div></div></div></section>)
}

function CTGoldSpecs() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.ctgold-spec', { opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const specs = [
    { icon: Building2, title: 'Building Configuration', items: ['Multi-storey mixed-use tower', 'B1 / B2 industrial zoning', 'Ground floor commercial / F&B', 'Upper floor production / warehouse', 'Estimated 10+ storeys'] },
    { icon: ParkingCircle, title: 'Parking & Circulation', items: ['Helical ramp parking structure', 'Multi-level vehicle circulation', 'Space-efficient vertical parking', 'Dedicated loading zones'] },
    { icon: Zap, title: 'Infrastructure (TBC)', items: ['High-capacity electrical provision', 'EV charging point readiness', 'Smart building management systems', 'High-speed fibre connectivity'] },
    { icon: Store, title: 'Commercial Component', items: ['Cafe Gold flagship F&B', 'Showroom / display spaces', 'Ground floor retail frontage', 'Street-activated pedestrian realm'] },
    { icon: TreePine, title: 'Sustainability & Landscape', items: ['Landscaped pedestrian walkways', 'Mature tree buffers', 'Natural ventilation design', 'Energy-efficient glass facade'] },
    { icon: Star, title: 'Design Distinction', items: ['Gold-accented structural framework', 'Full-height glass curtain wall', 'Iconic helical parking form', 'Premium branded street presence'] },
  ]
  return (<section ref={ref} className="py-24" style={{ backgroundColor: '#fff' }}><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">SPECIFICATIONS</p><h3 className="section-heading">Project Details</h3><p className="font-sans text-sm mt-3" style={{ color: '#6B6560' }}>Full technical specifications to be confirmed. Dimension measurements subject to final survey.</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{specs.map((s, i) => (<div key={i} className="ctgold-spec rounded-xl p-6" style={{ border: '1px solid #E8E4DC' }}><div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(198,93,140,0.12)' }}><s.icon size={20} color="#C45D8C" /></div><h4 className="font-serif text-lg font-medium mb-3" style={{ color: '#1C1A17' }}>{s.title}</h4><ul className="space-y-2">{s.items.map((item, j) => (<li key={j} className="flex items-start gap-2"><CheckCircle size={14} color="#C45D8C" className="mt-0.5 flex-shrink-0" /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{item}</span></li>))}</ul></div>))}</div></div></section>)
}

function CTGoldDisclaimer() { return (<section className="py-12" style={{ backgroundColor: '#F7F5F0' }}><div className="max-w-[1128px] mx-auto px-6"><div className="rounded-xl p-6 flex items-start gap-4" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}><Info size={20} color="#4A3E3D" className="flex-shrink-0 mt-0.5" /><div><p className="font-sans text-sm font-medium mb-1" style={{ color: '#1C1A17' }}>Important Notice</p><p className="font-sans text-sm leading-relaxed" style={{ color: '#6B6560' }}>All information, dimensions, and specifications for CT Gold are based on preliminary architectural impressions and are subject to final survey and developer confirmation. Unit sizes, pricing, tenure details, and exact specifications will be announced closer to launch.</p></div></div></div></section>) }

/* ════════════════════════════════════════════════════════════════
   PROJECT 3 — GENERATIONS@TANNERY  (NEW)
   ════════════════════════════════════════════════════════════════ */

function GenerationsHero() { return (<section id="generations" className="relative w-full flex items-end overflow-hidden scroll-mt-20" style={{ height: '75vh', minHeight: 500, backgroundColor: '#1C1A17' }}>
  <img src="/images/generations-tannery-hero.png" alt="Generations at Tannery 12-storey freehold B1 industrial development" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 40%' }} />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(23,23,28,0.95) 0%, rgba(23,23,28,0.5) 40%, transparent 70%)' }} />
  <div className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-16">
    <span className="inline-block font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={{ backgroundColor: '#78B0B5', color: '#fff' }}>NEW LAUNCH — B1 Industrial</span>
    <h2 className="font-serif text-white font-semibold mb-2" style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-2px', lineHeight: 1.1 }}>Generations@Tannery</h2>
    <p className="font-sans text-xl mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>71 Tannery Lane, Singapore 347807</p>
    <p className="font-sans text-base mb-6 max-w-[600px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
      A 12-storey freehold B1 industrial development with 54 production units, 5 industrial canteens, and 51 parking lots (10 EV). A rare freehold on the city's fringe, well-connected to the rest of the island. Yours to grow in, yours to hold, and yours to pass down.
    </p>
    <div className="flex flex-wrap gap-6 mb-8">
      {[ { icon: Calendar, text: 'Freehold' }, { icon: Building2, text: '12 Storeys' }, { icon: Layers, text: '54 Units + 5 Canteens' }, { icon: Train, text: '6-min to Mattar MRT' }, ].map((s, i) => (<div key={i} className="flex items-center gap-2"><s.icon size={18} color="#78B0B5" /><span className="font-sans text-sm text-white">{s.text}</span></div>))}
    </div>
    <div className="flex flex-wrap gap-4">
      <a href="#enquiry" className="btn-bronze flex items-center gap-2"><Phone size={16} /> Enquire Now</a>
      <a href="#generations-details" className="btn-outline">View Details</a>
    </div>
  </div>
</section>) }

function GenerationsStats() {
  const stats = [{ label: 'Storeys', value: '12', unit: '' }, { label: 'Total Units', value: '54+5', unit: 'units' }, { label: 'Tenure', value: 'Freehold', unit: '' }, { label: 'Parking', value: '51', unit: 'lots (10 EV)' }]
  return (<section className="py-8" style={{ backgroundColor: '#1C1A17', borderTop: '1px solid rgba(255,255,255,0.1)' }}><div className="max-w-[1128px] mx-auto px-6"><div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">{stats.map((s, i) => (<div key={i}><span className="font-serif text-3xl lg:text-4xl font-semibold" style={{ color: '#78B0B5' }}>{s.value}</span><span className="font-sans text-sm ml-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.unit}</span><p className="font-mono text-xs uppercase mt-1" style={{ color: '#6B6560' }}>{s.label}</p></div>))}</div></div></section>)
}

function GenerationsOverview() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gen-overview > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  return (<section ref={ref} id="generations-details" style={{ backgroundColor: '#F7F5F0' }} className="py-20"><div className="max-w-[1128px] mx-auto px-6"><div className="gen-overview grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"><div>
    <p className="mono-label mb-3" style={{ color: '#78B0B5' }}>PROJECT OVERVIEW</p>
    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-6" style={{ color: '#1C1A17' }}>Freehold B1 Industrial in a Thriving Precinct</h3>
    <div className="font-sans text-base leading-relaxed space-y-4" style={{ color: '#4A4540' }}>
      <p>Generations@Tannery is a 12-storey B1 industrial development located at <strong>71 Tannery Lane, Singapore 347807</strong> in District 13. As a <strong>freehold</strong> (Estate in Fee Simple) property, it offers perpetual ownership — a rare and highly sought-after tenure in Singapore's industrial market. Designed by a team that believes in creating people-centric workspaces, every detail is considered to move beyond the utilitarian.</p>
      <p>The development features <strong>54 production units</strong> and <strong>5 industrial canteens</strong> across a 3,150.10 sqm site. All units are designed with generous floor-to-floor heights — from 4.100M to 6.125M depending on level. The development includes 51 parking lots (10 EV charging lots), 6 high-capacity KONE lifts, a 5-storey ramp-up for direct loading and unloading, and at least 1 attached toilet for every unit. Select units offer dual-key feasibility and private lift access for maximum flexibility.</p>
      <p>Situated on the city's fringe, Generations@Tannery is a quick 6-minute walk from <strong>Mattar MRT Station (DT25)</strong> on the Downtown Line. The location offers effortless connectivity to the CBD (13 mins), Orchard Road (11 mins), Changi Airport (24 mins), and Woodlands Checkpoint (30 mins) via PIE, CTE, and KPE.</p>
    </div>
  </div><div className="space-y-2">
    {[{ label: 'Project Name', value: 'Generations@Tannery' }, { label: 'Developer', value: 'Providence Estates (Tannery) Pte Ltd' }, { label: 'Address', value: '71 Tannery Lane, Singapore 347807' }, { label: 'District', value: 'District 13' }, { label: 'Project Type', value: 'Industrial B1' }, { label: 'Tenure', value: 'Freehold (Estate in Fee Simple)' }, { label: 'Site Area', value: '3,150.10 SQM' }, { label: 'Storeys', value: '12-Storey Industrial Development' }, { label: 'Total Units', value: '54 Production Units + 5 Industrial Canteens' }, { label: 'Parking', value: '51 Lots (10 EV Charging Lots)' }, { label: 'Lifts', value: '6 High-Capacity KONE Lifts' }, { label: 'MRT', value: '6-min walk to Mattar MRT (DT25)' }, { label: 'Vacant Possession', value: '31 December 2030' }, { label: 'Legal Completion', value: '31 December 2033' }].map((item, i) => (
      <div key={i} className="flex justify-between items-center py-3 px-4 rounded-lg" style={{ backgroundColor: i % 2 === 0 ? '#fff' : 'transparent' }}><span className="font-sans text-sm" style={{ color: '#6B6560' }}>{item.label}</span><span className="font-sans text-sm font-medium text-right" style={{ color: '#1C1A17', maxWidth: '60%' }}>{item.value}</span></div>
    ))}
  </div></div></div></section>)
}

function GenerationsUnits() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gen-unit-card', { opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const unitTypes = [
    { name: 'Industrial Canteens (Level 1)', count: '5 units', levels: 'Ground Floor', height: '6.125M FTF', desc: 'Ground floor industrial canteens in various sizes, curated to support diverse dining concepts. From intimate cafés to contemporary eateries, these spaces foster a lively communal atmosphere where occupants and the wider community can gather, recharge and connect.', color: '#78B0B5' },
    { name: 'Production Units (Levels 1-4)', count: '18 premium units', levels: 'Levels 1 to 4', height: '6.125M FTF', desc: 'Lower-floor production units with direct parking access via the 5-storey ramp. Premium units enjoy direct loading and unloading. Ideal for light manufacturing, precision engineering, R&D, creative studios, showrooms, and businesses requiring frequent vehicular access.', color: '#4A3E3D' },
    { name: 'Production Units (Level 5)', count: '14 dual-key feasible', levels: 'Level 5', height: '4.375M FTF', desc: 'Mid-floor production units with dual-key feasibility — dividing a single unit into two fully independent businesses, each with its own entrance, identity, and room to grow. Opening up twice the opportunity within a single investment.', color: '#C45D8C' },
    { name: 'Production Units (Levels 6-9)', count: 'TBC', levels: 'Levels 6 to 9', height: '4.200M FTF', desc: 'Upper-floor production units with 4.200M floor-to-floor height. Connected to 6 high-capacity KONE lifts including service lifts. Suitable for software development, call centres, co-working spaces, e-commerce fulfilment, media production, and data centres.', color: '#6390B5' },
    { name: 'Production Units (Levels 10-12)', count: '3 private lift units', levels: 'Levels 10 to 12', height: '4.100M - 4.725M FTF', desc: 'Top-floor premium production units with the highest ceilings (4.725M on Level 10). Three exclusive units on Levels 6-8 come with private lift access for added prestige and privacy. Ideal for businesses seeking a distinguished address.', color: '#5DC489' },
  ]
  return (<section ref={ref} className="py-24" style={{ backgroundColor: '#fff' }}><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">54 PRODUCTION UNITS + 5 INDUSTRIAL CANTEENS</p><h3 className="section-heading">Unit Types & Configurations</h3><p className="font-sans text-base mt-4 mx-auto" style={{ color: '#4A4540', maxWidth: 600 }}>Freehold units with flexible floor-to-floor heights and robust electrical infrastructure for diverse industrial needs.</p></div><div className="space-y-6">{unitTypes.map((u, i) => (<div key={i} className="gen-unit-card rounded-xl p-8" style={{ border: '1px solid #E8E4DC' }}><div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div><div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: u.color }} /><h4 className="font-serif text-2xl font-medium mb-1" style={{ color: '#1C1A17' }}>{u.name}</h4><p className="font-mono text-xs mb-3" style={{ color: '#6B6560' }}>{u.count} | {u.levels}</p><div className="flex items-center gap-2 mb-2"><ArrowUp size={14} color={u.color} /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>Ceiling: {u.height}</span></div><p className="font-sans text-sm leading-relaxed" style={{ color: '#6B6560' }}>{u.desc}</p></div><div className="lg:col-span-2"><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{[
      { label: 'Floor Loading', value: u.levels.includes('L10') ? '5.0 kN/m² (L10) / 7.5 kN/m² (others)' : u.levels === 'Ground Floor' ? '7.5 kN/m²' : u.levels === 'Level 12' ? '7.5 kN/m²' : '7.5 kN/m²' },
      { label: 'Electrical', value: u.levels === 'Ground Floor' ? '200A 3-phase' : u.levels.includes('6') || u.levels.includes('12') ? '63A or 100A 3-phase (>100m²)' : '63A or 100A 3-phase (>100m²)' },
      { label: 'Lift Access', value: '5x Passenger + 2x Service' },
      { label: 'Ramp Access', value: u.levels.includes('6') || u.levels.includes('12') ? 'No direct ramp' : 'Connected to ramp' },
    ].map((spec, j) => (<div key={j} className="bg-white rounded-lg p-3" style={{ border: '1px solid #E8E4DC' }}><p className="font-sans text-xs" style={{ color: '#6B6560' }}>{spec.label}</p><p className="font-sans text-sm font-medium mt-1" style={{ color: '#1C1A17' }}>{spec.value}</p></div>))}</div></div></div></div>))}</div></div></section>)
}

function GenerationsSpecs() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gen-spec-card', { opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const specs = [
    { icon: ArrowUp, title: 'Floor-to-Floor Heights', items: ['1st Storey: 6.125M', '2nd Storey: 6.125M', '3rd Storey: 6.125M', '4th Storey: 6.125M', '5th Storey: 4.375M', '6th-9th Storey: 4.200M', '10th Storey: 4.725M', '11th Storey: 4.200M', '12th Storey: 4.100M'] },
    { icon: Layers, title: 'Functional Specifications', items: ['51 Parking lots including 10 EV lots', '5-Storey Ramp-up for direct loading/unloading', '18 Premium units with direct parking access', 'At least 1 attached toilet for every unit', '3 Exclusive units with private lift access', 'Generous 4-metre wide lift landing', '14 units with dual-key feasibility', '6 High-capacity KONE lifts', 'Flexible unit layouts'] },
    { icon: Zap, title: 'Electrical & Infrastructure', items: ['Canteen Units: 200A Three-Phase', 'Production Units: 63A-100A Three-Phase', 'At least 1 attached toilet per unit', 'Flexible layouts for diverse business needs', 'Suitable for light manufacturing & food ops'] },
    { icon: TreePine, title: 'Sustainability Features', items: ['Solar Panels for renewable energy', 'EV Charging Lots (10 lots)', 'Bicycle Racks for green commuting', 'Motion Sensor Lightings', 'Water Saving Fittings', 'Recycling Facilities'] },
    { icon: ParkingCircle, title: 'Parking Facilities', items: ['Car Lots: 51 nos', 'EV Charging Lots: 10 nos', '5-Storey Ramp-up access', 'Loading/Unloading bays', 'Bicycle Lots available'] },
    { icon: Train, title: 'Connectivity', items: ['Mattar MRT (DT25): 6-min walk', 'PIE: 7-min drive', 'CTE: 7-min drive', 'KPE: 10-min drive', 'CBD: 13 mins', 'Orchard Road: 11 mins', 'Changi Airport: 24 mins'] },
  ]
  return (<section ref={ref} style={{ backgroundColor: '#F7F5F0' }} className="py-24"><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">TECHNICAL SPECIFICATIONS</p><h3 className="section-heading">Built for Generations</h3></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{specs.map((s, i) => (<div key={i} className="gen-spec-card bg-white rounded-xl p-6" style={{ border: '1px solid #E8E4DC' }}><div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(120,176,181,0.15)' }}><s.icon size={20} color="#78B0B5" /></div><h4 className="font-serif text-lg font-medium mb-3" style={{ color: '#1C1A17' }}>{s.title}</h4><ul className="space-y-2">{s.items.map((item, j) => (<li key={j} className="flex items-start gap-2"><CheckCircle size={14} color="#5DC489" className="mt-0.5 flex-shrink-0" /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{item}</span></li>))}</ul></div>))}</div></div></section>)
}

function GenerationsLocation() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gen-loc > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  return (<section ref={ref} className="py-24" style={{ backgroundColor: '#fff' }}><div className="max-w-[1128px] mx-auto px-6"><div className="gen-loc grid grid-cols-1 lg:grid-cols-2 gap-12"><div>
    <p className="mono-label mb-3" style={{ color: '#78B0B5' }}>LOCATION</p>
    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-6" style={{ color: '#1C1A17' }}>A Convenient Commute on Foot</h3>
    <p className="font-sans text-base leading-relaxed mb-8" style={{ color: '#4A4540' }}>Generations@Tannery sits at <strong>71 Tannery Lane, Singapore 347807</strong> on the city's fringe in District 13. It is a quick 6-minute walk from Mattar MRT on the Downtown Line (DTL) — perfect for users who prefer to go car-lite. Stay effortlessly connected to everything that matters via the PIE and CTE.</p>
    <div className="space-y-6">
      <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(120,176,181,0.15)' }}><Train size={18} color="#78B0B5" /></div><div><h4 className="font-sans text-sm font-semibold mb-1" style={{ color: '#1C1A17' }}>MRT Connectivity</h4><p className="font-sans text-sm" style={{ color: '#6B6560' }}>Mattar MRT (DT25): 6-min walk</p><p className="font-sans text-sm" style={{ color: '#6B6560' }}>MacPherson Interchange (CC10/DT26): nearby</p></div></div>
      <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(120,176,181,0.15)' }}><MapPin size={18} color="#78B0B5" /></div><div><h4 className="font-sans text-sm font-semibold mb-1" style={{ color: '#1C1A17' }}>Key Distances</h4><p className="font-sans text-sm" style={{ color: '#6B6560' }}>Orchard Road: 11 mins | CBD: 13 mins</p><p className="font-sans text-sm" style={{ color: '#6B6560' }}>Changi Airport: 24 mins | Woodlands Checkpoint: 30 mins</p></div></div>
    </div>
  </div><div>
    <p className="mono-label mb-3" style={{ color: '#78B0B5' }}>PARKING & ACCESS</p>
    <h4 className="font-serif text-2xl font-medium mb-6" style={{ color: '#1C1A17' }}>Comprehensive Vehicular Facilities</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {['51 Car Lots (10 EV Charging)', '5-Storey Ramp-up Access', '18 Premium Units with Direct Parking', '3 Private Lift Access Units', '14 Dual-Key Feasible Units', '6 High-Capacity KONE Lifts', '4-Metre Wide Lift Landing', '1 Attached Toilet Per Unit', 'Flexible Unit Layouts'].map((a, i) => (
        <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-4" style={{ border: '1px solid #E8E4DC' }}><ParkingCircle size={16} color="#78B0B5" /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{a}</span></div>
      ))}
    </div>
  </div></div></div></section>)
}

/* ════════════════════════════════════════════════════════════════
   PROJECT 4 — GOURMET XCHANGE (GXC) @ 1 Kallang Way  (NEW)
   ════════════════════════════════════════════════════════════════ */

function GXCHero() { return (<section id="gxc" className="relative w-full flex items-end overflow-hidden scroll-mt-20" style={{ height: '75vh', minHeight: 500, backgroundColor: '#1C1A17' }}>
  <img src="/images/gourmet-xchange-hero.jpg" alt="Gourmet Xchange at Kallang Way riverfront food hub with heritage terrace block" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(23,23,28,0.95) 0%, rgba(23,23,28,0.5) 40%, transparent 70%)' }} />
  <div className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-16">
    <span className="inline-block font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={{ backgroundColor: '#5DC489', color: '#fff' }}>NEW LAUNCH — B2 Food Hub</span>
    <h2 className="font-serif text-white font-semibold mb-2" style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-2px', lineHeight: 1.1 }}>Gourmet Xchange</h2>
    <p className="font-sans text-xl mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>@ 1 Kallang Way</p>
    <p className="font-sans text-base mb-6 max-w-[600px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
      Singapore's largest strata-titled food hub — 272 units across a 9-storey main block and 3-storey heritage terrace, set along the Kallang River with Green Mark Platinum SLE certification.
    </p>
    <div className="flex flex-wrap gap-6 mb-8">
      {[ { icon: Utensils, text: '272 Food Units' }, { icon: Waves, text: 'Kallang Riverfront' }, { icon: Store, text: 'Heritage + Modern' }, { icon: TreePine, text: 'Green Mark Platinum' }, ].map((s, i) => (<div key={i} className="flex items-center gap-2"><s.icon size={18} color="#5DC489" /><span className="font-sans text-sm text-white">{s.text}</span></div>))}
    </div>
    <div className="flex flex-wrap gap-4">
      <a href="#enquiry" className="btn-bronze flex items-center gap-2"><Phone size={16} /> Enquire Now</a>
      <a href="#gxc-details" className="btn-outline">View Details</a>
    </div>
  </div>
</section>) }

function GXCStats() {
  const stats = [{ label: 'Total Units', value: '272', unit: 'units' }, { label: 'Main Block', value: '9', unit: 'storeys' }, { label: 'Heritage', value: '8', unit: 'terraces' }, { label: 'Driveway', value: '16m', unit: 'wide' }]
  return (<section className="py-8" style={{ backgroundColor: '#1C1A17', borderTop: '1px solid rgba(255,255,255,0.1)' }}><div className="max-w-[1128px] mx-auto px-6"><div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">{stats.map((s, i) => (<div key={i}><span className="font-serif text-3xl lg:text-4xl font-semibold" style={{ color: '#5DC489' }}>{s.value}</span><span className="font-sans text-sm ml-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.unit}</span><p className="font-mono text-xs uppercase mt-1" style={{ color: '#6B6560' }}>{s.label}</p></div>))}</div></div></section>)
}

function GXCOverview() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gxc-overview > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  return (<section ref={ref} id="gxc-details" style={{ backgroundColor: '#F7F5F0' }} className="py-20"><div className="max-w-[1128px] mx-auto px-6"><div className="gxc-overview grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"><div>
    <p className="mono-label mb-3" style={{ color: '#5DC489' }}>PROJECT OVERVIEW</p>
    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-6" style={{ color: '#1C1A17' }}>Built for Food. Integrated for Success.</h3>
    <div className="font-sans text-base leading-relaxed space-y-4" style={{ color: '#4A4540' }}>
      <p>Gourmet Xchange (GXC) at <strong>1 Kallang Way</strong> is Singapore's largest strata-titled food hub, designed from the ground up for food businesses. The development seamlessly combines a modern 9-storey main production block with a heritage 3-storey terraced block, creating a vibrant ecosystem for food manufacturing, innovation, and dining.</p>
      <p>The project is developed by <strong>CL Savour Property Pte Ltd</strong> and has achieved <strong>Green Mark Platinum SLE</strong> certification with Whole Life Carbon and Maintainability Badge. Features include solar panels, water-efficient fittings (PUB WELS 3-tick), LED lighting with over 60% energy savings, and adaptive reuse of heritage structures — all reflecting a deep commitment to sustainability.</p>
      <p>Set along the scenic <strong>Kallang River</strong>, GXC offers a rare combination of industrial functionality and natural beauty. The river promenade, sky garden, central plaza, and rooftop gardens create an environment where businesses and people thrive together.</p>
    </div>
  </div><div className="space-y-2">
    {[{ label: 'Project Name', value: 'Gourmet Xchange (GXC)' }, { label: 'Address', value: '1 Kallang Way' }, { label: 'Developer', value: 'CL Savour Property Pte Ltd' }, { label: 'Project Type', value: 'B2 (Food) / B1 (Food) / Restaurants & F&B' }, { label: 'Main Block', value: '9-Storey Modern Block — 264 Units' }, { label: 'Heritage Block', value: '3-Storey Terrace — 8 Units' }, { label: 'Total Units', value: '272 Modern + Heritage Units' }, { label: 'Certification', value: 'Green Mark Platinum SLE + Maintainability Badge' }, { label: 'Sustainability', value: 'Solar Panels, Water-Efficient Fittings, LED Lighting, SGBP 2-Tick Materials' }, { label: 'Frontage', value: 'Kallang River Promenade' }, { label: 'Zone', value: 'Prime Food Zone — Central Region' }].map((item, i) => (
      <div key={i} className="flex justify-between items-center py-3 px-4 rounded-lg" style={{ backgroundColor: i % 2 === 0 ? '#fff' : 'transparent' }}><span className="font-sans text-sm" style={{ color: '#6B6560' }}>{item.label}</span><span className="font-sans text-sm font-medium text-right" style={{ color: '#1C1A17', maxWidth: '60%' }}>{item.value}</span></div>
    ))}
  </div></div></div></section>)
}

function GXCUnitTypes() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gxc-unit-card', { opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const units = [
    { name: 'Type B — B2 (Food) Standard', tag: 'Main Block', height: '7m (L1-L3) / 5.5m (L4-L9)', size: 'Up to 393 sqm (~4,230 sqft)', desc: 'Standard production units in the 9-storey main block, suitable for central kitchens, food manufacturing, bakery operations, confectionery, beverage bottling, and cloud kitchens. Ramp-up access for 40ft containers on L1-L3, 24ft rigid-frame trucks on L4-L9.', color: '#5DC489' },
    { name: 'Type C — B2 (Food) Deluxe', tag: 'Main Block', height: '7m (L1-L3) / 5.5m (L4-L9)', size: 'Up to 758 sqm (~8,160 sqft)', desc: 'Deluxe production units with mezzanine office space, en-suite washroom, dedicated kitchen exhaust shafts, sunken floor for drainage, and segregated entry for raw and finished goods. Dual roller shutters for efficient logistics flow.', color: '#4A3E3D' },
    { name: 'Type A — Restaurant / B1 (Food) Terrace', tag: 'Heritage Block', height: '3 Storeys', size: '179-224 sqm (1st storey) / 419-529 sqm (2nd storey)', desc: 'Heritage terraced units with distinctive shophouse character. Ground floor restaurant frontage with upper floor B1 food production. Adaptive reuse of heritage structures with modern infrastructure. Perfect for flagship F&B concepts with production backend.', color: '#C45D8C' },
  ]
  return (<section ref={ref} className="py-24" style={{ backgroundColor: '#fff' }}><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">264 MODERN + 8 HERITAGE UNITS</p><h3 className="section-heading">Unit Types for Every Food Business</h3><p className="font-sans text-base mt-4 mx-auto" style={{ color: '#4A4540', maxWidth: 600 }}>From compact cloud kitchens to expansive deluxe production floors with mezzanine offices — GXC accommodates every scale of food operation.</p></div><div className="space-y-8">{units.map((u, i) => (<div key={i} className="gxc-unit-card rounded-xl p-8" style={{ border: '1px solid #E8E4DC' }}><div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div><div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: u.color }} /><h4 className="font-serif text-2xl font-medium mb-1" style={{ color: '#1C1A17' }}>{u.name}</h4><p className="font-mono text-xs mb-3" style={{ color: '#6B6560' }}>{u.tag}</p><div className="flex items-center gap-2 mb-2"><Ruler size={14} color={u.color} /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{u.size}</span></div><div className="flex items-center gap-2 mb-2"><ArrowUp size={14} color={u.color} /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>Height: {u.height}</span></div></div><div className="lg:col-span-2"><p className="font-sans text-sm leading-relaxed mb-4" style={{ color: '#4A4540' }}>{u.desc}</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{[
      { label: 'Container Access', value: i === 2 ? 'Street-level loading' : '40ft (L1-L3) / 24ft (L4-L9)' },
      { label: 'Power', value: i === 2 ? 'Restaurant-grade supply' : 'High-capacity 3-phase' },
      { label: 'Exhaust', value: i === 2 ? 'Dedicated ducting' : 'Dedicated kitchen exhaust shafts' },
      { label: 'Features', value: i === 0 ? 'Standard layout' : i === 1 ? 'Mezzanine + en-suite + dual shutters' : 'Heritage facade + modern fit-out' },
    ].map((spec, j) => (<div key={j} className="bg-white rounded-lg p-3" style={{ border: '1px solid #E8E4DC' }}><p className="font-sans text-xs" style={{ color: '#6B6560' }}>{spec.label}</p><p className="font-sans text-sm font-medium mt-1" style={{ color: '#1C1A17' }}>{spec.value}</p></div>))}</div></div></div></div>))}</div></div></section>)
}

function GXCFeatures() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gxc-feature', { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const features = [
    { icon: Waves, title: 'Kallang Riverfront', body: 'Unique riverfront setting along the Kallang River with a dedicated promenade. Tenants and visitors enjoy waterfront views, breezy outdoor spaces, and direct access to nature — a rare amenity for an industrial development.', color: '#78B0B5' },
    { icon: TreePine, title: 'Sky Garden & Rooftop Gardens', body: 'Lush sky garden at Level 3 and rooftop gardens across the building provide green respite spaces for workers. These biophilic design elements reduce stress, improve air quality, and create a sense of well-being.', color: '#5DC489' },
    { icon: Utensils, title: 'Food-First Infrastructure', body: 'Purpose-built for food operations with dedicated kitchen exhaust shafts, sunken floors for drainage, segregated raw/finished goods entry in deluxe units, and heavy-duty power supply. Every detail is designed with food safety and operational efficiency in mind.', color: '#4A3E3D' },
    { icon: Building2, title: 'Heritage Adaptive Reuse', body: 'The 8 heritage terraced units retain distinctive architectural character while being fully modernised with contemporary infrastructure. This creative preservation adds cultural value and creates unique dining destinations.', color: '#C45D8C' },
    { icon: Zap, title: 'Green & Smart Building', body: 'Green Mark Platinum SLE with solar panels, water-efficient fittings (PUB WELS 3-tick), LED lighting (>60% energy savings), and SGBP 2-tick certified materials. Smart building systems optimise energy use and operational costs.', color: '#6390B5' },
    { icon: Truck, title: 'Superior Logistics Design', body: '16m wide driveway, ramp-up access throughout, rooftop heavy vehicle parking across all 9 storeys, dedicated 40ft unloading bays on L2-L3, and 24ft unloading bays in every production unit. Logistics efficiency is built into every level.', color: '#8E69B6' },
  ]
  return (<section ref={ref} style={{ backgroundColor: '#F7F5F0' }} className="py-24"><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">DESIGN HIGHLIGHTS</p><h3 className="section-heading">A Food Hub Like No Other</h3></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{features.map((f, i) => (<div key={i} className="gxc-feature rounded-xl p-6" style={{ border: '1px solid #E8E4DC', backgroundColor: '#fff' }}><div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${f.color}15` }}><f.icon size={20} color={f.color} /></div><h4 className="font-serif text-lg font-medium mb-3" style={{ color: '#1C1A17' }}>{f.title}</h4><p className="font-sans text-sm leading-relaxed" style={{ color: '#4A4540' }}>{f.body}</p></div>))}</div></div></section>)
}

function GXCSpecs() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gxc-spec-card', { opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const specs = [
    { icon: ArrowUp, title: 'Ceiling Heights', items: ['Levels 1-3: 7.0 metres', 'Levels 4-9: 5.5 metres', 'Heritage Block: 3 storeys (varied)'] },
    { icon: Truck, title: 'Container & Truck Access', items: ['40ft container truck: Storeys 1-3', '24ft rigid-frame truck: Storeys 4-9', 'Common 40ft loading/unloading bays: L2-L3', 'Dedicated 24ft unloading bays in ALL units', 'Driveway width: 16 metres'] },
    { icon: ParkingCircle, title: 'Parking Facilities', items: ['Rooftop heavy vehicle parking: Storeys 1-9', 'Car parking on upper levels', 'Dedicated visitor parking'] },
    { icon: Zap, title: 'Sustainability Features', items: ['Solar panels on roof', 'Water-efficient fittings (PUB WELS 3-tick)', 'LED lighting (>60% energy savings)', 'SGBP 2-tick certified materials (>80%)', 'Green Mark Platinum SLE certification', 'Whole Life Carbon & Maintainability Badge'] },
    { icon: Store, title: 'F&B & Retail Spaces', items: ['Industrial canteen within development', 'Riverfront restaurants', 'Food kiosks', 'Terraces and cafes', 'Heritage block restaurant frontage'] },
    { icon: MapPin, title: 'Connectivity', items: ['Mattar MRT: 10 min walk', 'Geylang Bahru MRT: 13 min walk', 'MacPherson Interchange: 1 stop away', 'PIE: 5 min, CTE: 6 min, KPE: 7 min', 'CBD: 10 min, Orchard: 14 min', 'Changi Airport: 18 min'] },
  ]
  return (<section ref={ref} className="py-24" style={{ backgroundColor: '#fff' }}><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">TECHNICAL SPECIFICATIONS</p><h3 className="section-heading">Engineered for Food Excellence</h3></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{specs.map((s, i) => (<div key={i} className="gxc-spec-card rounded-xl p-6" style={{ border: '1px solid #E8E4DC' }}><div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(93,196,137,0.12)' }}><s.icon size={20} color="#5DC489" /></div><h4 className="font-serif text-lg font-medium mb-3" style={{ color: '#1C1A17' }}>{s.title}</h4><ul className="space-y-2">{s.items.map((item, j) => (<li key={j} className="flex items-start gap-2"><CheckCircle size={14} color="#5DC489" className="mt-0.5 flex-shrink-0" /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{item}</span></li>))}</ul></div>))}</div></div></section>)
}

function GXCBusinessFit() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gxc-fit-card', { opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const categories = [
    { title: 'Food Manufacturing', items: ['Central kitchens', 'Food manufacturing', 'Bakery & confectionery', 'Beverage bottling', 'Ready-meal production'], color: '#5DC489' },
    { title: 'Food Service & Retail', items: ['Cloud kitchens', 'Food kiosks', 'Restaurant frontage', 'Cafes & terraces', 'Catering operations'], color: '#4A3E3D' },
    { title: 'Distribution & Innovation', items: ['Cold chain logistics', 'Food distribution', 'Retail + B2B hybrid', 'Food innovation R&D', 'E-commerce fulfilment'], color: '#78B0B5' },
  ]
  return (<section ref={ref} style={{ backgroundColor: '#F7F5F0' }} className="py-24"><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">BUSINESS SUITABILITY</p><h3 className="section-heading">Perfect For Your Food Business</h3><p className="font-sans text-base mt-4 mx-auto" style={{ color: '#4A4540', maxWidth: 600 }}>Whether you're a startup cloud kitchen or an established food manufacturer, GXC has a space designed for your operations.</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{categories.map((c, i) => (<div key={i} className="gxc-fit-card rounded-xl p-6" style={{ border: '1px solid #E8E4DC', backgroundColor: '#fff' }}><div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${c.color}15` }}><ForkKnife size={20} color={c.color} /></div><h4 className="font-serif text-xl font-medium mb-4" style={{ color: '#1C1A17' }}>{c.title}</h4><ul className="space-y-3">{c.items.map((item, j) => (<li key={j} className="flex items-center gap-2"><CheckCircle size={14} color={c.color} className="flex-shrink-0" /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{item}</span></li>))}</ul></div>))}</div></div></section>)
}

function GXCConnectivity() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.gxc-conn > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  return (<section ref={ref} className="py-24" style={{ backgroundColor: '#fff' }}><div className="max-w-[1128px] mx-auto px-6"><div className="gxc-conn grid grid-cols-1 lg:grid-cols-2 gap-12"><div>
    <p className="mono-label mb-3" style={{ color: '#5DC489' }}>CONNECTIVITY</p>
    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-6" style={{ color: '#1C1A17' }}>In the Heart of Singapore's Food Ecosystem</h3>
    <p className="font-sans text-base leading-relaxed mb-8" style={{ color: '#4A4540' }}>Gourmet Xchange sits in a prime food zone within the Central Region, surrounded by established food hubs, distribution networks, and major transport corridors. The Kallang River location adds recreational value while keeping businesses connected to Singapore's key economic zones.</p>
    <div className="space-y-6">
      <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(93,196,137,0.12)' }}><Train size={18} color="#5DC489" /></div><div><h4 className="font-sans text-sm font-semibold mb-1" style={{ color: '#1C1A17' }}>MRT Stations</h4><p className="font-sans text-sm" style={{ color: '#6B6560' }}>Mattar MRT: 10 min walk | Geylang Bahru: 13 min walk</p><p className="font-sans text-sm" style={{ color: '#6B6560' }}>MacPherson Interchange: 1 stop away</p></div></div>
      <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(93,196,137,0.12)' }}><MapPin size={18} color="#5DC489" /></div><div><h4 className="font-sans text-sm font-semibold mb-1" style={{ color: '#1C1A17' }}>Expressways</h4><p className="font-sans text-sm" style={{ color: '#6B6560' }}>PIE: 5 min | CTE: 6 min | KPE: 7 min | ECP: 11 min</p></div></div>
      <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(93,196,137,0.12)' }}><Store size={18} color="#5DC489" /></div><div><h4 className="font-sans text-sm font-semibold mb-1" style={{ color: '#1C1A17' }}>Key Destinations</h4><p className="font-sans text-sm" style={{ color: '#6B6560' }}>CBD: 10 min | Orchard: 14 min | Changi Airport: 18 min</p><p className="font-sans text-sm" style={{ color: '#6B6560' }}>Tuas Mega Port: 45 min</p></div></div>
    </div>
  </div><div>
    <p className="mono-label mb-3" style={{ color: '#5DC489' }}>SURROUNDING FOOD HUBS</p>
    <h4 className="font-serif text-2xl font-medium mb-6" style={{ color: '#1C1A17' }}>Part of a Thriving Food Network</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[{ name: 'Tai Seng', time: '6 min' }, { name: 'MacPherson', time: '5 min' }, { name: 'Kaki Bukit', time: '11 min' }, { name: 'Ubi', time: '7 min' }, { name: 'Bedok', time: '17 min' }, { name: 'Paya Lebar', time: '10 min' }, { name: 'Jalan Besar', time: '8 min' }, { name: 'Lavender', time: '6 min' }].map((hub, i) => (
        <div key={i} className="flex items-center justify-between bg-white rounded-lg p-4" style={{ border: '1px solid #E8E4DC' }}><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{hub.name}</span><span className="font-sans text-xs font-medium px-2 py-1 rounded" style={{ backgroundColor: 'rgba(93,196,137,0.12)', color: '#1C1A17' }}>{hub.time}</span></div>
      ))}
    </div>
  </div></div></div></section>)
}

/* ════════════════════════════════════════════════════════════════
   PROJECT 5 — SPACE@18  (NEW)
   ════════════════════════════════════════════════════════════════ */

function Space18Hero() { return (<section id="space18" className="relative w-full flex items-end overflow-hidden scroll-mt-20" style={{ height: '75vh', minHeight: 500, backgroundColor: '#1C1A17' }}>
  <img src="/images/space-18-hero.jpg" alt="SPACE@18 at 18 Lorong Ampas 6-storey freehold B1 clean industrial glass facade" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(23,23,28,0.95) 0%, rgba(23,23,28,0.5) 40%, transparent 70%)' }} />
  <div className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-16">
    <span className="inline-block font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={{ backgroundColor: '#8E69B6', color: '#fff' }}>NEW LAUNCH — B1 Freehold</span>
    <h2 className="font-serif text-white font-semibold mb-2" style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-2px', lineHeight: 1.1 }}>SPACE@18</h2>
    <p className="font-sans text-xl mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>18 Lorong Ampas, Singapore 328779</p>
    <p className="font-sans text-base mb-6 max-w-[600px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
      A 6-storey freehold B1 clean industrial development with 46 strata units and 1 canteen, featuring full-height glass wall facades, premium specifications, and generous ceiling heights up to 7.0m on Level 1.
    </p>
    <div className="flex flex-wrap gap-6 mb-8">
      {[ { icon: Calendar, text: 'Freehold' }, { icon: Building2, text: '6 Storeys' }, { icon: Layers, text: '46 Units + 1 Canteen' }, { icon: ArrowUp, text: '7.0m Ceiling (L1)' }, ].map((s, i) => (<div key={i} className="flex items-center gap-2"><s.icon size={18} color="#8E69B6" /><span className="font-sans text-sm text-white">{s.text}</span></div>))}
    </div>
    <div className="flex flex-wrap gap-4">
      <a href="#enquiry" className="btn-bronze flex items-center gap-2"><Phone size={16} /> Enquire Now</a>
      <a href="#space18-details" className="btn-outline">View Details</a>
    </div>
  </div>
</section>) }

function Space18Stats() {
  const stats = [{ label: 'Storeys', value: '6', unit: '' }, { label: 'Total Units', value: '46+1', unit: 'units' }, { label: 'Tenure', value: 'Freehold', unit: '' }, { label: 'Ceiling (L1)', value: '7.0m', unit: '' }]
  return (<section className="py-8" style={{ backgroundColor: '#1C1A17', borderTop: '1px solid rgba(255,255,255,0.1)' }}><div className="max-w-[1128px] mx-auto px-6"><div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">{stats.map((s, i) => (<div key={i}><span className="font-serif text-3xl lg:text-4xl font-semibold" style={{ color: '#8E69B6' }}>{s.value}</span><span className="font-sans text-sm ml-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.unit}</span><p className="font-mono text-xs uppercase mt-1" style={{ color: '#6B6560' }}>{s.label}</p></div>))}</div></div></section>)
}

function Space18Overview() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.s18-overview > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  return (<section ref={ref} id="space18-details" style={{ backgroundColor: '#F7F5F0' }} className="py-20"><div className="max-w-[1128px] mx-auto px-6"><div className="s18-overview grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"><div>
    <p className="mono-label mb-3" style={{ color: '#8E69B6' }}>PROJECT OVERVIEW</p>
    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-6" style={{ color: '#1C1A17' }}>Freehold B1 Clean Industrial with Glass Wall Facade</h3>
    <div className="font-sans text-base leading-relaxed space-y-4" style={{ color: '#4A4540' }}>
      <p>SPACE@18 is a 6-storey B1 clean industrial development located at <strong>18 Lorong Ampas, Singapore 328779</strong> in District 12. As a <strong>freehold</strong> property, it offers perpetual ownership — an increasingly rare opportunity in Singapore's industrial market.</p>
      <p>The development features <strong>46 strata units</strong> and <strong>1 industrial canteen</strong>, all designed with full-height glass wall facades that maximise natural light and create a premium corporate image. With generous floor-to-floor heights of 7.0m on Level 1 and 6.3m on Levels 2-6, the building accommodates diverse industrial activities from production to R&D.</p>
      <p>Strategically located in the Balestier/Whampoa precinct, SPACE@18 offers excellent connectivity via major expressways and proximity to Novena and Toa Payoh MRT stations. The development is designed to merge multi-units for larger floor plates, providing maximum flexibility for growing businesses.</p>
    </div>
  </div><div className="space-y-2">
    {[{ label: 'Project Name', value: 'SPACE@18' }, { label: 'Developer', value: 'JVA Whampoa Pte Ltd' }, { label: 'Address', value: '18 Lorong Ampas, Singapore 328779' }, { label: 'District', value: 'District 12 (Balestier / Whampoa)' }, { label: 'Project Type', value: 'B1 Clean Industrial' }, { label: 'Tenure', value: 'Freehold' }, { label: 'Site Area', value: 'Approx. 1,500 sqm' }, { label: 'Storeys', value: '6-Storey' }, { label: 'Total Units', value: '46 Strata Units + 1 Canteen' }, { label: 'Ceiling Height', value: 'L1: 7.0m | L2-L6: 6.3m' }, { label: 'Floor Loading', value: '7.5 kN/m²' }, { label: 'Lifts', value: '3 (2 Passenger/Fire + 1 Service)' }, { label: 'Loading Bays', value: '3 (at 1st Storey)' }, { label: 'Est. TOP', value: '31 December 2026' }, { label: 'Est. Legal Completion', value: '31 December 2029' }].map((item, i) => (
      <div key={i} className="flex justify-between items-center py-3 px-4 rounded-lg" style={{ backgroundColor: i % 2 === 0 ? '#fff' : 'transparent' }}><span className="font-sans text-sm" style={{ color: '#6B6560' }}>{item.label}</span><span className="font-sans text-sm font-medium text-right" style={{ color: '#1C1A17', maxWidth: '60%' }}>{item.value}</span></div>
    ))}
  </div></div></div></section>)
}

function Space18Specs() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.s18-spec-card', { opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const specs = [
    { icon: ArrowUp, title: 'Ceiling Heights', items: ['Level 1: 7.0 metres', 'Levels 2-6: 6.3 metres', 'Highest ceilings in its district'] },
    { icon: Gauge, title: 'Floor Loading', items: ['Production Units: 7.5 kN/m²', 'Suitable for light manufacturing', 'R&D, clean room, automation'] },
    { icon: Zap, title: 'Electrical Provision', items: ['Standard Units: 60A / 3-phase', 'Canteen: 200A / 3-phase', 'Isolator provision for all units'] },
    { icon: Layers, title: 'Lift Provision (3 Lifts)', items: ['2x Passenger / Fire Lift', '1x Service Lift', 'High-capacity for goods transport'] },
    { icon: ParkingCircle, title: 'Parking Facilities', items: ['Car Lots: 25 nos', 'Accessible Lots: 1 no', 'Motorcycle Lots: 2 nos', 'Bicycle Lots: 28 nos', 'Sheltered carpark'] },
    { icon: Truck, title: 'Loading & Access', items: ['3 Loading bays at 1st storey', 'Multi-unit merging capability', 'Direct loading for ground floor units'] },
  ]
  return (<section ref={ref} style={{ backgroundColor: '#F7F5F0' }} className="py-24"><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">TECHNICAL SPECIFICATIONS</p><h3 className="section-heading">Built for Modern Business</h3></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{specs.map((s, i) => (<div key={i} className="s18-spec-card bg-white rounded-xl p-6" style={{ border: '1px solid #E8E4DC' }}><div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(142,105,182,0.15)' }}><s.icon size={20} color="#8E69B6" /></div><h4 className="font-serif text-lg font-medium mb-3" style={{ color: '#1C1A17' }}>{s.title}</h4><ul className="space-y-2">{s.items.map((item, j) => (<li key={j} className="flex items-start gap-2"><CheckCircle size={14} color="#5DC489" className="mt-0.5 flex-shrink-0" /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{item}</span></li>))}</ul></div>))}</div></div></section>)
}

function Space18Location() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.s18-loc > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const transport = [{ icon: Train, label: 'MRT Stations', items: ['Novena MRT (NS20): 6-min drive', 'Toa Payoh MRT (NS19): 8-min drive'] }, { icon: Bus, label: 'Bus Services', items: ['Along Balestier Rd / Lorong Ampas'] }, { icon: MapPin, label: 'Expressways', items: ['CTE (3-min), PIE (5-min), KPE (7-min)', 'AYE/ECP (10-min)'] }]
  return (<section ref={ref} className="py-24" style={{ backgroundColor: '#fff' }}><div className="max-w-[1128px] mx-auto px-6"><div className="s18-loc grid grid-cols-1 lg:grid-cols-2 gap-12"><div>
    <p className="mono-label mb-3" style={{ color: '#8E69B6' }}>LOCATION</p>
    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-6" style={{ color: '#1C1A17' }}>Balestier — A Thriving Industrial Precinct</h3>
    <p className="font-sans text-base leading-relaxed mb-8" style={{ color: '#4A4540' }}>SPACE@18 is strategically positioned in the established Balestier/Whampoa industrial precinct, offering excellent connectivity to major expressways and MRT stations. The location provides easy access to the CBD, Orchard, and other key business districts.</p>
    <div className="space-y-6">{transport.map((t, i) => (<div key={i} className="flex items-start gap-4"><div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(142,105,182,0.15)' }}><t.icon size={18} color="#8E69B6" /></div><div><h4 className="font-sans text-sm font-semibold mb-1" style={{ color: '#1C1A17' }}>{t.label}</h4>{t.items.map((item, j) => <p key={j} className="font-sans text-sm" style={{ color: '#6B6560' }}>{item}</p>)}</div></div>))}</div>
  </div><div>
    <p className="mono-label mb-3" style={{ color: '#8E69B6' }}>KEY FEATURES</p>
    <h4 className="font-serif text-2xl font-medium mb-6" style={{ color: '#1C1A17' }}>Designed for Flexibility & Growth</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {['Full-Height Glass Wall Facade', 'Sheltered Carpark', 'Multi-Unit Merging', '7.0m Ceiling (Level 1)', '6.3m Ceiling (Levels 2-6)', '3 Loading Bays', '60A / 3-Phase Power', '1 Canteen (200A)'].map((a, i) => (
        <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-4" style={{ border: '1px solid #E8E4DC' }}><CheckCircle size={16} color="#8E69B6" /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{a}</span></div>
      ))}
    </div>
  </div></div></div></section>)
}

/* ════════════════════════════════════════════════════════════════
   PROJECT 6 — SPACE NOVA  (NEW)
   ════════════════════════════════════════════════════════════════ */

function SpaceNovaHero() { return (<section id="spacenova" className="relative w-full flex items-end overflow-hidden scroll-mt-20" style={{ height: '75vh', minHeight: 500, backgroundColor: '#1C1A17' }}>
  <img src="/images/space-nova-hero.jpg" alt="Space Nova at 21 New Industrial Road 7-storey freehold B1 clean industrial glass facade sky terrace" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(23,23,28,0.95) 0%, rgba(23,23,28,0.5) 40%, transparent 70%)' }} />
  <div className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-16">
    <span className="inline-block font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={{ backgroundColor: '#6390B5', color: '#fff' }}>NEW LAUNCH — B1 Freehold</span>
    <h2 className="font-serif text-white font-semibold mb-2" style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-2px', lineHeight: 1.1 }}>Space Nova</h2>
    <p className="font-sans text-xl mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>21 New Industrial Road, Singapore 536213</p>
    <p className="font-sans text-base mb-6 max-w-[600px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
      A 7-storey freehold B1 clean industrial development with 47 exclusive strata units, featuring ramp-up access, full-height glass facades, private attached toilets, and a communal sky terrace. Built for businesses that demand quality.
    </p>
    <div className="flex flex-wrap gap-6 mb-8">
      {[ { icon: Calendar, text: 'Freehold' }, { icon: Building2, text: '7 Storeys' }, { icon: Layers, text: '47 Units' }, { icon: Zap, text: '100A / 60A Power' }, ].map((s, i) => (<div key={i} className="flex items-center gap-2"><s.icon size={18} color="#6390B5" /><span className="font-sans text-sm text-white">{s.text}</span></div>))}
    </div>
    <div className="flex flex-wrap gap-4">
      <a href="#enquiry" className="btn-bronze flex items-center gap-2"><Phone size={16} /> Enquire Now</a>
      <a href="#spacenova-details" className="btn-outline">View Details</a>
    </div>
  </div>
</section>) }

function SpaceNovaStats() {
  const stats = [{ label: 'Storeys', value: '7', unit: '' }, { label: 'Total Units', value: '47', unit: 'units' }, { label: 'Tenure', value: 'Freehold', unit: '' }, { label: 'EV Lots', value: '4', unit: 'lots' }]
  return (<section className="py-8" style={{ backgroundColor: '#1C1A17', borderTop: '1px solid rgba(255,255,255,0.1)' }}><div className="max-w-[1128px] mx-auto px-6"><div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">{stats.map((s, i) => (<div key={i}><span className="font-serif text-3xl lg:text-4xl font-semibold" style={{ color: '#6390B5' }}>{s.value}</span><span className="font-sans text-sm ml-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.unit}</span><p className="font-mono text-xs uppercase mt-1" style={{ color: '#6B6560' }}>{s.label}</p></div>))}</div></div></section>)
}

function SpaceNovaOverview() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.sn-overview > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  return (<section ref={ref} id="spacenova-details" style={{ backgroundColor: '#F7F5F0' }} className="py-20"><div className="max-w-[1128px] mx-auto px-6"><div className="sn-overview grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"><div>
    <p className="mono-label mb-3" style={{ color: '#6390B5' }}>PROJECT OVERVIEW</p>
    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-6" style={{ color: '#1C1A17' }}>Freehold B1 Clean Industrial with Sky Terrace</h3>
    <div className="font-sans text-base leading-relaxed space-y-4" style={{ color: '#4A4540' }}>
      <p>Space Nova is a 7-storey B1 clean industrial development located at <strong>21 New Industrial Road, Singapore 536213</strong>. As a <strong>freehold</strong> property, it offers perpetual ownership — a rare and valuable asset in Singapore's industrial market.</p>
      <p>The development comprises <strong>47 exclusive strata units</strong> designed with full-height glass facades, offering a modern and professional appearance. Every unit comes with a <strong>private attached toilet</strong>, providing convenience and privacy for business owners and employees.</p>
      <p>Key features include <strong>ramp-up access</strong> for direct loading, a <strong>communal sky terrace</strong> for relaxation, and <strong>4 EV charging lots</strong> supporting sustainable transportation. The flexible unit layouts allow businesses to combine adjacent units for expanded operations.</p>
      <p>Conveniently located near Tai Seng and Bartley MRT stations, with easy access to CTE, PIE, and TPE expressways, Space Nova offers excellent connectivity for businesses serving the Central, East, and North regions of Singapore.</p>
    </div>
  </div><div className="space-y-2">
    {[{ label: 'Project Name', value: 'Space Nova' }, { label: 'Address', value: '21 New Industrial Road, Singapore 536213' }, { label: 'Project Type', value: 'B1 Clean Industrial' }, { label: 'Tenure', value: 'Freehold' }, { label: 'Storeys', value: '7-Storey' }, { label: 'Total Units', value: '47 Exclusive Strata Units' }, { label: 'Ceiling Height', value: 'L1: 6.5m | L2-L7: 6.3m' }, { label: 'Floor Loading', value: '7.5 kN/m²' }, { label: 'Power', value: '100A (L1 select units) / 60A (standard)' }, { label: 'Lifts', value: '3 (2 Passenger/Fire + 1 Service)' }, { label: 'Loading', value: '2 Loading Bays + 1 Heavy Vehicle Lot' }, { label: 'Parking', value: '23 Car Lots (4 EV) + 2 Motorcycle + 28 Bicycle' }, { label: 'Private Toilets', value: 'Every unit has attached toilet' }, { label: 'Special Features', value: 'Ramp-up, Sky Terrace, Flexible Layouts' }].map((item, i) => (
      <div key={i} className="flex justify-between items-center py-3 px-4 rounded-lg" style={{ backgroundColor: i % 2 === 0 ? '#fff' : 'transparent' }}><span className="font-sans text-sm" style={{ color: '#6B6560' }}>{item.label}</span><span className="font-sans text-sm font-medium text-right" style={{ color: '#1C1A17', maxWidth: '60%' }}>{item.value}</span></div>
    ))}
  </div></div></div></section>)
}

function SpaceNovaSpecs() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.sn-spec-card', { opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const specs = [
    { icon: ArrowUp, title: 'Ceiling Heights', items: ['Level 1: 6.5 metres', 'Levels 2-7: 6.3 metres', 'Generous height for diverse operations'] },
    { icon: Gauge, title: 'Floor Loading', items: ['All Units: 7.5 kN/m²', 'Suitable for clean industrial use', 'R&D, testing, light assembly'] },
    { icon: Zap, title: 'Electrical Provision', items: ['1st Storey Units (#01-01 to #01-03): 100A', 'All Other Units: 60A', '3-phase power for all units'] },
    { icon: Layers, title: 'Lift Provision (3 Lifts)', items: ['2x Passenger / Fire Lift', '1x Service Lift', 'Efficient vertical transport'] },
    { icon: ParkingCircle, title: 'Parking Facilities', items: ['Car Lots: 23 nos (incl. 4 EV lots)', 'Accessible Lots: 2 nos', 'Motorcycle Lots: 1 no', 'Bicycle Lots: 28 nos'] },
    { icon: Truck, title: 'Loading & Access', items: ['2 Loading bays at 1st storey', '1 Heavy vehicle lot', 'Ramp-up access throughout', 'Common loading at 2nd & 3rd storey'] },
  ]
  return (<section ref={ref} style={{ backgroundColor: '#F7F5F0' }} className="py-24"><div className="max-w-[1128px] mx-auto px-6"><div className="text-center mb-12"><p className="mono-label mb-3">TECHNICAL SPECIFICATIONS</p><h3 className="section-heading">Engineered for Excellence</h3></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{specs.map((s, i) => (<div key={i} className="sn-spec-card bg-white rounded-xl p-6" style={{ border: '1px solid #E8E4DC' }}><div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(99,144,181,0.15)' }}><s.icon size={20} color="#6390B5" /></div><h4 className="font-serif text-lg font-medium mb-3" style={{ color: '#1C1A17' }}>{s.title}</h4><ul className="space-y-2">{s.items.map((item, j) => (<li key={j} className="flex items-start gap-2"><CheckCircle size={14} color="#5DC489" className="mt-0.5 flex-shrink-0" /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{item}</span></li>))}</ul></div>))}</div></div></section>)
}

function SpaceNovaLocation() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.sn-loc > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }) }, ref); return () => ctx.revert() }, [])
  const transport = [{ icon: Train, label: 'MRT Stations', items: ['Tai Seng MRT (CC11): 8-min walk', 'Bartley MRT (CC12): 8-min walk'] }, { icon: Bus, label: 'Bus Services', items: ['Along New Industrial Road'] }, { icon: MapPin, label: 'Expressways', items: ['CTE (5-min), PIE (5-min), TPE (5-min)'] }]
  return (<section ref={ref} className="py-24" style={{ backgroundColor: '#fff' }}><div className="max-w-[1128px] mx-auto px-6"><div className="sn-loc grid grid-cols-1 lg:grid-cols-2 gap-12"><div>
    <p className="mono-label mb-3" style={{ color: '#6390B5' }}>LOCATION</p>
    <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-6" style={{ color: '#1C1A17' }}>New Industrial Road — Central Connectivity</h3>
    <p className="font-sans text-base leading-relaxed mb-8" style={{ color: '#4A4540' }}>Space Nova is located on New Industrial Road, a well-established industrial address with excellent connectivity to MRT stations and major expressways. The location offers seamless access to the Central Business District, Changi Airport, and major industrial hubs across Singapore.</p>
    <div className="space-y-6">{transport.map((t, i) => (<div key={i} className="flex items-start gap-4"><div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(99,144,181,0.15)' }}><t.icon size={18} color="#6390B5" /></div><div><h4 className="font-sans text-sm font-semibold mb-1" style={{ color: '#1C1A17' }}>{t.label}</h4>{t.items.map((item, j) => <p key={j} className="font-sans text-sm" style={{ color: '#6B6560' }}>{item}</p>)}</div></div>))}</div>
  </div><div>
    <p className="mono-label mb-3" style={{ color: '#6390B5' }}>KEY FEATURES</p>
    <h4 className="font-serif text-2xl font-medium mb-6" style={{ color: '#1C1A17' }}>Designed for the Modern Business</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {['Full-Height Glass Facade', 'Ramp-Up Access', 'Communal Sky Terrace', 'Private Attached Toilets', '4 EV Charging Lots', 'Flexible Unit Combinations', '100A Power (Select Units)', '2 Loading Bays + Heavy Vehicle'].map((a, i) => (
        <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-4" style={{ border: '1px solid #E8E4DC' }}><CheckCircle size={16} color="#6390B5" /><span className="font-sans text-sm" style={{ color: '#4A4540' }}>{a}</span></div>
      ))}
    </div>
  </div></div></div></section>)
}

/* ════════════════════════════════════════════════════════════════
   SHARED ENQUIRY / CONTACT
   ════════════════════════════════════════════════════════════════ */

function SharedEnquiry() {
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.enq-content > *', { opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } }) }, ref); return () => ctx.revert() }, [])
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000) }
  return (<section ref={ref} id="enquiry" style={{ backgroundColor: '#1C1A17' }} className="py-24"><div className="max-w-[1128px] mx-auto px-6"><div className="enq-content grid grid-cols-1 lg:grid-cols-2 gap-12"><div>
    <p className="mono-label mb-4" style={{ color: '#4A3E3D' }}>REGISTER YOUR INTEREST</p>
    <h2 className="font-serif text-4xl text-white font-medium mb-4">Secure Your Unit Today</h2>
    <p className="font-sans text-base mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>Register your interest for any of our new industrial and commercial launches. Priority registration gives you first-mover advantage for unit selection, pricing updates, and exclusive previews.</p>
    <div className="space-y-4">
      <div className="flex items-center gap-3"><Phone size={18} color="#4A3E3D" /><a href="tel:+6597687722" className="font-sans text-base text-white hover:text-[#4A3E3D] transition-colors">+65 9768 7722</a></div>
      <div className="flex items-center gap-3"><Phone size={18} color="#4A3E3D" /><a href="tel:+6586882929" className="font-sans text-base text-white hover:text-[#4A3E3D] transition-colors">+65 8688 2929</a></div>
    </div>
    <div className="mt-6">
      <a
        href="https://www.privyr.com/form/1U3bZG2k#sg-industrial-enquiry"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-bronze inline-flex items-center gap-2"
      >
        <Phone size={16} /> Submit Enquiry Form
      </a>
    </div>
    <div className="flex gap-4 mt-8">
      <a href="https://wa.me/message/7EESXSAYAH2II1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-sans text-sm py-3 px-5 rounded-lg text-white" style={{ backgroundColor: '#25D366' }}><MessageCircle size={16} /> WhatsApp</a>
      <a href="https://whatsapp.com/channel/0029Va0J0Mj3QxSASaTLPF0C" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-sans text-sm py-3 px-5 rounded-lg" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}><MessageCircle size={16} /> WhatsApp Channel</a>
    </div>
  </div><div className="bg-white rounded-xl p-8" style={{ border: '1px solid #E8E4DC' }}>
    <h3 className="font-serif text-xl font-medium mb-1" style={{ color: '#1C1A17' }}>Enquiry Form</h3>
    <p className="font-mono text-xs mb-6" style={{ color: '#6B6560' }}>Select your project of interest below</p>
    {submitted ? (<div className="text-center py-8"><div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(246,180,107,0.15)' }}><Check size={28} color="#4A3E3D" /></div><h4 className="font-serif text-lg font-medium mb-2" style={{ color: '#1C1A17' }}>Thank You!</h4><p className="font-sans text-sm" style={{ color: '#6B6560' }}>We'll get back to you within 24 hours with pricing and availability.</p></div>) : (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Your full name" required className="w-full h-12 px-4 rounded-lg font-sans text-sm outline-none transition-all" style={{ border: '1px solid #E8E4DC' }} onFocus={e => e.currentTarget.style.borderColor = '#4A3E3D'} onBlur={e => e.currentTarget.style.borderColor = '#E8E4DC'} />
        <input type="email" placeholder="your@email.com" required className="w-full h-12 px-4 rounded-lg font-sans text-sm outline-none transition-all" style={{ border: '1px solid #E8E4DC' }} onFocus={e => e.currentTarget.style.borderColor = '#4A3E3D'} onBlur={e => e.currentTarget.style.borderColor = '#E8E4DC'} />
        <input type="tel" placeholder="+65 XXXX XXXX" required className="w-full h-12 px-4 rounded-lg font-sans text-sm outline-none transition-all" style={{ border: '1px solid #E8E4DC' }} onFocus={e => e.currentTarget.style.borderColor = '#4A3E3D'} onBlur={e => e.currentTarget.style.borderColor = '#E8E4DC'} />
        <input type="text" placeholder="Company name" className="w-full h-12 px-4 rounded-lg font-sans text-sm outline-none transition-all" style={{ border: '1px solid #E8E4DC' }} onFocus={e => e.currentTarget.style.borderColor = '#4A3E3D'} onBlur={e => e.currentTarget.style.borderColor = '#E8E4DC'} />
        <select className="w-full h-12 px-4 rounded-lg font-sans text-sm outline-none transition-all appearance-none" style={{ border: '1px solid #E8E4DC', color: '#6B6560' }} onFocus={e => e.currentTarget.style.borderColor = '#4A3E3D'} onBlur={e => e.currentTarget.style.borderColor = '#E8E4DC'} defaultValue="">
          <option value="" disabled>Interested project</option>
          <option value="gateplus">Gate+ @ Tukang (B2 Ramp-Up Factory)</option>
          <option value="ctgold">CT Gold (B1/B2 Mixed-Use) — 100% Fully Sold</option>
          <option value="space18">SPACE@18 (B1 Freehold) — 18 Lorong Ampas</option>
          <option value="spacenova">Space Nova (B1 Freehold) — 21 New Industrial Road</option>
          <option value="generations">Generations@Tannery (B1 Freehold) — 71 Tannery Lane</option>
          <option value="gxc">Gourmet Xchange @ Kallang (B2 Food Hub)</option>
          <option value="both">Multiple Projects</option>
          <option value="other">Other / General Enquiry</option>
        </select>
        <textarea placeholder="Tell us about your requirements..." rows={4} className="w-full px-4 py-3 rounded-lg font-sans text-sm outline-none transition-all resize-none" style={{ border: '1px solid #E8E4DC' }} onFocus={e => e.currentTarget.style.borderColor = '#4A3E3D'} onBlur={e => e.currentTarget.style.borderColor = '#E8E4DC'} />
        <button type="submit" className="btn-bronze w-full text-center">Register Interest</button>
      </form>
    )}
  </div></div></div></section>)
}

/* ════════════════════════════════════════════════════════════════
   DISCLAIMER
   ════════════════════════════════════════════════════════════════ */

function Disclaimer() {
  return (<section className="py-10" style={{ backgroundColor: '#F7F5F0' }}><div className="max-w-[1128px] mx-auto px-6"><div className="rounded-xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
    <p className="font-mono text-xs uppercase mb-2" style={{ color: '#6B6560' }}>Disclaimer</p>
    <p className="font-sans text-xs leading-relaxed" style={{ color: '#6B6560' }}>All information, specifications, and floor plans provided herein are subject to change without prior notice. All strata areas are subject to Strata Value Approval. The developer reserves the right to make modifications to the design, specifications, and features. Dimension measurements are subjected to final survey and are estimates only. Purchasers should verify all details with the developer's sales team before making any purchase decision. This document is a draft for agent circulation only and not for public distribution.</p>
    <p className="font-sans text-xs mt-3" style={{ color: '#6B6560' }}><strong>Gate+ Developer:</strong> Tukang Project Pte. Ltd. | <strong>Developer Solicitor:</strong> Rajah &amp; Tann Singapore</p>
    <p className="font-sans text-xs mt-2" style={{ color: '#6B6560' }}><strong>CT Gold:</strong> 100% fully sold. Project details subject to developer confirmation. For enquiries on similar upcoming industrial launches or resale opportunities, contact our team.</p>
    <p className="font-sans text-xs mt-2" style={{ color: '#6B6560' }}><strong>Generations@Tannery:</strong> Floor-to-floor heights are estimates. All dimensions and specifications are subjected to final survey and approval. C&S: MKPL Architects Pte Ltd.</p>
    <p className="font-sans text-xs mt-2" style={{ color: '#6B6560' }}><strong>SPACE@18:</strong> Developed by JVA Whampoa Pte Ltd. Information based on e-brochure. All details subject to developer confirmation.</p>
    <p className="font-sans text-xs mt-2" style={{ color: '#6B6560' }}><strong>Space Nova:</strong> Information based on e-brochure dated 2 July 2026. All details subject to developer confirmation.</p>
    <p className="font-sans text-xs mt-2" style={{ color: '#6B6560' }}><strong>Gourmet Xchange (GXC):</strong> Developed by CL Savour Property Pte Ltd. Information based on marketing materials dated 14 January 2026. All details subject to developer confirmation.</p>
  </div></div></section>)
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE EXPORT
   ════════════════════════════════════════════════════════════════ */

export default function Launches() {
  return (<>
    <Helmet>
      <title>Industrial New Launch Singapore 2026 | SPACE@18 Space Nova Gate+ CT Gold Generations@Tannery Gourmet Xchange | For Sale & Rent | No ABSD | SG Industrial Properties</title>
      <meta name="description" content="Discover Singapore industrial new launch and industrial new project 2026: SPACE@18 at Lorong Ampas (B1 freehold, TOP Dec 2026), Space Nova at New Industrial Road (B1 freehold, 47 units), Gate+ at Tukang Jurong (B2 ramp-up factory), CT Gold at Macpherson (B1/B2 mixed-use, 100% fully sold), Generations@Tannery (B1 freehold), Gourmet Xchange (B2 food hub). All industrial properties for sale with No ABSD. Led by James Goh R002565A." />
      <meta name="keywords" content="industrial new launch, industrial new project, new launch, space 18, space18 lorong ampas, space nova, space nova new industrial road, gate+, ct gold, ct gold macpherson, generations@tannery, gourmet xchange, sg industrial properties, sg industrial group, industrial properties, for sale, for rent, no absd, james goh r002565a, b1 clean industrial, b2 factory singapore, warehouse for sale, b1 industrial unit, freehold industrial, lorong ampas industrial, new industrial road, tuas industrial property, jurong factory, woodlands industrial, kallang industrial, tannery lane, macpherson industrial, industrial property agent singapore, cea registered property agent, industrial property for sale, industrial property for rent, ramp up factory, food hub singapore, industrial property investment" />
      <link rel="canonical" href="https://sgindustrialproperties.com/launches" />
      <meta property="og:title" content="Industrial New Launch Singapore 2026 | Gate+ CT Gold Generations@Tannery Gourmet Xchange | SG Industrial Properties" />
      <meta property="og:description" content="Singapore's newest industrial new launch and industrial new project. Gate+, CT Gold at Macpherson, Generations@Tannery, Gourmet Xchange — all with No ABSD. Register your interest with SG Industrial Properties & SG Industrial Group." />
      <meta property="og:image" content="https://sgindustrialproperties.com/images/gate-plus-hero.jpg" />
      <meta property="og:url" content="https://sgindustrialproperties.com/launches" />
      <meta property="og:type" content="website" />
    </Helmet>

    {/* ─── Overview ─── */}
    <LaunchesHero />
    <ProjectCards />

    {/* ─── Project 1: SPACE@18 ─── */}
    <StickyNav label="SPACE@18" href="#space18" color="#8E69B6" />
    <Space18Hero /><Space18Stats /><Space18Overview /><Space18Specs /><Space18Location />

    {/* ─── Project 2: Space Nova ─── */}
    <StickyNav label="Space Nova" href="#spacenova" color="#6390B5" />
    <SpaceNovaHero /><SpaceNovaStats /><SpaceNovaOverview /><SpaceNovaSpecs /><SpaceNovaLocation />

    {/* ─── Project 3: Gate+ ─── */}
    <StickyNav label="Gate+" href="#gateplus" color="#4A3E3D" />
    <GatePlusHero /><GatePlusStats /><GatePlusOverview /><GatePlusUnits /><GatePlusSpecs /><GatePlusLocation /><GatePlusFAQ />

    {/* ─── Project 2: CT Gold ─── */}
    <StickyNav label="CT Gold" href="#ctgold" color="#C45D8C" />
    <CTGoldHero /><CTGoldOverview /><CTGoldFeatures /><CTGoldGallery /><CTGoldSpecs /><CTGoldDisclaimer />

    {/* ─── Project 3: Generations@Tannery ─── */}
    <StickyNav label="Generations@Tannery" href="#generations" color="#78B0B5" />
    <GenerationsHero /><GenerationsStats /><GenerationsOverview /><GenerationsUnits /><GenerationsSpecs /><GenerationsLocation />

    {/* ─── Project 4: Gourmet Xchange ─── */}
    <StickyNav label="Gourmet Xchange" href="#gxc" color="#5DC489" />
    <GXCHero /><GXCStats /><GXCOverview /><GXCUnitTypes /><GXCFeatures /><GXCSpecs /><GXCBusinessFit /><GXCConnectivity />

    {/* ─── Shared ─── */}
    <SharedEnquiry />
    <Disclaimer />

    {/* ─── Schema.org ─── */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "RealEstateListing", "name": "SPACE@18 - B1 Freehold Clean Industrial New Launch at Lorong Ampas", "url": "https://sgindustrialproperties.com/launches#space18", "description": "6-storey freehold B1 clean industrial at 18 Lorong Ampas, Singapore 328779, District 12. 46 strata units + 1 canteen. Full-height glass wall facade. 7.0m ceiling on Level 1. TOP Dec 2026. No ABSD. For sale by SG Industrial Properties & SG Industrial Group.", "image": "https://sgindustrialproperties.com/images/space-18-hero.jpg", "datePosted": "2026-07-05" } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "RealEstateListing", "name": "Space Nova - B1 Freehold Clean Industrial New Launch at New Industrial Road", "url": "https://sgindustrialproperties.com/launches#spacenova", "description": "7-storey freehold B1 clean industrial at 21 New Industrial Road, Singapore 536213. 47 exclusive strata units with ramp-up access, glass facades, private toilets, communal sky terrace, and 4 EV charging lots. No ABSD. For sale by SG Industrial Properties & SG Industrial Group.", "image": "https://sgindustrialproperties.com/images/space-nova-hero.jpg", "datePosted": "2026-07-05" } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "RealEstateListing", "name": "Gate+ @ Tukang - B2 Multi-User Ramp-Up Industrial Factory New Launch", "url": "https://sgindustrialproperties.com/launches#gateplus", "description": "10-storey B2 multi-user ramp-up industrial factory at Tukang, Jurong. 265 production units with 33-year tenure. TOP Jan 2029. No ABSD. For sale by SG Industrial Properties & SG Industrial Group.", "image": "https://sgindustrialproperties.com/images/gate-plus-hero.jpg", "datePosted": "2026-03-30" } },
        { "@type": "ListItem", "position": 4, "item": { "@type": "RealEstateListing", "name": "CT Gold - B1/B2 Mixed-Use Industrial & Commercial (100% Fully Sold)", "url": "https://sgindustrialproperties.com/launches#ctgold", "description": "Modern mixed-use industrial development with glass facade, gold accents, ground floor F&B, and helical parking ramp. 100% fully sold. No ABSD. SG Industrial Properties & SG Industrial Group.", "image": "https://sgindustrialproperties.com/images/ct-gold-hero.jpg", "datePosted": "2026-03-30" } },
        { "@type": "ListItem", "position": 5, "item": { "@type": "RealEstateListing", "name": "Generations@Tannery - B1 Freehold Industrial New Launch", "url": "https://sgindustrialproperties.com/launches#generations", "description": "12-storey freehold B1 industrial development at 71 Tannery Lane, Singapore 347807, District 13. 54 production units + 5 industrial canteens. 51 parking lots (10 EV). 6-min walk to Mattar MRT. Developed by Providence Estates (Tannery) Pte Ltd. No ABSD. For sale by SG Industrial Properties & SG Industrial Group.", "image": "https://sgindustrialproperties.com/images/generations-tannery-hero.png", "datePosted": "2026-03-30" } },
        { "@type": "ListItem", "position": 6, "item": { "@type": "RealEstateListing", "name": "Gourmet Xchange @ Kallang Way - B2 Food Hub New Launch", "url": "https://sgindustrialproperties.com/launches#gxc", "description": "Singapore's largest strata-titled food hub. 272 units across 9-storey main block and 3-storey heritage terrace. Kallang Riverfront. Green Mark Platinum. No ABSD. For sale by SG Industrial Properties & SG Industrial Group.", "image": "https://sgindustrialproperties.com/images/gourmet-xchange-hero.jpg", "datePosted": "2026-03-30" } }
      ]
    })}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sgindustrialproperties.com" },
        { "@type": "ListItem", "position": 2, "name": "New Industrial / Commercial Launches", "item": "https://sgindustrialproperties.com/launches" }
      ]
    })}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What industrial new launches are available in Singapore?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The latest industrial new launches in Singapore for 2026 include SPACE@18 at 18 Lorong Ampas (B1 freehold, 46 units + 1 canteen, TOP Dec 2026), Space Nova at 21 New Industrial Road (B1 freehold, 47 units), Gate+ at Tukang Jurong (B2 ramp-up factory, 265 units, TOP Jan 2029), CT Gold (B1/B2 mixed-use, 100% fully sold), Generations@Tannery at 71 Tannery Lane (B1 freehold, 64 units, 12 storeys), and Gourmet Xchange at 1 Kallang Way (B2 food hub, 272 units, heritage terrace). All industrial properties for sale come with No ABSD. Contact SG Industrial Properties & SG Industrial Group for priority registration."
          }
        },
        {
          "@type": "Question",
          "name": "Do industrial properties in Singapore have ABSD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, industrial properties in Singapore have No ABSD (Additional Buyer's Stamp Duty). B1 and B2 factories, warehouses, business parks, and all industrial properties are exempt from ABSD, making them highly attractive investments compared to residential property."
          }
        },
        {
          "@type": "Question",
          "name": "What is Gate+ at Tukang Jurong?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Gate+ is a 10-storey B2 multi-user ramp-up industrial factory at Tukang, Jurong. It features 265 production units ranging from 1,615 sqft to 14,596 sqft, with 33-year tenure and estimated TOP in January 2029. Key features include 40ft container access, Green Mark Platinum certification, 2 industrial canteens, and a publicly accessible heavy vehicle park. For sale with No ABSD through SG Industrial Properties."
          }
        },
        {
          "@type": "Question",
          "name": "What is Generations@Tannery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Generations@Tannery is a rare 12-storey freehold B1 industrial development located at 71 Tannery Lane, Singapore 347807, District 13. Developed by Providence Estates (Tannery) Pte Ltd, it offers 54 production units and 5 industrial canteens across a 3,150.10 sqm site with freehold tenure. Features include 51 parking lots (10 EV), 6 high-capacity KONE lifts, 5-storey ramp-up access, and a 6-minute walk to Mattar MRT. Expected TOP: 31 December 2030. For sale with No ABSD through SG Industrial Properties & SG Industrial Group."
          }
        }
      ]
    })}} />
  </>)
}

/* ─── Sticky Nav Helper ─── */
function StickyNav({ label, href, color }: { label: string; href: string; color: string }) {
  return (<div className="sticky top-20 z-30 py-3" style={{ backgroundColor: 'rgba(247,245,232,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #E8E4DC' }}><div className="max-w-[1128px] mx-auto px-6 flex items-center justify-between"><div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} /><span className="font-serif text-lg font-medium" style={{ color: '#1C1A17' }}>{label}</span></div><a href={href} className="font-sans text-xs font-medium px-4 py-2 rounded-lg transition-colors" style={{ color, border: `1px solid ${color}` }}>Back to Top</a></div></div>)
}
