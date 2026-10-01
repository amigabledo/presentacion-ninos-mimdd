import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fnwtfjwysitrpnpjsuoy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZud3Rmand5c2l0cnBucGpzdW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NTY3MDMsImV4cCI6MjA5ODQzMjcwM30.dMPBJZOmAuYwmsYUZPebNtLQYn74_XAu1Hs-YwrA-AQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
