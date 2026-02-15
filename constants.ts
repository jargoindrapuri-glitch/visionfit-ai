
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Minimalist Linen Blazer',
    price: '$149.00',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    description: 'A premium, structured blazer crafted from breathable European linen. Perfect for smart-casual summer layering.',
    category: 'Outerwear'
  },
  {
    id: '2',
    title: 'Premium Cashmere Knit',
    price: '$185.00',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
    description: 'Ultra-soft 100% Mongolian cashmere sweater in a classic crew neck silhouette.',
    category: 'Tops'
  },
  {
    id: '3',
    title: 'Silk Slip Midi Dress',
    price: '$120.00',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
    description: 'Elegant silk satin dress with adjustable straps and a flattering bias cut.',
    category: 'Dresses'
  },
  {
    id: '4',
    title: 'Raw Denim Trucker Jacket',
    price: '$135.00',
    imageUrl: 'https://images.unsplash.com/photo-1576905341939-422396e39331?q=80&w=800&auto=format&fit=crop',
    description: 'Heavyweight Japanese selvedge denim jacket that develops a unique patina over time.',
    category: 'Outerwear'
  },
  {
    id: '5',
    title: 'Structured Cotton Tee',
    price: '$45.00',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
    description: 'Heavyweight organic cotton tee with a boxy, modern fit and reinforced neckline.',
    category: 'Tops'
  },
  {
    id: '6',
    title: 'Relaxed Tailored Trousers',
    price: '$95.00',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop',
    description: 'High-waisted trousers with double pleats and a wide leg for effortless sophistication.',
    category: 'Bottoms'
  },
  {
    id: '7',
    title: 'Technical Rain Mac',
    price: '$210.00',
    imageUrl: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=800&auto=format&fit=crop',
    description: 'Water-repellent technical shell with a sleek, minimalist aesthetic for urban exploration.',
    category: 'Outerwear'
  },
  {
    id: '8',
    title: 'Floral Chiffon Gown',
    price: '$340.00',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
    description: 'Breathtaking floor-length gown with hand-painted floral motifs and a delicate silk lining.',
    category: 'Dresses'
  }
];

export const PROCESSING_STEPS = [
  "Analyzing body proportions...",
  "Mapping garment texture to physique...",
  "Adjusting lighting for realism...",
  "Matching fabric folds and drape...",
  "Finalizing high-fidelity render..."
];
