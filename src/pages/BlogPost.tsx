import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link, Navigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, ArrowLeft, Clock, User, ArrowRight } from 'lucide-react'
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts'

gsap.registerPlugin(ScrollTrigger)

/* ─────────── Blog Post Content ─────────── */
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const contentRef = useRef<HTMLDivElement>(null)
  const relatedRef = useRef<HTMLDivElement>(null)

  const post = getPostBySlug(slug || '')
  const relatedPosts = post ? getRelatedPosts(post.slug, 3) : []

  // If post not found or not yet published, redirect to blog listing
  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const readTime = Math.ceil(post.content.split(' ').length / 200)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!contentRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.blog-content h2', {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current!, start: 'top 80%' },
      })
    }, contentRef.current)
    return () => ctx.revert()
  }, [slug])

  useEffect(() => {
    if (!relatedRef.current || relatedPosts.length === 0) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.related-post-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: relatedRef.current!, start: 'top 85%' },
        }
      )
    }, relatedRef.current)
    return () => ctx.revert()
  }, [slug, relatedPosts.length])

  // FAQ schema from content if available
  const faqSchema = post.schemaType === 'FAQPage' ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${post.title.split('—')[0].trim()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: post.excerpt,
        },
      },
    ],
  } : null

  // Article/BlogPosting schema
  const articleSchema = {
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
    articleSection: post.tags[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sgindustrialproperties.com/blog/${post.slug}`,
    },
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | SG Industrial Properties & Group Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={`https://sgindustrialproperties.com/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} | SG Industrial Properties Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://sgindustrialproperties.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`https://sgindustrialproperties.com${post.image}`} />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.tags[0]} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Helmet>

      {/* Hero */}
      <section className="relative w-full flex items-end" style={{ height: '55vh', minHeight: 350 }}>
        <img
          src={post.image}
          alt={post.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(23,23,28,0.95) 0%, rgba(23,23,28,0.4) 60%, transparent 100%)',
          }}
        />
        <div className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-12">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 font-sans text-sm mb-4 transition-colors hover:text-[#4A3E3D]"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                className="font-sans text-[10px] font-semibold px-3 py-1 rounded-full transition-colors hover:opacity-80"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }}
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1
            className="font-serif text-white font-semibold mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.5px', lineHeight: 1.15 }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <User size={14} style={{ color: 'rgba(255,255,255,0.7)' }} />
              <span className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {post.author}{post.authorCEA ? ` (${post.authorCEA})` : ''}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
              <span className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {formatDate(post.publishDate)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
              <span className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {readTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ backgroundColor: '#F7F5F0' }} className="py-16">
        <div className="max-w-[800px] mx-auto px-6">
          <div
            ref={contentRef}
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Box */}
          <div
            className="mt-12 rounded-xl p-8 text-center"
            style={{ backgroundColor: '#1C1A17' }}
          >
            <h3 className="font-serif text-xl text-white font-medium mb-3">
              Interested in This Property?
            </h3>
            <p className="font-sans text-sm mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Contact SG Industrial Properties & SG Industrial Group for a free consultation.
              Our 21 CEA registered specialists are ready to help.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="tel:+6597687722" className="btn-bronze">
                Call +65 9768 7722
              </a>
              <a
                href="https://www.privyr.com/form/1U3bZG2k#sg-industrial-enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Enquire Online
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section ref={relatedRef} style={{ backgroundColor: '#fff' }} className="py-20">
          <div className="max-w-[1128px] mx-auto px-6">
            <h2 className="font-serif text-3xl font-medium mb-8" style={{ color: '#1C1A17' }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <article
                  key={rp.id}
                  className="related-post-card rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                  style={{ border: '1px solid #E8E4DC' }}
                >
                  <Link to={`/blog/${rp.slug}`} className="block">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={rp.image}
                        alt={rp.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-mono text-[10px] uppercase mb-2" style={{ color: '#4A3E3D' }}>
                        {rp.tags[0]}
                      </p>
                      <h3 className="font-serif text-lg font-medium mb-2 leading-snug" style={{ color: '#1C1A17' }}>
                        {rp.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-3" style={{ color: '#1C1A17' }}>
                        <span className="font-sans text-xs">Read Article</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BlogPosting Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* FAQ Schema if applicable */}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sgindustrialproperties.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://sgindustrialproperties.com/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: `https://sgindustrialproperties.com/blog/${post.slug}` },
        ],
      })}} />
    </>
  )
}
