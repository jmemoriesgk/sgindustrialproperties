import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import { getPublishedPosts } from '../data/blogPosts'

gsap.registerPlugin(ScrollTrigger)

/* ─────────── Blog Hero ─────────── */
function BlogHero() {
  return (
    <section
      className="relative w-full flex items-end"
      style={{ height: '60vh', minHeight: 400 }}
    >
      <img
        src="/images/singapore-skyline.jpg"
        alt="Singapore industrial district skyline - SG Industrial Properties blog"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(23,23,28,0.95) 0%, rgba(23,23,28,0.5) 60%, transparent 100%)',
        }}
      />
      <div className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-12">
        <span
          className="inline-block font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4"
          style={{ backgroundColor: '#4A3E3D', color: '#1C1A17' }}
        >
          INDUSTRIAL PROPERTY INSIGHTS
        </span>
        <h1
          className="font-serif text-white font-semibold mb-4"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-1px', lineHeight: 1.1 }}
        >
          SG Industrial Blog
        </h1>
        <p className="font-sans text-base max-w-[600px]" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Expert insights on Singapore industrial property — new launches, investment guides,
          No ABSD strategies, B1 & B2 factory tips, and market trends from James Goh R002565A
          and the SG Industrial Properties & SG Industrial Group team.
        </p>
      </div>
    </section>
  )
}

/* ─────────── Blog Card ─────────── */
function BlogCard({ post, index }: { post: ReturnType<typeof getPublishedPosts>[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current!, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current!,
          start: 'top 90%',
        },
      })
    }, cardRef.current)
    return () => ctx.revert()
  }, [index])

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const readTime = Math.ceil(post.content.split(' ').length / 200)

  return (
    <article
      ref={cardRef}
      className="blog-card group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
      style={{ border: '1px solid #E8E4DC', backgroundColor: '#fff' }}
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="h-52 overflow-hidden">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-sans text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(246,180,107,0.12)', color: '#C45D8C' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="font-serif text-xl font-medium mb-3 leading-snug" style={{ color: '#1C1A17' }}>
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="font-sans text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: '#6B6560' }}>
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid #F7F5F0' }}>
            <div className="flex items-center gap-1.5">
              <Calendar size={12} style={{ color: '#6B6560' }} />
              <span className="font-mono text-[10px]" style={{ color: '#6B6560' }}>
                {formatDate(post.publishDate)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={12} style={{ color: '#6B6560' }} />
              <span className="font-mono text-[10px]" style={{ color: '#6B6560' }}>
                {readTime} min read
              </span>
            </div>
          </div>

          {/* Read more */}
          <div className="mt-4 flex items-center gap-1 font-sans text-sm font-medium transition-colors" style={{ color: '#4A3E3D' }}>
            Read More <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </article>
  )
}

