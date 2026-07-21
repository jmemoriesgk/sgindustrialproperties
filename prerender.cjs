/**
 * Prerender Script for SEO
 * Generates static HTML files for each route with proper meta tags
 * Run after Vite build: node prerender.cjs
 */

const fs = require('fs')
const path = require('path')

const DIST_DIR = path.resolve(__dirname, 'dist')
const INDEX_HTML = path.join(DIST_DIR, 'index.html')

// Read the built index.html
let baseHtml = fs.readFileSync(INDEX_HTML, 'utf-8')

// Read listings data
const listingsData = JSON.parse(fs.readFileSync(path.join(DIST_DIR, 'listings', 'data.json'), 'utf-8'))

// Agents data will be embedded inline for prerendering
// We skip requiring TypeScript files in CommonJS

// Helper: replace meta tags in HTML
function generatePageHtml({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  structuredData = null,
  noscriptContent = null,
  breadcrumbs = null
}) {
  let html = baseHtml

  // Replace title
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)

  // Replace meta description
  html = html.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${description}"`)

  // Replace meta keywords
  html = html.replace(/<meta name="keywords" content=".*?"/, `<meta name="keywords" content="${keywords}"`)

  // Replace canonical
  html = html.replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="${canonical}"`)

  // Replace OG tags
  html = html.replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${ogTitle || title}"`)
  html = html.replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${ogDescription || description}"`)
  if (ogImage) {
    html = html.replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${ogImage}"`)
  }
  html = html.replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="${ogUrl || canonical}"`)

  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:title" content=".*?"/, `<meta name="twitter:title" content="${ogTitle || title}"`)
  html = html.replace(/<meta name="twitter:description" content=".*?"/, `<meta name="twitter:description" content="${ogDescription || description}"`)
  if (ogImage) {
    html = html.replace(/<meta name="twitter:image" content=".*?"/, `<meta name="twitter:image" content="${ogImage}"`)
  }
  html = html.replace(/<meta name="twitter:url" content=".*?"/, `<meta name="twitter:url" content="${ogUrl || canonical}"`)

  // Replace structured data if provided
  if (structuredData) {
    // Replace the RealEstateAgent structured data
    html = html.replace(
      /<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "RealEstateAgent"[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n    ${JSON.stringify(structuredData, null, 2)}\n    </script>`
    )
  }

  // Replace breadcrumb if provided
  if (breadcrumbs) {
    html = html.replace(
      /<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "BreadcrumbList"[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n    ${JSON.stringify(breadcrumbs, null, 2)}\n    </script>`
    )
  }

  // Replace noscript content
  if (noscriptContent) {
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n      ${noscriptContent}\n    </noscript>`)
  }

  return html
}

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Write HTML file
function writeHtml(filePath, html) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, html)
  console.log(`Generated: ${filePath}`)
}

// =====================
// Generate Pages
// =====================

console.log('Starting prerender...\n')

// 1. Homepage (already good, just copy)
console.log('--- Homepage ---')
// Homepage is already good in index.html

// 2. Listings Page
console.log('--- Listings Page ---')
const listingsHtml = generatePageHtml({
  title: 'Industrial Property Listings Singapore | For Sale & Rent | SG Industrial Properties',
  description: 'Browse industrial properties for sale in Singapore. B1/B2 factories, warehouses, food hubs. Filter by district, type, price, size. No ABSD. Contact James Goh R002565A +65 9768 7722.',
  keywords: 'industrial property for sale singapore, b1 industrial, b2 factory, warehouse for sale, food hub, ramp up factory, commercial property, no absd, sg industrial properties',
  canonical: 'https://sgindustrialproperties.com/listings',
  ogUrl: 'https://sgindustrialproperties.com/listings',
  noscriptContent: `<h1>Industrial Property Listings Singapore</h1>
      <p>Browse ${listingsData.length} industrial properties for sale in Singapore. B1/B2 factories, warehouses, food hubs. All properties come with No ABSD.</p>
      <h2>Featured Listings</h2>
      <ul>
        ${listingsData.map(l => `<li><strong>${l.name}</strong> — ${l.priceDisplay} | ${l.sizeDisplay} | ${l.address} | ${l.type}</li>`).join('\n        ')}
      </ul>
      <p>Contact James Goh R002565A at +65 9768 7722 for enquiries.</p>`
})
writeHtml(path.join(DIST_DIR, 'listings', 'index.html'), listingsHtml)

