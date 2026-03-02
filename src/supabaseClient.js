import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 이 한 줄이 우리 웹사이트와 Supabase DB를 연결해주는 핵심 통로입니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)