/* ─────────── Tag Filter ─────────── */
function TagFilter({ activeTag, onTagChange }: { activeTag: string; onTagChange: (tag: string) => void }) {
  const posts = getPublishedPosts()
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)))

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={() => onTagChange('All')}
        className="font-sans text-sm font-medium px-4 py-2 rounded-full transition-all"
        style={{
          backgroundColor: activeTag === 'All' ? '#4A3E3D' : '#F7F5F0',
          color: activeTag === 'All' ? '#1C1A17' : '#6B6560',
        }}
      >
        All Topics
      </button>
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className="font-sans text-sm font-medium px-4 py-2 rounded-full transition-all"
          style={{
            backgroundColor: activeTag === tag ? '#4A3E3D' : '#F7F5F0',
            color: activeTag === tag ? '#1C1A17' : '#6B6560',
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

/* ─────────── Blog Listing Page ─────────── */
export default function Blog() {
  const [activeTag, setActiveTag] = useState('All')
  const sectionRef = useRef<HTMLDivElement>(null)

  const allPosts = getPublishedPosts()
  const filteredPosts = activeTag === 'All' ? allPosts : allPosts.filter((p) => p.tags.includes(activeTag))

  // FAQ schema for blog listing
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the latest industrial new launches in Singapore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The latest industrial new launches in Singapore for 2026 include Gate+ at Tukang Jurong (B2 ramp-up factory), CT Gold at Macpherson (B1/B2 mixed-use, 100% fully sold), Generations@Tannery at 71 Tannery Lane (freehold B1 industrial), and Gourmet Xchange at 1 Kallang Way (B2 food hub). All available with No ABSD through SG Industrial Properties & SG Industrial Group.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there ABSD on industrial property in Singapore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, there is No ABSD (Additional Buyer\'s Stamp Duty) on industrial property in Singapore. B1 and B2 factories, warehouses, and business parks are completely exempt from ABSD, making them highly attractive investments compared to residential property.',
        },
      },
    ],
  }

  return (
    <>
      <Helmet>
        <title>Industrial Property Blog Singapore | New Launch, No ABSD, B2 Factory Investment Tips | SG Industrial Properties</title>
        <meta
          name="description"
          content="SG Industrial Properties blog — expert insights on Singapore industrial property. Learn about new launches like Gate+, CT Gold, Generations@Tannery, Gourmet Xchange. No ABSD strategies, B1 vs B2 factory guides, and investment tips from James Goh R002565A."
        />
        <meta
          name="keywords"
          content="industrial property blog, new launch blog, no absd blog, b2 factory guide, warehouse investment tips, singapore industrial property guide, ct gold macpherson, generations@tannery, gourmet xchange kallang, gate+ jurong, industrial property for sale, industrial property for rent, james goh r002565a, sg industrial properties"
        />
        <link rel="canonical" href="https://sgindustrialproperties.com/blog" />
        <meta property="og:title" content="Industrial Property Blog Singapore | SG Industrial Properties & Group" />
        <meta property="og:description" content="Expert insights on Singapore industrial property — new launches, No ABSD strategies, B1 & B2 factory guides, investment tips from James Goh R002565A." />
        <meta property="og:url" content="https://sgindustrialproperties.com/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      <BlogHero />

      {/* Blog Listing */}
      <section ref={sectionRef} style={{ backgroundColor: '#F7F5F0' }} className="py-20">
        <div className="max-w-[1128px] mx-auto px-6">
          {/* Tag Filter */}
          <div className="mb-12">
            <TagFilter activeTag={activeTag} onTagChange={setActiveTag} />
          </div>

          {/* Blog Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-sans text-lg" style={{ color: '#6B6560' }}>
                No articles found for this topic yet. Check back soon for new content.
              </p>
            </div>
          )}

          {/* SEO Rich Text */}
          <div className="mt-20 pt-12" style={{ borderTop: '1px solid #E8E4DC' }}>
            <h2 className="font-serif text-2xl font-medium mb-4" style={{ color: '#1C1A17' }}>
              Singapore Industrial Property Resources
            </h2>
            <p className="font-sans text-base leading-relaxed" style={{ color: '#4A4540' }}>
              Welcome to the <strong>SG Industrial Properties & SG Industrial Group</strong> blog — your definitive resource for 
              <strong> Singapore industrial property </strong>information. Our articles cover everything from 
              <strong> industrial new launch </strong>announcements for projects like 
              <a href="/launches#gateplus">Gate+ at Tukang Jurong</a>, 
              <a href="/launches#ctgold">CT Gold at Macpherson</a>, 
              <a href="/launches#generations">Generations@Tannery at 71 Tannery Lane</a>, and 
              <a href="/launches#gxc">Gourmet Xchange at 1 Kallang Way</a>, to in-depth guides on 
              <strong> No ABSD </strong>investment strategies, <strong>B1 vs B2 industrial property</strong> comparisons, 
              and tips for both <strong>industrial property for sale</strong> and <strong>industrial property for rent</strong>.
              Written by our team of 21 CEA registered industrial specialists led by James Goh (R002565A).
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* BlogPosting Schema for each post */}
      {allPosts.map((post) => (
        <script key={post.id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          url: `https://sgindustrialproperties.com/blog/${post.slug}`,
          datePublished: post.publishDate,
          dateModified: post.publishDate,
          author: {
            '@type': 'Person',
            name: post.author,
            ...(post.authorCEA ? { identifier: post.authorCEA } : {}),
            url: `https://sgindustrialproperties.com/team`,
          },
          publisher: {
            '@type': 'RealEstateAgent',
            name: 'SG Industrial Properties',
            alternateName: 'SG Industrial Group',
            url: 'https://sgindustrialproperties.com',
            logo: 'https://sgindustrialproperties.com/images/SGIG_HighRes_Print.png',
          },
          image: `https://sgindustrialproperties.com${post.image}`,
          keywords: post.keywords,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://sgindustrialproperties.com/blog/${post.slug}`,
          },
        }) }} />
      ))}

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sgindustrialproperties.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://sgindustrialproperties.com/blog' },
        ],
      })}} />
    </>
  )
}
