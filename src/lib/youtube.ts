export async function getLatestVideoId(channelId: string): Promise<string | null> {
  try {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const text = await response.text();
    
    // Simple regex to extract the first video ID from the RSS feed
    const match = text.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    return match ? match[1] : null;
  } catch (error) {
    console.error("Error fetching YouTube RSS:", error);
    return null;
  }
}
