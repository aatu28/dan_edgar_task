import salesData from '../data/daily_sales.json';
import contentData from '../data/content_posts.json';

export interface DailySale {
  date: string;
  revenue: number;
  orders: number;
  units_sold: {
    'THE BOX': number;
    'DEFINE': number;
    'SALT': number;
    'HOLD': number;
  };
}

export interface ContentPost {
  id: string;
  platform: string;
  type: string;
  handle: string;
  published_at: string;
  title: string;
  thumbnail_url: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

export const getDailySales = (): DailySale[] => {
  return salesData.daily_sales;
};

export const getContentPosts = (): ContentPost[] => {
  return contentData.posts;
};

export const calculateTotalRevenue = (): number => {
  return salesData.daily_sales.reduce((sum, day) => sum + day.revenue, 0);
};

export const calculateTotalOrders = (): number => {
  return salesData.daily_sales.reduce((sum, day) => sum + day.orders, 0);
};

export const getTopProduct = () => {
  const productTotals: { [key: string]: number } = {
    'THE BOX': 0,
    'DEFINE': 0,
    'SALT': 0,
    'HOLD': 0,
  };

  salesData.daily_sales.forEach(day => {
    Object.keys(day.units_sold).forEach(product => {
      productTotals[product] += day.units_sold[product as keyof typeof day.units_sold];
    });
  });

  const topProduct = Object.entries(productTotals).sort((a, b) => b[1] - a[1])[0];
  const productInfo = salesData.products.find(p => p.name === topProduct[0]);

  return {
    name: topProduct[0],
    unitsSold: topProduct[1],
    price: productInfo?.price || 0,
  };
};

export const aggregateViewsByDate = () => {
  const viewsByDate: { [key: string]: number } = {};

  contentData.posts.forEach(post => {
    const date = post.published_at.split('T')[0];
    viewsByDate[date] = (viewsByDate[date] || 0) + post.views;
  });

  return viewsByDate;
};

export const getLagAdjustedData = (lagDays: number = 2) => {
  const viewsByDate = aggregateViewsByDate();
  const dates = salesData.daily_sales.map(d => d.date).sort();

  return dates.map(date => {
    const dateObj = new Date(date);
    const laggedDate = new Date(dateObj);
    laggedDate.setDate(laggedDate.getDate() - lagDays);
    const laggedDateStr = laggedDate.toISOString().split('T')[0];

    const sale = salesData.daily_sales.find(s => s.date === date);

    return {
      date,
      revenue: sale?.revenue || 0,
      views: viewsByDate[laggedDateStr] || 0,
    };
  });
};

export const getPlatformPerformance = () => {
  const platformMetrics: {
    [key: string]: { totalViews: number; nextDayRevenues: number[]; postCount: number };
  } = {
    instagram: { totalViews: 0, nextDayRevenues: [], postCount: 0 },
    tiktok: { totalViews: 0, nextDayRevenues: [], postCount: 0 },
  };

  contentData.posts.forEach(post => {
    const platform = post.platform.toLowerCase();
    const postDate = post.published_at.split('T')[0];
    const nextDate = new Date(postDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const nextDateStr = nextDate.toISOString().split('T')[0];

    const nextDaySale = salesData.daily_sales.find(s => s.date === nextDateStr);

    if (platformMetrics[platform]) {
      platformMetrics[platform].totalViews += post.views;
      platformMetrics[platform].postCount += 1;
      if (nextDaySale) {
        platformMetrics[platform].nextDayRevenues.push(nextDaySale.revenue);
      }
    }
  });

  return Object.entries(platformMetrics).map(([platform, metrics]) => ({
    platform,
    totalViews: metrics.totalViews,
    avgViews: Math.round(metrics.totalViews / metrics.postCount),
    avgNextDayRevenue: metrics.nextDayRevenues.length > 0
      ? Math.round(metrics.nextDayRevenues.reduce((a, b) => a + b, 0) / metrics.nextDayRevenues.length)
      : 0,
    postCount: metrics.postCount,
  }));
};

export const getContentTypePerformance = () => {
  const typeMetrics: {
    [key: string]: { totalViews: number; nextDayRevenues: number[]; count: number };
  } = {};

  contentData.posts.forEach(post => {
    const type = post.type;
    const postDate = post.published_at.split('T')[0];
    const nextDate = new Date(postDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const nextDateStr = nextDate.toISOString().split('T')[0];

    const nextDaySale = salesData.daily_sales.find(s => s.date === nextDateStr);

    if (!typeMetrics[type]) {
      typeMetrics[type] = { totalViews: 0, nextDayRevenues: [], count: 0 };
    }

    typeMetrics[type].totalViews += post.views;
    typeMetrics[type].count += 1;
    if (nextDaySale) {
      typeMetrics[type].nextDayRevenues.push(nextDaySale.revenue);
    }
  });

  return Object.entries(typeMetrics).map(([type, metrics]) => ({
    type,
    totalViews: metrics.totalViews,
    avgViews: Math.round(metrics.totalViews / metrics.count),
    avgNextDayRevenue: metrics.nextDayRevenues.length > 0
      ? Math.round(metrics.nextDayRevenues.reduce((a, b) => a + b, 0) / metrics.nextDayRevenues.length)
      : 0,
    count: metrics.count,
  }));
};