// 3. Individual Listing Pages
console.log('--- Listing Detail Pages ---')
listingsData.forEach(listing => {
  const listingHtml = generatePageHtml({
    title: listing.metaTitle,
    description: listing.metaDescription,
    keywords: `${listing.type} singapore, ${listing.districtCode} industrial, ${listing.address}, industrial property for sale, no absd, ${listing.agent.toLowerCase()}`,
    canonical: `https://sgindustrialproperties.com/listings/${listing.slug}`,
    ogUrl: `https://sgindustrialproperties.com/listings/${listing.slug}`,
    ogImage: `https://sgindustrialproperties.com${listing.photos[0]}`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: listing.name,
      description: listing.description,
      url: `https://sgindustrialproperties.com/listings/${listing.slug}`,
      datePosted: listing.dateAdded,
      price: listing.priceDisplay,
      priceCurrency: 'SGD',
      address: {
        '@type': 'PostalAddress',
        streetAddress: listing.address,
        addressCountry: 'SG',
        addressLocality: 'Singapore'
      },
      floorSize: {
        '@type': 'QuantitativeValue',
        value: listing.size,
        unitCode: 'SQF'
      },
      propertyType: listing.type,
      broker: {
        '@type': 'RealEstateAgent',
        name: listing.agent,
        identifier: listing.agentCea,
        telephone: listing.agentPhone,
        url: 'https://sgindustrialproperties.com'
      }
    },
    noscriptContent: `<h1>${listing.name}</h1>
      <p><strong>Price:</strong> ${listing.priceDisplay} | <strong>Size:</strong> ${listing.sizeDisplay} | <strong>Type:</strong> ${listing.type}</p>
      <p><strong>Address:</strong> ${listing.address}, ${listing.district}</p>
      <p><strong>Status:</strong> ${listing.status}</p>
      <p>${listing.description}</p>
      <h2>Features</h2>
      <ul>${listing.features.map(f => `<li>${f}</li>`).join('')}</ul>
      <p><strong>Agent:</strong> ${listing.agent} (${listing.agentCea}) | <strong>Phone:</strong> ${listing.agentPhone}</p>`
  })
  writeHtml(path.join(DIST_DIR, 'listings', listing.slug, 'index.html'), listingHtml)
})

// 4. Launches Page
console.log('--- Launches Page ---')
const launchesHtml = generatePageHtml({
  title: 'Industrial New Launch 2026 Singapore | B2 Factory & B1 Unit | SG Industrial Properties',
  description: 'Latest industrial new launches in Singapore 2026. Gate+ Tukang, CT Gold Macpherson, Generations@Tannery, Gourmet Xchange Kallang, SPACE@18, Space Nova. No ABSD. Contact James Goh +65 9768 7722.',
  keywords: 'industrial new launch singapore 2026, b2 factory new launch, b1 industrial new project, gate+, ct gold, generations@tannery, gourmet xchange, space@18, space nova, no absd',
  canonical: 'https://sgindustrialproperties.com/launches',
  ogUrl: 'https://sgindustrialproperties.com/launches',
  noscriptContent: `<h1>Industrial New Launch Singapore 2026</h1>
      <p>Discover the latest industrial new launches in Singapore. Featured projects include Gate+ at Tukang Jurong, CT Gold at Macpherson, Generations@Tannery, Gourmet Xchange at Kallang Way, SPACE@18, and Space Nova. All industrial properties come with No ABSD.</p>
      <p>Contact SG Industrial Properties led by James Goh R002565A at +65 9768 7722 for priority registration.</p>`
})
writeHtml(path.join(DIST_DIR, 'launches', 'index.html'), launchesHtml)

