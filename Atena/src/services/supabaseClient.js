import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://quxtrrcnevmqolfwydtg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eHRycmNuZXZtcW9sZnd5ZHRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNDQ2ODUsImV4cCI6MjA3NzgyMDY4NX0.XpcCpG4lrQKJgKyZVBUgTSZLpuV9L87bgQNLKP0MpDc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
