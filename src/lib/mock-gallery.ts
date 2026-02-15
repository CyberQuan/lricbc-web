export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  category: 'worship' | 'retreat' | 'fellowship' | 'holiday';
  url: string;
  thumbnail?: string;
  title: {
    en: string;
    zh: string;
  };
}

export const mockGallery: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    category: 'retreat',
    url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070',
    title: {
      en: "2025 Summer Retreat",
      zh: "2025 夏季退修會"
    }
  },
  {
    id: '2',
    type: 'image',
    category: 'holiday',
    url: 'https://images.unsplash.com/photo-1511110232947-2411ad28c415?q=80&w=2070',
    title: {
      en: "Christmas Celebration",
      zh: "聖誕慶祝活動"
    }
  },
  {
    id: '3',
    type: 'video',
    category: 'worship',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073',
    title: {
      en: "Sunday Worship Highlights",
      zh: "主日崇拜精彩回顧"
    }
  },
  {
    id: '4',
    type: 'image',
    category: 'fellowship',
    url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070',
    title: {
      en: "Youth Fellowship Night",
      zh: "青少年團契之夜"
    }
  },
  {
    id: '5',
    type: 'image',
    category: 'worship',
    url: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=2071',
    title: {
      en: "Combined Service",
      zh: "聯合崇拜"
    }
  }
];
