import { MenuItem, Review, GalleryItem, StatItem } from './types';

const steamingPasta = '/src/assets/images/steaming_penne_pasta_1781798959126.jpg';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Pizzas
  {
    id: 'pizza-1',
    name: 'Pesto Burrata Pizza',
    description: 'House-made basil pesto sauce, fresh burrata mozzarella, marinated cherry tomatoes, wild arugula, and extra virgin olive oil.',
    price: 475,
    category: 'pizza',
    isPopular: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pizza-2',
    name: 'Farm House Pizza',
    description: 'Golden corn, crunchy farmhouse red onions, bell peppers, sliced jalapenos, button mushrooms, and hand-shredded mozzarella.',
    price: 355,
    category: 'pizza',
    isPopular: false,
    isSpicy: true,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pizza-3',
    name: 'Quattro Formaggi (Four Cheese)',
    description: 'Farmer’s baked crust loaded with dynamic layers of ricotta, gorgonzola, smoked provolone, and rich mozzarella.',
    price: 345,
    category: 'pizza',
    isPopular: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pizza-4',
    name: 'Tandoori Tikka Pizza',
    description: 'Spiced clay-oven paneer chunks, fire-roasted onions, fresh green capsicum, and premium mozzarella topped with spicy cilantro drizzle.',
    price: 355,
    category: 'pizza',
    isPopular: false,
    isSpicy: true,
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=600'
  },

  // Pastas
  {
    id: 'pasta-1',
    name: 'Creamy Parmesan Alfredo',
    description: 'Rich, luxurious white cream reduction sauce infused with garlic, fresh herbs, tossed with fettuccine, and topped with aged Parmesan.',
    price: 295,
    category: 'pasta',
    isPopular: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pasta-2',
    name: 'Spinach & Ricotta Ravioli',
    description: 'House-made ravioli pockets stuffed with garden spinach and fresh ricotta, cooked in a delicate light pink sauce.',
    price: 325,
    category: 'pasta',
    isPopular: false,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pasta-3',
    name: 'Aglio E Olio Extra Virgin',
    description: 'Authentic spaghetti tossed with cold-pressed extra virgin olive oil, slivered golden garlic, crushed red pepper flakes, and fresh parsley.',
    price: 285,
    category: 'pasta',
    isPopular: false,
    isSpicy: true,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600'
  },

  // Appetizers
  {
    id: 'app-1',
    name: 'Cheese Burst Oven Garlic Bread',
    description: 'Freshly baked artisanal loaf layered with creamy garlic spread, melted mozzarella, cheddar, and toasted to bubbly golden perfection.',
    price: 245,
    category: 'appetizers',
    isPopular: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'app-2',
    name: 'Pesto Sundried Tomato Calzone',
    description: 'Folded half-moon flatbread baked with zesty marinara sauce, sun-dried tomatoes, black olives, sweet corn, and ricotta.',
    price: 275,
    category: 'appetizers',
    isPopular: false,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1628191139360-408a5589c3db?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'app-3',
    name: 'Italian Macaroni Sizzler',
    description: 'A hot sizzler plate with mixed sauce macaroni, grilled cottage cheese steaks, golden fries, and sautéed season vegetables.',
    price: 345,
    category: 'appetizers',
    isPopular: true,
    isSpicy: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
  },

  // Beverages
  {
    id: 'bev-1',
    name: 'Chunky Blueberry Shake',
    description: 'Thick, premium milkshake blended with wild blueberry compote, organic Madagascar vanilla bean ice cream, and whipped cream.',
    price: 185,
    category: 'beverages',
    isPopular: true,
    isSpicy: false,
    image: steamingPasta
  },
  {
    id: 'bev-2',
    name: 'Irish Cold Frappe',
    description: 'Double shot of signature roasted espresso blended with non-alcoholic Irish cream syrup, chilled whole milk, and dark chocolate shreds.',
    price: 165,
    category: 'beverages',
    isPopular: false,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'bev-3',
    name: 'Fresh Mint Virgin Mojito',
    description: 'Perfect blend of muddled local garden mint leaves, lime wedges, organic brown sugar syrup, carbonated club soda, and crushed ice.',
    price: 135,
    category: 'beverages',
    isPopular: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600'
  },

  // Desserts
  {
    id: 'des-1',
    name: 'Classic Coffee Tiramisu',
    description: 'Rich layers of espresso-soaked ladyfingers, velvety Italian mascarpone cheese cream, dusted with dark organic cocoa.',
    price: 225,
    category: 'desserts',
    isPopular: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'des-2',
    name: 'Biscoff Caramel Brownie',
    description: 'Warm walnut fudge brownie drizzled with lotus biscoff cookie butter, gourmet salted caramel sauce, and topped with vanilla bean ice cream.',
    price: 195,
    category: 'desserts',
    isPopular: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600'
  }
];

