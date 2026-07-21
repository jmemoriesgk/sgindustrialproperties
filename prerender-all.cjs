/**
 * Extended Prerender Script — generates static HTML for ALL routes
 * Run after Vite build: node prerender-all.cjs
 */

const fs = require('fs')
const path = require('path')

const DIST_DIR = path.resolve(__dirname, 'dist')
const INDEX_HTML = path.join(DIST_DIR, 'index.html')
let baseHtml = fs.readFileSync(INDEX_HTML, 'utf-8')
const listingsData = JSON.parse(fs.readFileSync(path.join(DIST_DIR, 'listings', 'data.json'), 'utf-8'))

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function writeHtml(filePath, html) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, html)
}

function generatePageHtml({ title, description, keywords, canonical, ogImage, noscriptContent }) {
  let html = baseHtml
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
  html = html.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${description}"`)
  html = html.replace(/<meta name="keywords" content=".*?"/, `<meta name="keywords" content="${keywords}"`)
  html = html.replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="${canonical}"`)
  html = html.replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${title}"`)
  html = html.replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${description}"`)
  html = html.replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="${canonical}"`)
  if (ogImage) html = html.replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${ogImage}"`)
  html = html.replace(/<meta name="twitter:title" content=".*?"/, `<meta name="twitter:title" content="${title}"`)
  html = html.replace(/<meta name="twitter:description" content=".*?"/, `<meta name="twitter:description" content="${description}"`)
  html = html.replace(/<meta name="twitter:url" content=".*?"/, `<meta name="twitter:url" content="${canonical}"`)
  if (ogImage) html = html.replace(/<meta name="twitter:image" content=".*?"/, `<meta name="twitter:image" content="${ogImage}"`)
  if (noscriptContent) html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n      ${noscriptContent}\n    </noscript>`)
  return html
}

// Parse TypeScript array exports by extracting JSON-like objects
function parseTsArray(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const match = content.match(/export const \w+:\s*\w+\[\]\s*=\s*(\[)/)
  if (!match) return []
  
  // Extract slugs using regex
  const slugs = []
  const slugMatches = content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)
  for (const m of slugMatches) slugs.push(m[1])
  
  // Extract names/titles
  const names = []
  const nameMatches = content.matchAll(/(?:name|title):\s*['"]([^'"]+)['"]/g)
  for (const m of nameMatches) names.push(m[1])
  
  return slugs.map((slug, i) => ({ slug, name: names[i] || slug }))
}

console.log('=== PRERENDERING ALL PAGES ===\n')

// ─── Static Pages ───
const pages = [
  { dir: 'listings', title: 'Industrial Property Listings Singapore | For Sale & Rent | SG Industrial Properties', desc: `Browse ${listingsData.length} industrial properties for sale in Singapore. B1/B2 factories, warehouses, food hubs. Filter by district, type, price. No ABSD.`, kw: 'industrial property for sale singapore, b1 industrial, b2 factory, warehouse for sale, food hub, no absd', canonical: 'https://sgindustrialproperties.com/listings' },
  { dir: 'launches', title: 'Industrial New Launch 2026 Singapore | B2 Factory & B1 Unit | SG Industrial Properties', desc: 'Latest industrial new launches in Singapore 2026. Gate+ Tukang, CT Gold Macpherson, Generations@Tannery, Gourmet Xchange Kallang, SPACE@18, Space Nova. No ABSD.', kw: 'industrial new launch singapore 2026, b2 factory new launch, b1 industrial new project, gate+, ct gold, no absd', canonical: 'https://sgindustrialproperties.com/launches' },
  { dir: 'properties', title: 'Industrial Properties Singapore | B1 B2 Factory Warehouse Directory | SG Industrial Properties', desc: 'Complete directory of industrial properties in Singapore. B1 light industrial, B2 heavy factory, warehouse, ramp-up, terrace units across all districts. No ABSD.', kw: 'industrial properties singapore, b1 industrial directory, b2 factory list, warehouse singapore', canonical: 'https://sgindustrialproperties.com/properties' },
  { dir: 'about', title: 'About SG Industrial Properties | James Goh R002565A | 21 CEA Agents', desc: 'SG Industrial Properties & SG Industrial Group specialise in industrial property Singapore. Led by James Goh R002565A with 21 CEA registered agents. 15+ years experience.', kw: 'sg industrial properties about, james goh r002565a, industrial property agent singapore, cea registered agent', canonical: 'https://sgindustrialproperties.com/about' },
  { dir: 'team', title: 'Our Team | 21 CEA Registered Industrial Property Agents | SG Industrial Properties', desc: 'Meet our team of 21 CEA registered industrial property specialists. Led by James Goh R002565A. Caroline Chan, Alvin Lim, Amanda Chuah, David Yong, and more.', kw: 'industrial property agent singapore, james goh team, cea registered agent, caroline chan, alvin lim', canonical: 'https://sgindustrialproperties.com/team' },
  { dir: 'blog', title: 'Industrial Property Blog Singapore | B1 B2 Guides | SG Industrial Properties', desc: 'Read our industrial property blog for Singapore market insights, B1 vs B2 guides, No ABSD strategies, new launch updates, and investment tips.', kw: 'industrial property blog singapore, b1 vs b2 guide, no absd industrial, property investment tips', canonical: 'https://sgindustrialproperties.com/blog' },
]

pages.forEach(p => {
  const html = generatePageHtml({
    title: p.title, description: p.desc, keywords: p.kw, canonical: p.canonical,
    noscriptContent: `<h1>${p.title.split('|')[0].trim()}</h1><p>${p.desc}</p><p>Contact SG Industrial Properties at +65 9768 7722.</p>`
  })
  writeHtml(path.join(DIST_DIR, p.dir, 'index.html'), html)
  console.log(`✓ /${p.dir}/`)
})

// ─── Listing Detail Pages ───
listingsData.forEach(l => {
  const html = generatePageHtml({
    title: l.metaTitle, description: l.metaDescription,
    keywords: `${l.type} singapore, ${l.districtCode} industrial, ${l.address}, industrial property for sale, no absd, ${l.agent.toLowerCase()}`,
    canonical: `https://sgindustrialproperties.com/listings/${l.slug}`,
    ogImage: `https://sgindustrialproperties.com${l.photos[0]}`,
    noscriptContent: `<h1>${l.name}</h1><p><strong>Price:</strong> ${l.priceDisplay} | <strong>Size:</strong> ${l.sizeDisplay} | <strong>Type:</strong> ${l.type}</p><p><strong>Address:</strong> ${l.address}, ${l.district}</p><p>${l.description}</p><p><strong>Agent:</strong> ${l.agent} (${l.agentCea}) | <strong>Phone:</strong> ${l.agentPhone}</p>`
  })
  writeHtml(path.join(DIST_DIR, 'listings', l.slug, 'index.html'), html)
  console.log(`✓ /listings/${l.slug}/`)
})

