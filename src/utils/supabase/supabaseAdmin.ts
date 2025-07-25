import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SERVICE_ROLE_SECRET!,
  {
    auth: { persistSession: false }, // Ensure session is not stored
  },
);
