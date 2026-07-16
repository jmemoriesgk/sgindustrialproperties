import listingsData from '../../public/listings/data.json'

export interface Listing {
  id: string
  slug: string
  name: string
  type: string
  status: 'available' | 'sold' | 'rented' | 'withdrawn'
  price: number
  priceDisplay: string
  size: number
  sizeDisplay: string
  tenure: string
  address: string
  district: string
  districtCode: string
  description: string
  features: string[]
  powerSupply: string
  ceilingHeight: string
  floorLoading: string
  developer: string
  totalUnits: number
  unitsSold: number
  topDate: string
  nearbyMRT: string[]
  nearbyExpressway: string[]
  agent: string
  agentCea: string
  agentPhone: string
  agentPhoto: string
  photos: string[]
  floorplans: string[]
  brochure: string
  tags: string[]
  suitableFor: string[]
  metaTitle: string
  metaDescription: string
  dateAdded: string
}

export const listings: Listing[] = listingsData as Listing[]

export const districts = [
  'D12 — Balestier / Whampoa',
  'D13 — Macpherson / Potong Pasir',
  'D14 — Geylang / Eunos',
  'D19 — Hougang / Serangoon',
  'D22 — Tuas / Jurong',
]

export const propertyTypes = [
  'B1 Clean Industrial',
  'B1/B2 Mixed-Use',
  'B2 Factory',
  'B2 Food Hub',
]

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find(l => l.slug === slug)
}

export function getRelatedListings(currentId: string, districtCode: string, limit = 3): Listing[] {
  return listings.filter(l => l.id !== currentId && l.districtCode === districtCode).slice(0, limit)
}
