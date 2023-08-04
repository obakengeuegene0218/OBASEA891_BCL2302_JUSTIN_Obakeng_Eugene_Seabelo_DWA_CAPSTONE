import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your Supabase project API URL and public key
const supabaseUrl = 'https://zgvhkdfgziojjnbsqbfr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpndmhrZGZnemlvampuYnNxYmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5Nzc1ODgsImV4cCI6MjAwNjU1MzU4OH0.-Lvq7fhelLQymVmDldpISkm5ImCOwRZTiiNm4vGwBM8';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };



