export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'pizza' | 'pasta' | 'appetizers' | 'beverages' | 'desserts';
  isSpicy?: boolean;
  isPopular?: boolean;
  image?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number; // e.g. 5
  text: string;
  date: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'dishes' | 'ambience' | 'kitchen';
  imageUrl: string;
}

export interface Reservation {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  specialRequests?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}
