
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gxgnwhmvibuowpgfyovr.supabase.co';
// As per instructions, API keys must come from process.env.API_KEY
const supabaseKey = process.env.API_KEY || ''; 

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Interface for Supabase Database Schema
 * Production-ready types for scalability
 */
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          merchant_id?: string;
          title: string;
          price: string;
          imageUrl: string;
          description: string;
          category: string;
          tags?: string[];
          metadata?: Record<string, any>;
          created_at: string;
        };
      };
      try_ons: {
        Row: {
          id: string;
          user_id: string | null;
          product_id: string;
          result_url: string;
          metadata?: {
            height: string;
            weight: string;
            processing_time: number;
          };
          created_at: string;
        };
      };
      merchants: {
        Row: {
          id: string;
          store_name: string;
          domain: string;
          api_key_hash: string;
          created_at: string;
        };
      };
    };
  };
}
