import type { MetaTagsProps } from 'svelte-meta-tags';

export const prerender = true;

export async function load({ url }) {
  const stars = await getStars();

  return {
    baseMetaTags: getBaseMetaTags(url),
    url: url.pathname,
    stars
  };
}

const starsCache = new Map<string, { stars: number; lastUpdated: number }>();
const CACHE_TIME = 1000 * 60 * 60 * 48; // 48 hours
const CACHE_KEY = 'github-stars';

async function getStars() {
  const now = Date.now();

  const cacheData = starsCache.get(CACHE_KEY);
  if (cacheData && now - cacheData.lastUpdated < CACHE_TIME) {
    console.log('Returning cached stars');
    return cacheData.stars;
  }

  console.log('Fetching stars from GitHub');

  let stars = 0;

  try {
    const response = await fetch('https://api.github.com/repos/gurukulx/gurukulx');
    const data = await response.json();
    stars = data?.stargazers_count || 0;
  } catch (error) {
    console.log('error fetching stars', error);
  }

  starsCache.set(CACHE_KEY, { stars, lastUpdated: now });

  return stars;
}

function getBaseMetaTags(url: URL) {
  const metatags = Object.freeze({
    title: 'GurukulX | The Open Source Learning Management System for Companies',
    description:
      'A flexible, user-friendly platform for creating, managing, and delivering courses for companies and training organisations',
    canonical: new URL(url.pathname, url.origin).href,
    openGraph: {
      type: 'website',
      url: new URL(url.pathname, url.origin).href,
      locale: 'en_IE',
      title: 'GurukulX | The Open Source Learning Management System for Companies',
      description:
        'A flexible, user-friendly platform for creating, managing, and delivering courses for companies and training organisations',
      siteName: 'GurukulX',
      images: [
        {
          url: 'https://brand.cdn.clsrio.com/og/gurukulx-og.png',
          alt: 'GurukulX OG Image',
          width: 1920,
          height: 1080,
          secureUrl: 'https://brand.cdn.clsrio.com/og/gurukulx-og.png',
          type: 'image/jpeg'
        }
      ]
    },
    twitter: {
      handle: '@gurukulx',
      site: '@gurukulx',
      cardType: 'summary_large_image' as const,
      title: 'GurukulX | The Open Source Learning Management System for Companies',
      description:
        'A flexible, user-friendly platform for creating, managing, and delivering courses for companies and training organisations',
      image: 'https://brand.cdn.clsrio.com/og/gurukulx-og.png',
      imageAlt: 'GurukulX OG Image'
    }
  }) satisfies MetaTagsProps;

  return metatags;
}
