export interface Product {
  name: string;
  price: string;
  image: string;
}

export interface POI {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  products: Product[];
  contact: string;
}

export const CATEGORIES = [
  "All",
  "Surf School",
  "Café",
  "Restaurant",
  "Hostel",
  "Shop",
] as const;
