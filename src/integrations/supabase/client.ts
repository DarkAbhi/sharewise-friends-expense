
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qwqgtbqcbhpetlsgpkof.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cWd0YnFjYmhwZXRsc2dwa29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0OTMzNDIsImV4cCI6MjA1NzA2OTM0Mn0.2c4BFREb5e_SQtvFeXRMT_fPs_a2h9e0TdQfvFGP_XU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