export const GOOGLE_RATING = 4.6;

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Aarav Sharma',
    rating: 5,
    text: 'Green Cucina is hands down the best place for authentic Italian in Kota! The Pesto Burrata Pizza is incredibly fresh and is exactly like what you get in metropolitan cities. Clean ambience and polite staff.',
    date: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-2',
    name: 'Priya Verma',
    rating: 5,
    text: 'A cozy paradise right opposite Bansal Classes. I visits frequently for their signature cold frappes and ravioli. The quality is exceptional and pricing is extremely reasonable for this premium standard of food.',
    date: '3 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-3',
    name: 'Rohit Khandelwal',
    rating: 4,
    text: 'Really love the cheese burst bread, it literally overflows! Service is quite fast even during rush hours. The mocktails are super refreshing. Very nice, comfortable seating for families.',
    date: '1 month ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-4',
    name: 'Ananya Meena',
    rating: 5,
    text: 'Amazing woodfired-style pizzas and the tiramisu is top class. The gold-accented, elegant aesthetics make it highly photography-friendly. Definitely recommend if you are around Rajeev Gandhi Nagar!',
    date: '1 month ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Gourmet Woodfired Pizza',
    category: 'dishes',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-2',
    title: 'Warm Premium Ambiance',
    category: 'ambience',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-3',
    title: 'Handcrafted Fettuccine Alfredo',
    category: 'dishes',
    imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-4',
    title: 'Artisanal Beverage Crafting',
    category: 'kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-5',
    title: 'Cozy Dining Spaces',
    category: 'ambience',
    imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-6',
    title: 'Freshly Baked Calzone Pocket',
    category: 'dishes',
    imageUrl: 'https://images.unsplash.com/photo-1628191139360-408a5589c3db?auto=format&fit=crop&q=80&w=800'
  }
];

export const STATS: StatItem[] = [
  {
    value: 4.6,
    suffix: '★',
    label: 'Google Rating',
    icon: 'star'
  },
  {
    value: 12000,
    suffix: '+',
    label: 'Happy Diners',
    icon: 'smile'
  },
  {
    value: 5,
    suffix: '+',
    label: 'Years in Kota',
    icon: 'award'
  },
  {
    value: 5,
    suffix: '',
    label: 'Menu Categories',
    icon: 'utensils'
  }
];

// Automatically migrates old or broken image links from historical localStorage state to avoid display issues
export function migrateMenuImages(items: MenuItem[]): MenuItem[] {
  const replacements: Record<string, string> = {
    '1645112411341-6c4fd023714a': 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=600',
    '1587740908075-9e245a707a6e': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
    '1621996346565-e3bb64e0be5e': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600',
    '1573140286927-2ee6cf94f57c': 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&q=80&w=600',
    '1613564834361-9436948817d1': 'https://images.unsplash.com/photo-1628191139360-408a5589c3db?auto=format&fit=crop&q=80&w=600',
    '1572490122747-3968b75cc699': steamingPasta,
    '1534353436294-0dbd4bdac845': steamingPasta,
  };

  return items.map((item) => {
    if (item.id === 'bev-1') {
      return { ...item, image: steamingPasta };
    }
    if (!item.image) return item;
    for (const [oldId, newUrl] of Object.entries(replacements)) {
      if (item.image.includes(oldId)) {
        return { ...item, image: newUrl };
      }
    }
    return item;
  });
}
