
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Oversized Linen Shirt',
    price: '$79.00',
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c717658?q=80&w=600&auto=format&fit=crop',
    description: 'Breathable linen shirt perfect for summer evenings.',
    category: 'Tops'
  },
  {
    id: '2',
    title: 'Classic Denim Jacket',
    price: '$120.00',
    imageUrl: 'https://images.unsplash.com/photo-1576871333020-04471908b839?q=80&w=600&auto=format&fit=crop',
    description: 'Timeless denim jacket with a modern slim fit.',
    category: 'Outerwear'
  },
  {
    id: '3',
    title: 'Cotton Crew Neck Tee',
    price: '$35.00',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop',
    description: 'Premium organic cotton for ultimate comfort.',
    category: 'Tops'
  },
  {
    id: '4',
    title: 'Relaxed Chinos',
    price: '$89.00',
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa804b869620?q=80&w=600&auto=format&fit=crop',
    description: 'Versatile chinos for any occasion.',
    category: 'Bottoms'
  },
  {
    id: '5',
    title: 'Wool Blend Overcoat',
    price: '$249.00',
    imageUrl: 'https://images.unsplash.com/photo-1539533377285-b89233f86e9b?q=80&w=600&auto=format&fit=crop',
    description: 'Elegant winter coat crafted from premium wool.',
    category: 'Outerwear'
  },
  {
    id: '6',
    title: 'Floral Summer Dress',
    price: '$110.00',
    imageUrl: 'https://images.unsplash.com/photo-1572804013307-a9a111996b59?q=80&w=600&auto=format&fit=crop',
    description: 'Lightweight and flowy floral dress.',
    category: 'Dresses'
  },
  {
    id: '7',
    title: 'Active Tech Hoodie',
    price: '$95.00',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    description: 'Moisture-wicking fabric for peak performance.',
    category: 'Athletic'
  },
  {
    id: '8',
    title: 'Silk Evening Gown',
    price: '$450.00',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
    description: 'Stunning silk gown for formal events.',
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
