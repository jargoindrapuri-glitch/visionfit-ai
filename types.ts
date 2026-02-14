
export interface Product {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  description: string;
  category: string;
}

export interface TryOnRequest {
  userImageBase64?: string;
  productImageUrl: string;
  height: string;
  weight: string;
  garmentType: string;
}

export interface TryOnResult {
  imageUrl: string;
  status: 'success' | 'error';
  message?: string;
}

export interface GenerationStep {
  message: string;
  progress: number;
}
