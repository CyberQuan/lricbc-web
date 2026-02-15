export interface UpdateItem {
  id: string;
  category: 'pastor' | 'sermon' | 'news';
  date: string;
  title: {
    en: string;
    zh: string;
  };
  excerpt: {
    en: string;
    zh: string;
  };
  content: {
    en: string;
    zh: string;
  };
}

export const mockUpdates: UpdateItem[] = [
  {
    id: '1',
    category: 'pastor',
    date: '2026-02-08',
    title: {
      en: "Walking with God in 2026",
      zh: "2026 與主同行"
    },
    excerpt: {
      en: "How do we maintain our spiritual focus in a busy world?",
      zh: "在忙碌的世界中，我們如何保持屬靈的專注？"
    },
    content: {
      en: "Full content about walking with God in English...",
      zh: "關於 2026 與主同行的完整內容..."
    }
  },
  {
    id: '2',
    category: 'sermon',
    date: '2026-02-01',
    title: {
      en: "The Power of Prayer",
      zh: "禱告的力量"
    },
    excerpt: {
      en: "Exploring the depth of communion with the Father.",
      zh: "探索與天父共融的深度。"
    },
    content: {
      en: "Sermon notes on the Power of Prayer...",
      zh: "關於禱告的力量的講道大綱..."
    }
  },
  {
    id: '3',
    category: 'news',
    date: '2026-01-25',
    title: {
      en: "Spring Retreat 2026",
      zh: "2026 春季退修會"
    },
    excerpt: {
      en: "Mark your calendars for our upcoming fellowship retreat.",
      zh: "請在您的日曆上標註即將到來的團契退修會。"
    },
    content: {
      en: "Details about the Spring Retreat 2026...",
      zh: "關於 2026 春季退修會的詳細信息..."
    }
  }
];
