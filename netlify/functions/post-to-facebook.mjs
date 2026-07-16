/**
 * Netlify Function: Auto-post listing changes to Facebook
 * 
 * Triggered after deploy. Compares current listings with previous version,
 * then posts updates to Facebook Page.
 * 
 * Required environment variables:
 * - FB_PAGE_TOKEN: Long-lived Facebook Page Access Token
 * - FB_PAGE_ID: Facebook Page ID (e.g. sgindustrialgroup)
 */

const FB_GRAPH_URL = 'https://graph.facebook.com/v18.0';

/**
 * Get the previous version of listings data from Netlify deploy cache
 */
async function getPreviousListings() {
  try {
    // In production, you'd fetch from a cache or previous deploy
    // For now, we'll read from a simple JSON cache file
    const cacheUrl = `${process.env.URL}/.netlify/functions/listings-cache`;
    const res = await fetch(cacheUrl);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Get current listings from the deployed site
 */
async function getCurrentListings() {
  try {
    const url = `${process.env.URL}/listings/data.json`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Post to Facebook Page
 */
async function postToFacebook(message, link = null) {
  const token = process.env.FB_PAGE_TOKEN;
  const pageId = process.env.FB_PAGE_ID;
  
  if (!token || !pageId) {
    console.log('Facebook posting skipped: missing FB_PAGE_TOKEN or FB_PAGE_ID');
    return { skipped: true, reason: 'Missing credentials' };
  }

  const body = {
    message,
    access_token: token,
  };

  if (link) {
    body.link = link;
  }

  const res = await fetch(`${FB_GRAPH_URL}/${pageId}/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(`Facebook API error: ${data.error?.message || 'Unknown error'}`);
  }

  return { success: true, postId: data.id };
}

/**
 * Detect changes between two listing arrays
 */
function detectChanges(previous, current) {
  if (!previous || !Array.isArray(previous)) previous = [];
  if (!current || !Array.isArray(current)) current = [];

  const changes = {
    new: [],
    sold: [],
    rented: [],
    priceChanged: [],
    statusChanged: [],
  };

  const prevMap = new Map(previous.map(l => [l.id, l]));
  const currMap = new Map(current.map(l => [l.id, l]));

  // Check for new listings
  for (const curr of current) {
    if (!prevMap.has(curr.id)) {
      changes.new.push(curr);
    } else {
      const prev = prevMap.get(curr.id);
      
      // Status changed to sold
      if (prev.status !== 'sold' && curr.status === 'sold') {
        changes.sold.push({ ...curr, previousStatus: prev.status });
      }
      
      // Status changed to rented
      if (prev.status !== 'rented' && curr.status === 'rented') {
        changes.rented.push({ ...curr, previousStatus: prev.status });
      }
      
      // Price changed
      if (prev.price !== curr.price) {
        changes.priceChanged.push({
          ...curr,
          oldPrice: prev.priceDisplay,
        });
      }
    }
  }

  return changes;
}

/**
 * Format Facebook post message
 */
function formatMessage(listing, type) {
  const baseUrl = process.env.URL || 'https://sgindustrialproperties.com';
  const listingUrl = `${baseUrl}/listings/${listing.slug}`;

  switch (type) {
    case 'new':
      return `🏭 NEW LISTING

${listing.name}
💰 ${listing.priceDisplay}
📍 ${listing.address}, ${listing.districtCode}
📐 ${listing.sizeDisplay}
🏷️ ${listing.type}

${listing.description.substring(0, 200)}...

👉 View details: ${listingUrl}

#SGIndustrialProperties #IndustrialProperty #Singapore #${listing.districtCode.replace(/\s/g, '')} #${listing.type.replace(/\s/g, '')}`;

    case 'sold':
      return `✅ SOLD

${listing.name}
📍 ${listing.address}

This property has been sold. Looking for similar properties in ${listing.districtCode}?

👉 Browse listings: ${baseUrl}/listings
📞 Contact us: +65 9768 7722

#SGIndustrialProperties #Sold #IndustrialProperty`;

    case 'rented':
      return `🔑 RENTED

${listing.name}
📍 ${listing.address}

This unit has been rented out. Want to find similar industrial spaces?

👉 Browse listings: ${baseUrl}/listings
📞 Contact us: +65 9768 7722

#SGIndustrialProperties #Rented #IndustrialProperty`;

    case 'price':
      return `📢 PRICE UPDATE

${listing.name}
💰 New Price: ${listing.priceDisplay}
📍 ${listing.address}, ${listing.districtCode}

👉 View details: ${listingUrl}
📞 Enquire: +65 9768 7722

#SGIndustrialProperties #PriceUpdate`;

    default:
      return `🏭 SG Industrial Properties

${listing.name}
💰 ${listing.priceDisplay}
📍 ${listing.address}

${listingUrl}`;
  }
}

/**
 * Main handler — triggered by deploy-succeeded webhook
 */
export default async (req) => {
  // Only accept POST requests from Netlify
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const previous = await getPreviousListings();
    const current = await getCurrentListings();

    if (!current) {
      return new Response(JSON.stringify({ error: 'Could not fetch current listings' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const changes = detectChanges(previous, current);
    const results = [];

    // Post new listings
    for (const listing of changes.new) {
      try {
        const message = formatMessage(listing, 'new');
        const result = await postToFacebook(message);
        results.push({ type: 'new', listing: listing.name, ...result });
      } catch (err) {
        results.push({ type: 'new', listing: listing.name, error: err.message });
      }
    }

    // Post sold listings
    for (const listing of changes.sold) {
      try {
        const message = formatMessage(listing, 'sold');
        const result = await postToFacebook(message);
        results.push({ type: 'sold', listing: listing.name, ...result });
      } catch (err) {
        results.push({ type: 'sold', listing: listing.name, error: err.message });
      }
    }

    // Post rented listings
    for (const listing of changes.rented) {
      try {
        const message = formatMessage(listing, 'rented');
        const result = await postToFacebook(message);
        results.push({ type: 'rented', listing: listing.name, ...result });
      } catch (err) {
        results.push({ type: 'rented', listing: listing.name, error: err.message });
      }
    }

    // Post price changes
    for (const listing of changes.priceChanged) {
      try {
        const message = formatMessage(listing, 'price');
        const result = await postToFacebook(message);
        results.push({ type: 'price', listing: listing.name, ...result });
      } catch (err) {
        results.push({ type: 'price', listing: listing.name, error: err.message });
      }
    }

    // Log results
    console.log('Facebook posting results:', JSON.stringify(results, null, 2));

    return new Response(JSON.stringify({ 
      success: true, 
      changes: {
        new: changes.new.length,
        sold: changes.sold.length,
        rented: changes.rented.length,
        priceChanged: changes.priceChanged.length,
      },
      results,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

/**
 * Configure the function to run after deploys
 * This is triggered by Netlify's deploy-succeeded webhook
 */
export const config = {
  path: '/.netlify/functions/post-to-facebook',
};
