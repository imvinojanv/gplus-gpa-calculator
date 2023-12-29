import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// const cookieStore = cookies();

// export const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//         cookies: {
//             get(name: string) {
//                 return cookieStore.get(name)?.value
//             },
//             // When user logs in
//             set(name: string, value: string, options: CookieOptions) {
//                 cookieStore.set({ name, value, ...options })
//             },
//             // When user logs out
//             remove(name: string, options: CookieOptions) {
//                 cookieStore.set({ name, value: '', ...options })
//             },
//         },
//     }
// )