export interface User {
  id: number
  email: string
  display_name: string
  role: 'user' | 'admin'
  created_at: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  display_name: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

export interface Review {
  id: number
  user_id?: number
  user?: User
  author: string
  text: string
  rating: number
  is_student: boolean
  image_url?: string
  status: 'pending' | 'published' | 'rejected' | 'deleted'
  created_at: string
  updated_at?: string
}

export interface ReviewCreate {
  author: string
  text: string
  rating: number
  is_student: boolean
  image_url?: string
}

export interface Lead {
  id: number
  user_id?: number
  user?: User
  name: string
  email: string
  phone?: string
  message?: string
  language_level?: string
  preferred_time?: string
  format?: string
  promocode?: string
  promocode_discount_info?: string
  final_price?: string
  source: 'lead' | 'calculator'
  status: 'pending' | 'processed' | 'deleted'
  admin_note?: string
  created_at: string
  updated_at?: string
}

export interface LeadCreate {
  name: string
  email: string
  phone?: string
  message?: string
  language_level?: string
  preferred_time?: string
  format?: string
  promocode?: string
  final_price?: string
  source: 'lead' | 'calculator'
}

export interface Promocode {
  id: number
  code: string
  discount_percent?: number
  discount_amount?: number
  expires_at?: string
  usage_limit?: number
  usage_count: number
  is_active: boolean
  status: 'active' | 'inactive' | 'deleted'
  created_at: string
  updated_at?: string
}

export interface PromocodeCreate {
  code: string
  discount_percent?: number
  discount_amount?: number
  expires_at?: string
  usage_limit?: number
  is_active: boolean
}

export interface PromocodeUpdate {
  code?: string
  discount_percent?: number
  discount_amount?: number
  expires_at?: string
  usage_limit?: number
  is_active?: boolean
  status?: string
}
