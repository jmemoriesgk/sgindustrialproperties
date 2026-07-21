import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, ArrowRight, Award, Users, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────── DATA: All 20 Team Members ─────────────────── */
const teamLeader = {
  name: 'James Goh',
  cea: 'R002565A',
  role: 'Team Leader | Industrial Specialist',
  experience: '15+ years in industrial property',
  bio: 'James founded SG Industrial Properties with a vision to transform how businesses find industrial spaces in Singapore. His expertise spans B1 and B2 industrial properties across all major districts including Tuas, Jurong, Woodlands, and Changi. Under his leadership, the team has facilitated over S$500 million in transactions.',
  image: '/images/team-james-new.jpg',
  phone: '+65 9768 7722',
  slug: 'james-goh-r002565a',
}

const teamMembers = [
  { name: 'Caroline Chan', cea: 'R046614C', role: 'Industrial Specialist', image: '/images/Caroline-Chan-R046614C.jpg', slug: 'caroline-chan-r046614c' },
  { name: 'Alvin Lim', cea: 'R042513G', role: 'Industrial Specialist', image: '/images/Alvin-Lim-R042513G.jpg', slug: 'alvin-lim-r042513g' },
  { name: 'Amanda Chuah', cea: 'R056404H', role: 'Industrial Specialist', image: '/images/Amanda-Chuah-R056404H.jpg', slug: 'amanda-chuah-r056404h' },
  { name: 'David Yong', cea: 'R056841H', role: 'Industrial Specialist', image: '/images/David-Yong-R056841H.jpg', slug: 'david-yong-r056841h' },
  { name: 'Freddy Choo', cea: '', role: 'Industrial Specialist', image: '/images/Freddy-Choo.jpg', slug: 'freddy-choo' },
  { name: 'Greenie Choo', cea: 'R023447A', role: 'Industrial Specialist', image: '/images/Greenie-Choo-R023447A.jpg', slug: 'greenie-choo-r023447a' },
  { name: 'Jimmy Ng', cea: 'R009588I', role: 'Industrial Specialist', image: '/images/Jimmy-Ng-R009588I.jpg', slug: 'jimmy-ng-r009588i' },
  { name: 'John Suar', cea: 'R009496C', role: 'Industrial Specialist', image: '/images/John-Suar-R009496C.jpg', slug: 'john-suar-r009496c' },
  { name: 'Ken Ng', cea: 'R024280F', role: 'Industrial Specialist', image: '/images/Ken-Ng-R024280F.jpg', slug: 'ken-ng-r024280f' },
  { name: 'Lee Geok Chew', cea: 'R023491I', role: 'Industrial Specialist', image: '/images/Lee-Geok-Chew-R023491I.jpg', slug: 'lee-geok-chew-r023491i' },
  { name: 'Maverick Cheng', cea: 'R016259D', role: 'Industrial Specialist', image: '/images/Maverick-Cheng-R016259D.jpg', slug: 'maverick-cheng-r016259d' },
  { name: 'Moon Lai', cea: 'R062936J', role: 'Industrial Specialist', image: '/images/Moon-Lai-R062936J.jpg', slug: 'moon-lai-r062936j' },
  { name: 'Paul Tan', cea: 'R024959B', role: 'Industrial Specialist', image: '/images/Paul-Tan-R024959B.jpg', slug: 'paul-tan-r024959b' },
  { name: 'Shaun Quai', cea: 'R073861I', role: 'Industrial Specialist', image: '/images/Shaun-Quai-R073861I.jpg', slug: 'shaun-quai-r073861i' },
  { name: 'Simon Tham', cea: 'R023257F', role: 'Industrial Specialist', image: '/images/Simon-Tham-R023257F.jpg', slug: 'simon-tham-r023257f' },
  { name: 'SK Lee', cea: 'R065066G', role: 'Industrial Specialist', image: '/images/SK-Lee-R065066G.jpg', slug: 'sk-lee-r065066g' },
  { name: 'Stella Ng', cea: 'R016155E', role: 'Industrial Specialist', image: '/images/Stella-Ng-R016155E.jpg', slug: 'stella-ng-r016155e' },
  { name: 'Sunny Chua', cea: 'R052568I', role: 'Industrial Specialist', image: '/images/Sunny-Chua-R052568I.jpg', slug: 'sunny-chua-r052568i' },
  { name: 'Teressa Tang', cea: 'R019925J', role: 'Industrial Specialist', image: '/images/Teressa-Tang-R019925J.jpg', slug: 'teressa-tang-r019925j' },
  { name: 'Theresa Tan', cea: 'R052724Z', role: 'Industrial Specialist', image: '/images/Theresa-Tan-R052724Z.jpg', slug: 'theresa-tan-r052724z' },
]

