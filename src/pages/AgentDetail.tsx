import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, Award, Languages, Building2, ArrowRight, ExternalLink } from 'lucide-react'
import { getAgentBySlug, getRelatedAgents } from '../data/agents'

gsap.registerPlugin(ScrollTrigger)

export default function AgentDetail() {
  const { slug } = useParams<{ slug: string }>()
  const ref = useRef<HTMLDivElement>(null)

  const agent = getAgentBySlug(slug || '')

  useEffect(() => {
    if (!agent) return
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from('.agent-detail > *', { opacity: 0, y: 30, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [agent])

  if (!agent) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center" style={{ backgroundColor: '#F7F5E8' }}>
        <div className="text-center">
          <h2 className="font-serif text-2xl font-medium mb-4" style={{ color: '#17171C' }}>Agent Not Found</h2>
          <p className="font-sans text-base mb-6" style={{ color: '#9797A3' }}>The agent profile you are looking for does not exist.</p>
          <Link to="/team" className="btn-primary">View All Agents</Link>
        </div>
      </div>
    )
  }

  const related = getRelatedAgents(agent.slug)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": agent.name,
    "description": agent.bio,
    "url": `https://sgindustrialproperties.com/team/${agent.slug}`,
    "image": `https://sgindustrialproperties.com${agent.image}`,
    "telephone": agent.phone.replace(/\s/g, ''),
    "email": agent.email,
    "memberOf": {
      "@type": "Organization",
      "name": "SG Industrial Properties & SG Industrial Group",
      "url": "https://sgindustrialproperties.com",
      "logo": "https://sgindustrialproperties.com/favicon-32x32.png"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Singapore",
      "addressCountry": "SG"
    },
    "knowsAbout": agent.specialties,
    "identifier": {
      "@type": "PropertyValue",
      "name": "CEA Registration Number",
      "value": agent.cea
    }
  }

  return (
    <>
      <Helmet>
        <title>{agent.metaTitle}</title>
        <meta name="description" content={agent.metaDescription} />
        <meta name="keywords" content={agent.metaKeywords} />
        <link rel="canonical" href={`https://sgindustrialproperties.com/team/${agent.slug}`} />
        <meta property="og:title" content={agent.metaTitle} />
        <meta property="og:description" content={agent.metaDescription} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`https://sgindustrialproperties.com/team/${agent.slug}`} />
        <meta property="og:image" content={`https://sgindustrialproperties.com${agent.image}`} />
        <meta property="profile:first_name" content={agent.name.split(' ')[0]} />
        <meta property="profile:last_name" content={agent.name.split(' ').slice(1).join(' ')} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Breadcrumbs */}
      <div style={{ backgroundColor: '#F7F5E8', borderBottom: '1px solid #DEDEE0' }}>
        <div className="max-w-[1128px] mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 font-sans text-sm" style={{ color: '#9797A3' }}>
            <Link to="/" style={{ color: '#4A3E3D' }}>Home</Link>
            <span>/</span>
            <Link to="/team" style={{ color: '#4A3E3D' }}>Our Team</Link>
            <span>/</span>
            <span style={{ color: '#17171C' }}>{agent.name}</span>
          </nav>
        </div>
      </div>

      {/* Agent Profile */}
      <section ref={ref} style={{ backgroundColor: '#F7F5E8' }} className="py-16">
        <div className="agent-detail max-w-[1128px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Photo */}
            <div className="lg:col-span-1">
              <div className="rounded-xl overflow-hidden shadow-lg mb-6 mx-auto" style={{ border: '1px solid #DEDEE0', maxWidth: 360 }}>
                <img src={agent.image} alt={`${agent.name} CEA ${agent.cea} — Industrial Property Agent at SG Industrial Properties`} className="w-full object-cover object-top" style={{ aspectRatio: '1/1' }} loading="eager" />
              </div>
              <div className="flex flex-col gap-3">
                <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="btn-primary flex items-center justify-center gap-2 py-3">
                  <Phone size={16} /> {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="btn-outline flex items-center justify-center gap-2 py-3">
                  <Mail size={16} /> Email Agent
                </a>
              </div>
            </div>

            {/* Right: Details */}
            <div className="lg:col-span-2">
              <p className="mono-label mb-2" style={{ color: '#4A3E3D' }}>CEA REGISTERED AGENT</p>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-2" style={{ color: '#17171C', letterSpacing: '-1px' }}>
                {agent.name}
              </h1>
              {agent.cea && <p className="font-mono text-sm mb-3" style={{ color: '#9797A3' }}>CEA Registration: {agent.cea}</p>}
              <p className="font-sans text-lg font-medium mb-6" style={{ color: '#4A3E3D' }}>{agent.role}</p>

              <p className="font-sans text-base leading-relaxed mb-8" style={{ color: '#28282A' }}>
                {agent.bio}
              </p>

              {/* Online Profiles — James Goh only */}
              {agent.slug === 'james-goh-r002565a' && (
                <div className="mb-8 p-5 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #DEDEE0' }}>
                  <h3 className="font-serif text-lg font-medium mb-4" style={{ color: '#17171C' }}>Find Me Online</h3>
                  <div className="flex flex-col gap-3">
                    <a href="https://agents.huttonsgroup.com/R002565A/about" target="_blank" rel="noopener noreferrer" className="font-sans text-sm flex items-center gap-2" style={{ color: '#4A3E3D' }}>
                      <ExternalLink size={14} /> Huttons Agent Profile
                    </a>
                    <a href="https://www.commercialguru.com.sg/agent/james-goh-63408" target="_blank" rel="noopener noreferrer" className="font-sans text-sm flex items-center gap-2" style={{ color: '#4A3E3D' }}>
                      <ExternalLink size={14} /> Commercial Guru Profile
                    </a>
                    <a href="https://www.facebook.com/james.goh.391/" target="_blank" rel="noopener noreferrer" className="font-sans text-sm flex items-center gap-2" style={{ color: '#4A3E3D' }}>
                      <ExternalLink size={14} /> Personal Facebook
                    </a>
                    <a href="https://www.facebook.com/sgindustrialproperties/" target="_blank" rel="noopener noreferrer" className="font-sans text-sm flex items-center gap-2" style={{ color: '#4A3E3D' }}>
                      <ExternalLink size={14} /> SG Industrial Properties Facebook
                    </a>
                  </div>
                </div>
              )}

              {/* Specialties */}
              <div className="mb-8">
                <h3 className="font-serif text-xl font-medium mb-4 flex items-center gap-2" style={{ color: '#17171C' }}>
                  <Award size={20} color="#4A3E3D" /> Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.specialties.map((s, i) => (
                    <span key={i} className="font-sans text-sm px-4 py-2 rounded-full" style={{ backgroundColor: '#fff', border: '1px solid #DEDEE0', color: '#28282A' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Districts */}
              <div className="mb-8">
                <h3 className="font-serif text-xl font-medium mb-4 flex items-center gap-2" style={{ color: '#17171C' }}>
                  <MapPin size={20} color="#4A3E3D" /> Areas Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.districts.map((d, i) => (
                    <span key={i} className="font-sans text-sm px-4 py-2 rounded-full" style={{ backgroundColor: '#fff', border: '1px solid #DEDEE0', color: '#28282A' }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-8">
                <h3 className="font-serif text-xl font-medium mb-4 flex items-center gap-2" style={{ color: '#17171C' }}>
                  <Languages size={20} color="#4A3E3D" /> Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.languages.map((l, i) => (
                    <span key={i} className="font-sans text-sm px-4 py-2 rounded-full" style={{ backgroundColor: '#fff', border: '1px solid #DEDEE0', color: '#28282A' }}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div className="rounded-xl p-6" style={{ backgroundColor: '#17171C' }}>
                <h3 className="font-serif text-xl font-medium text-white mb-3">Looking for Industrial Property?</h3>
                <p className="font-sans text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Contact {agent.name} today for expert advice on B1 industrial, B2 factory, warehouse, and industrial investment properties in Singapore. No ABSD on all industrial properties.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="btn-bronze flex items-center gap-2"><Phone size={16} /> Call Now</a>
                  <a href="https://www.privyr.com/form/1U3bZG2k#sg-industrial-enquiry" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2"><Building2 size={16} /> Enquire Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Agents */}
      <section style={{ backgroundColor: '#fff' }} className="py-16">
        <div className="max-w-[1128px] mx-auto px-6">
          <h2 className="font-serif text-3xl font-medium mb-8 text-center" style={{ color: '#17171C' }}>
            Other Team Members
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {related.map((a, i) => (
              <Link key={i} to={`/team/${a.slug}`} className="group text-center">
                <div className="rounded-xl overflow-hidden mb-3" style={{ border: '1px solid #DEDEE0' }}>
                  <img src={a.image} alt={`${a.name} CEA ${a.cea}`} className="w-full object-cover transition-transform group-hover:scale-105" style={{ aspectRatio: '1/1' }} />
                </div>
                <h4 className="font-sans text-sm font-semibold" style={{ color: '#17171C' }}>{a.name}</h4>
                {a.cea && <p className="font-mono text-xs" style={{ color: '#9797A3' }}>{a.cea}</p>}
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/team" className="btn-primary inline-flex items-center gap-2">View All 21 Agents <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
