export interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
}

export async function getLatestVideoId(channelId: string): Promise<string | null> {
  const videos = await getLatestVideos(channelId, 1);
  return videos.length > 0 ? videos[0].id : null;
}

export async function getLatestVideos(channelId: string, limit: number = 20): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const text = await response.text();
    
    // Improved parsing for multiple videos
    const entries = text.split('<entry>');
    const videos: YouTubeVideo[] = [];
    
    // Skip the first part which is channel info
    for (let i = 1; i < entries.length && videos.length < limit; i++) {
      const entry = entries[i];
      
      const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
      const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
      const thumbnailMatch = entry.match(/url="([^"]+)"/); // Simplification for media:thumbnail
      
      if (idMatch && titleMatch) {
        videos.push({
          id: idMatch[1],
          title: titleMatch[1],
          published: publishedMatch ? publishedMatch[1] : '',
          thumbnail: thumbnailMatch ? thumbnailMatch[1] : `https://i.ytimg.com/vi/${idMatch[1]}/hqdefault.jpg`
        });
      }
    }
    
    return videos;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}