// ─── Agent Pages ───
const agentsSrc = fs.readFileSync(path.join(__dirname, 'src/data/agents.ts'), 'utf-8')
const agentSlugs = [...agentsSrc.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1])
const agentNames = [...agentsSrc.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map(m => m[1])
const agentRoles = [...agentsSrc.matchAll(/role:\s*['"]([^'"]+)['"]/g)].map(m => m[1])
const agentBios = [...agentsSrc.matchAll(/bio:\s*['"]([^'"]+)['"]/g)].map(m => m[1])

agentSlugs.forEach((slug, i) => {
  const name = agentNames[i] || slug
  const role = agentRoles[i] || 'Industrial Specialist'
  const bio = agentBios[i] || ''
  const html = generatePageHtml({
    title: `${name} — ${role} | SG Industrial Properties`,
    description: `${name} — ${role} at SG Industrial Properties. ${bio.substring(0, 150)}...`,
    keywords: `${name.toLowerCase()} industrial property agent singapore, ${role.toLowerCase()}, cea registered agent`,
    canonical: `https://sgindustrialproperties.com/team/${slug}`,
    noscriptContent: `<h1>${name} — ${role}</h1><p>${bio.substring(0, 300)}...</p><p>Contact SG Industrial Properties at +65 9768 7722.</p>`
  })
  writeHtml(path.join(DIST_DIR, 'team', slug, 'index.html'), html)
  console.log(`✓ /team/${slug}/`)
})

// ─── Building Pages ───
const buildingsSrc = fs.readFileSync(path.join(__dirname, 'src/data/buildingLibrary.ts'), 'utf-8')
const buildingSlugs = [...buildingsSrc.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1])
const buildingNames = [...buildingsSrc.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map(m => m[1])
const buildingTypes = [...buildingsSrc.matchAll(/type:\s*['"]([^'"]+)['"]/g)].map(m => m[1])
const buildingAddresses = [...buildingsSrc.matchAll(/address:\s*['"]([^'"]+)['"]/g)].map(m => m[1])

buildingSlugs.forEach((slug, i) => {
  const name = buildingNames[i] || slug
  const type = buildingTypes[i] || 'Industrial Property'
  const address = buildingAddresses[i] || 'Singapore'
  const html = generatePageHtml({
    title: `${name} — ${type} | SG Industrial Properties`,
    description: `${name} — ${type} located at ${address}. Industrial property information and specifications.`,
    keywords: `${name.toLowerCase()} industrial property singapore, ${type.toLowerCase()}, ${address.toLowerCase()}`,
    canonical: `https://sgindustrialproperties.com/properties/${slug}`,
    noscriptContent: `<h1>${name}</h1><p><strong>Type:</strong> ${type}</p><p><strong>Address:</strong> ${address}</p><p>Contact SG Industrial Properties at +65 9768 7722 for enquiries about this property.</p>`
  })
  writeHtml(path.join(DIST_DIR, 'properties', slug, 'index.html'), html)
  console.log(`✓ /properties/${slug}/`)
})

// ─── Blog Post Pages ───
const blogSrc = fs.readFileSync(path.join(__dirname, 'src/data/blogPosts.ts'), 'utf-8')
const blogSlugs = [...blogSrc.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1])
const blogTitles = [...blogSrc.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1])
const blogExcerpts = [...blogSrc.matchAll(/excerpt:\s*['"]([^'"]+)['"]/g)].map(m => m[1])

blogSlugs.forEach((slug, i) => {
  const title = blogTitles[i] || slug
  const excerpt = blogExcerpts[i] || ''
  const html = generatePageHtml({
    title: `${title} | SG Industrial Properties Blog`,
    description: excerpt.substring(0, 160),
    keywords: 'industrial property singapore, b1 b2 factory, warehouse, no absd, investment',
    canonical: `https://sgindustrialproperties.com/blog/${slug}`,
    noscriptContent: `<h1>${title}</h1><p>${excerpt.substring(0, 300)}...</p><p>Read the full article on SG Industrial Properties blog.</p>`
  })
  writeHtml(path.join(DIST_DIR, 'blog', slug, 'index.html'), html)
  console.log(`✓ /blog/${slug}/`)
})

// Count total
totalPages = pages.length + listingsData.length + agentSlugs.length + buildingSlugs.length + blogSlugs.length
console.log(`\n=== DONE: ${totalPages} prerendered pages ===`)
console.log('Google will now see unique content for each URL.')
