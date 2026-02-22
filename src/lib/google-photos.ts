// Cache to store fetched image URLs to avoid repeated requests
const googlePhotosCache = new Map<string, { urls: string[], timestamp: number }>();
const CACHE_TTL = 3600 * 1000; // 1 hour

export async function getGooglePhotosUrls(albumUrl: string): Promise<string[]> {
  const cached = googlePhotosCache.get(albumUrl);
  const now = Date.now();
  
  if (cached && (now - cached.timestamp < CACHE_TTL)) {
    return cached.urls;
  }

  try {
    const response = await fetch(albumUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch album: ${response.statusText}`);
    }

    const html = await response.text();
    // Regex to match the direct image links from the album page
    const regex = /https:\/\/lh3\.googleusercontent\.com\/pw\/[^"\s=]+/g;
    const matches = Array.from(new Set(html.match(regex) || []));
    
    if (matches.length > 0) {
      googlePhotosCache.set(albumUrl, { urls: matches, timestamp: now });
    }
    
    return matches;
  } catch (error) {
    console.error(`Error fetching Google Photos for ${albumUrl}:`, error);
    return cached?.urls || [];
  }
}

export async function getRandomGooglePhotoUrl(albumUrl: string): Promise<string | null> {
  const urls = await getGooglePhotosUrls(albumUrl);
  if (urls.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * urls.length);
  return urls[randomIndex];
}