// 5. Properties Page
console.log('--- Properties Page ---')
const propertiesHtml = generatePageHtml({
  title: 'Industrial Properties Singapore | B1 B2 Factory Warehouse Directory | SG Industrial Properties',
  description: 'Complete directory of industrial properties in Singapore. B1 light industrial, B2 heavy factory, warehouse, ramp-up, terrace units across all districts. No ABSD. Contact James Goh +65 9768 7722.',
  keywords: 'industrial properties singapore, b1 industrial directory, b2 factory list, warehouse singapore, industrial property database, no absd',
  canonical: 'https://sgindustrialproperties.com/properties',
  ogUrl: 'https://sgindustrialproperties.com/properties',
  noscriptContent: `<h1>Industrial Properties Singapore Directory</h1>
      <p>Browse our comprehensive directory of industrial properties across Singapore. B1 light industrial units, B2 heavy factories, warehouses, ramp-up units, and terrace factories in Tuas, Jurong, Woodlands, Changi, Paya Lebar, and more.</p>
      <p>Contact SG Industrial Properties at +65 9768 7722.</p>`
})
writeHtml(path.join(DIST_DIR, 'properties', 'index.html'), propertiesHtml)

// 6. About Page
console.log('--- About Page ---')
const aboutHtml = generatePageHtml({
  title: 'About SG Industrial Properties | James Goh R002565A | 21 CEA Agents',
  description: 'SG Industrial Properties & SG Industrial Group specialise in industrial property Singapore. Led by James Goh R002565A with 21 CEA registered agents. 15+ years experience, S$500M+ transactions. No ABSD.',
  keywords: 'sg industrial properties about, james goh r002565a, industrial property agent singapore, cea registered agent, sg industrial group, industrial property specialist',
  canonical: 'https://sgindustrialproperties.com/about',
  ogUrl: 'https://sgindustrialproperties.com/about',
  noscriptContent: `<h1>About SG Industrial Properties</h1>
      <p>SG Industrial Properties & SG Industrial Group is Singapore's leading industrial property specialist agency. Led by James Goh (R002565A) with 21 CEA registered industrial property agents.</p>
      <p>With 15+ years of experience and over S$500 million in transactions, we specialise in B1 and B2 industrial properties, warehouses, factories, and new launches across all Singapore districts.</p>
      <p>Contact us at +65 9768 7722.</p>`
})
writeHtml(path.join(DIST_DIR, 'about', 'index.html'), aboutHtml)

// 7. Team Page
console.log('--- Team Page ---')
const teamHtml = generatePageHtml({
  title: 'Our Team | 21 CEA Registered Industrial Property Agents | SG Industrial Properties',
  description: 'Meet our team of 21 CEA registered industrial property specialists. Led by James Goh R002565A. Caroline Chan, Alvin Lim, Amanda Chuah, David Yong, and more. Call +65 9768 7722.',
  keywords: 'industrial property agent singapore, james goh team, cea registered agent, caroline chan, alvin lim, amanda chuah, david yong, sg industrial properties team',
  canonical: 'https://sgindustrialproperties.com/team',
  ogUrl: 'https://sgindustrialproperties.com/team',
  noscriptContent: `<h1>Our Team — 21 CEA Registered Industrial Property Agents</h1>
      <p>Led by James Goh (R002565A), our team of 21 CEA registered industrial property specialists covers all major Singapore industrial districts including Tuas, Jurong, Woodlands, Changi, Paya Lebar, and Kaki Bukit.</p>
      <p>Contact us at +65 9768 7722.</p>`
})
writeHtml(path.join(DIST_DIR, 'team', 'index.html'), teamHtml)

// 8. Blog Page
console.log('--- Blog Page ---')
const blogHtml = generatePageHtml({
  title: 'Industrial Property Blog Singapore | B1 B2 Guides | SG Industrial Properties',
  description: 'Read our industrial property blog for Singapore market insights, B1 vs B2 guides, No ABSD strategies, new launch updates, and investment tips from James Goh R002565A.',
  keywords: 'industrial property blog singapore, b1 vs b2 guide, no absd industrial, property investment tips, industrial new launch update',
  canonical: 'https://sgindustrialproperties.com/blog',
  ogUrl: 'https://sgindustrialproperties.com/blog',
  noscriptContent: `<h1>Industrial Property Blog Singapore</h1>
      <p>Stay updated with the latest industrial property insights in Singapore. Read our guides on B1 vs B2 industrial property, No ABSD strategies, new launch updates, and investment tips from our team of specialists.</p>
      <p>Contact SG Industrial Properties at +65 9768 7722.</p>`
})
writeHtml(path.join(DIST_DIR, 'blog', 'index.html'), blogHtml)

console.log('\nPrerender complete! Static HTML files generated for all routes.')
console.log('Google will now see unique content for each page.')