/* ─────────────────── HERO ─────────────────── */
function TeamHero() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-hero > *', { opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="flex items-center justify-center" style={{ backgroundColor: '#1C1A17', minHeight: '50vh' }}>
      <div className="team-hero text-center px-6 max-w-[900px] py-24">
        <p className="mono-label mb-4" style={{ color: '#4A3E3D' }}>OUR TEAM</p>
        <h1 className="font-serif text-white font-semibold mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-1px' }}>
          Meet Our CEA Registered Property Agents
        </h1>
        <p className="font-sans text-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 700 }}>
          A dedicated team of 21 licensed industrial specialists — led by James Goh and 20 CEA registered agents — specialising in Singapore industrial and commercial real estate.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2"><Award size={18} color="#4A3E3D" /><span className="font-sans text-sm text-white">20 CEA Registered Specialists</span></div>
          <div className="flex items-center gap-2"><Users size={18} color="#4A3E3D" /><span className="font-sans text-sm text-white">1,000+ Clients Served</span></div>
          <div className="flex items-center gap-2"><CheckCircle size={18} color="#4A3E3D" /><span className="font-sans text-sm text-white">S$500M+ Transactions</span></div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── TEAM LEADER ─────────────────── */
function TeamLeader() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.leader-content > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  const m = teamLeader

  return (
    <section ref={ref} style={{ backgroundColor: '#F7F5F0' }} className="py-24">
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="leader-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="mono-label mb-3" style={{ color: '#4A3E3D' }}>TEAM LEADER</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-medium mb-2" style={{ color: '#1C1A17' }}>{m.name}</h2>
            <p className="font-mono text-sm mb-4" style={{ color: '#1C1A17' }}>CEA Registration No: {m.cea}</p>
            <p className="font-sans text-lg font-medium mb-4" style={{ color: '#4A3E3D' }}>{m.role}</p>
            <p className="font-sans text-base leading-relaxed mb-6" style={{ color: '#1C1A17' }}>{m.bio}</p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${m.phone.replace(/\s/g, '')}`} className="btn-primary flex items-center gap-2"><Phone size={16} /> {m.phone}</a>
              <a
                href="https://www.privyr.com/form/1U3bZG2k#sg-industrial-enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
                style={{ backgroundColor: '#4A3E3D', color: '#1C1A17' }}
              >
                Submit Enquiry Form
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Link to={`/team/${m.slug}`} className="relative mx-auto block" style={{ maxWidth: 400 }}>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={m.image}
                  alt={`${m.name} CEA ${m.cea} Team Leader Property Consultant Singapore SG Industrial Properties`}
                  className="w-full aspect-square object-contain bg-[#F7F5F0]"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-lg" style={{ border: '1px solid #E8E4DC' }}>
                <p className="font-sans text-sm font-semibold" style={{ color: '#1C1A17' }}>{m.name}</p>
                <p className="font-mono text-xs" style={{ color: '#4A3E3D' }}>CEA {m.cea}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── AGENTS GRID ─────────────────── */
function AgentsGrid() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.agent-card', { opacity: 0, y: 40, duration: 0.6, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="mono-label mb-3">INDUSTRIAL SPECIALISTS</p>
          <h2 className="section-heading">Our CEA Registered Agents</h2>
          <p className="font-sans text-base mt-4 mx-auto" style={{ color: '#1C1A17', maxWidth: 600 }}>
            Each industrial specialist is fully licensed by the Council for Estate Agencies (CEA) and focuses exclusively on Singapore industrial and commercial property transactions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {teamMembers.map((m, i) => (
            <Link
              to={`/team/${m.slug}`}
              key={i}
              className="agent-card text-center group block"
              id={`agent-${m.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="relative mx-auto mb-4 overflow-hidden rounded-xl" style={{ width: '100%', aspectRatio: '3/4', backgroundColor: '#F7F5F0', border: '1px solid #E8E4DC' }}>
                <img
                  src={m.image}
                  alt={`${m.name} CEA ${m.cea} Property Consultant Singapore Industrial Commercial Real Estate SG Industrial Properties`}
                  className="w-full h-full object-contain object-top transition-transform duration-300 group-hover:scale-105 bg-[#F7F5F0]"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector('.img-fallback') as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div
                  className="img-fallback hidden absolute inset-0 flex-col items-center justify-center"
                  style={{ backgroundColor: '#1C1A17', color: '#FFFFFF' }}
                >
                  <span className="font-mono text-sm">img</span>
                </div>
              </div>
              <h3 className="font-sans text-base font-semibold" style={{ color: '#1C1A17' }}>{m.name}</h3>
              {m.cea && (
                <p className="font-mono text-xs mt-1" style={{ color: '#4A3E3D' }}>CEA {m.cea}</p>
              )}
              <p className="font-sans text-xs mt-1" style={{ color: '#1C1A17' }}>{m.role}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── CEA INFO SECTION ─────────────────── */
function CEAInfo() {
  return (
    <section style={{ backgroundColor: '#F7F5F0' }} className="py-20">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl font-medium mb-6" style={{ color: '#1C1A17' }}>
          What is CEA Registration?
        </h2>
        <p className="font-sans text-base leading-relaxed mb-6" style={{ color: '#1C1A17' }}>
          The Council for Estate Agencies (CEA) is the statutory board that regulates Singapore's real estate agency industry. All property agents must be registered with CEA and hold a valid registration number (e.g., R0XXXXXA) before they can conduct estate agency work. This ensures professionalism, accountability, and consumer protection.
        </p>
        <p className="font-sans text-base leading-relaxed mb-8" style={{ color: '#1C1A17' }}>
          You can verify any agent's registration status on the <a href="https://www.cea.gov.sg" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#4A3E3D' }}>CEA Public Register</a> using their CEA registration number. Every agent listed on this page is a fully registered property agent with SG Industrial Properties.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/launches" className="btn-primary flex items-center gap-2">
            View Property Launches <ArrowRight size={14} />
          </Link>
          <a href="tel:+6597687722" className="btn-primary flex items-center gap-2" style={{ backgroundColor: 'transparent', border: '1px solid #1C1A17', color: '#1C1A17' }}>
            <Phone size={14} /> +65 9768 7722
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── MAIN EXPORT ─────────────────── */
export default function Team() {
  const allAgents = [teamLeader, ...teamMembers]

  // Build JSON-LD Person schemas for all agents
  const personSchemas = allAgents.map((m) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: m.name,
    jobTitle: m.cea ? `CEA Registered Industrial Specialist (${m.cea})` : 'Industrial Specialist',
    worksFor: {
      '@type': 'RealEstateAgent',
      name: 'SG Industrial Properties',
      alternateName: 'SG Industrial Group',
      url: 'https://sgindustrialproperties.com',
      telephone: '+65-9768-7722',
    },
    ...(m.cea ? { identifier: m.cea } : {}),
    image: `https://sgindustrialproperties.com${m.image}`,
    url: m.slug ? `https://sgindustrialproperties.com/team/${m.slug}` : `https://sgindustrialproperties.com/team#agent-${m.name.toLowerCase().replace(/\s+/g, '-')}`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SG',
      addressLocality: 'Singapore',
    },
    description: `${m.name} is a ${m.role} at SG Industrial Properties & SG Industrial Group, specialising in Singapore industrial property for sale and rent including B1 and B2 factories, warehouses, and business parks with No ABSD.`,
  }))

  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: allAgents.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: m.name,
        url: m.slug ? `https://sgindustrialproperties.com/team/${m.slug}` : `https://sgindustrialproperties.com/team#agent-${m.name.toLowerCase().replace(/\s+/g, '-')}`,
      },
    })),
  }

  return (
    <>
      <Helmet>
        <title>Our Team | James Goh R002565A & 20 CEA Registered Industrial Specialists | SG Industrial Properties & Group</title>
        <meta
          name="description"
          content="Meet the SG Industrial Properties & SG Industrial Group team. James Goh (R002565A), Team Leader and Industrial Specialist, leads 20 CEA registered industrial specialists including Caroline Chan (R046614C), Alvin Lim (R042513G), Amanda Chuah (R056404H), David Yong (R056841H), Greenie Choo (R023447A), Jimmy Ng (R009588I), John Suar (R009496C), Ken Ng (R024280F), Lee Geok Chew (R023491I), Maverick Cheng (R016259D), Moon Lai (R062936J), Paul Tan (R024959B), Shaun Quai (R073861I), Simon Tham (R023257F), SK Lee (R065066G), Stella Ng (R016155E), Sunny Chua (R052568I), Teressa Tang (R019925J), Theresa Tan (R052724Z). Specialising in Singapore industrial property for sale and rent with No ABSD."
        />
        <meta
          name="keywords"
          content="james goh r002565a, caroline chan r046614c, alvin lim r042513g, amanda chuah r056404h, david yong r056841h, greenie choo r023447a, jimmy ng r009588i, john suar r009496c, ken ng r024280f, lee geok chew r023491i, maverick cheng r016259d, moon lai r062936j, paul tan r024959b, shaun quai r073861i, simon tham r023257f, sk lee r065066g, stella ng r016155e, sunny chua r052568i, teressa tang r019925j, theresa tan r052724z, sg industrial properties, sg industrial group, cea registered property agent singapore, industrial property agent singapore, industrial property consultant singapore, industrial specialist singapore, property agent singapore, industrial real estate agent, b1 b2 factory agent, warehouse agent singapore, industrial property for sale, industrial property for rent, no absd, new launch, gate+, ct gold, generations@tannery, gourmet xchange"
        />
        <link rel="canonical" href="https://sgindustrialproperties.com/team" />
        <meta property="og:title" content="Our Team | 20 CEA Registered Property Agents | SG Industrial Properties & Group" />
        <meta property="og:description" content="Meet James Goh R002565A and 20 CEA registered industrial specialists at SG Industrial Properties & SG Industrial Group. Verified CEA licence numbers. Singapore industrial property specialists. Industrial property for sale and rent with No ABSD." />
        <meta property="og:url" content="https://sgindustrialproperties.com/team" />
        <meta property="og:type" content="website" />
      </Helmet>

      <TeamHero />
      <TeamLeader />
      <AgentsGrid />
      <CEAInfo />

      {/* Breadcrumb Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sgindustrialproperties.com' },
          { '@type': 'ListItem', position: 2, name: 'Our Team', item: 'https://sgindustrialproperties.com/team' },
        ],
      })}} />

      {/* Person Schemas for each agent */}
      {personSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Team ItemList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }} />

      {/* FAQPage Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Who are the property agents at SG Industrial Properties?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SG Industrial Properties & SG Industrial Group has 21 CEA registered property agents led by Team Leader James Goh (R002565A). The team includes Caroline Chan (R046614C), Alvin Lim (R042513G), Amanda Chuah (R056404H), David Yong (R056841H), Freddy Choo, Greenie Choo (R023447A), Jimmy Ng (R009588I), John Suar (R009496C), Ken Ng (R024280F), Lee Geok Chew (R023491I), Maverick Cheng (R016259D), Moon Lai (R062936J), Paul Tan (R024959B), Shaun Quai (R073861I), Simon Tham (R023257F), SK Lee (R065066G), Stella Ng (R016155E), Sunny Chua (R052568I), Teressa Tang (R019925J), and Theresa Tan (R052724Z). All specialise in Singapore industrial property for sale and rent with No ABSD.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who is James Goh R002565A?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'James Goh (CEA Registration No: R002565A) is the Team Leader and Industrial Specialist at SG Industrial Properties & SG Industrial Group. With 15+ years of experience in Singapore industrial property, he has facilitated over S$500 million in transactions and leads a team of 20 CEA registered industrial specialists.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does SG Industrial Properties sell industrial property with No ABSD?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, SG Industrial Properties & SG Industrial Group specialise in industrial property for sale and rent with No ABSD. All B1 and B2 industrial properties, warehouses, factories, and business parks in Singapore are exempt from Additional Buyer\'s Stamp Duty (ABSD), making them highly attractive investment options.',
            },
          },
        ],
      })}} />
    </>
  )
}
