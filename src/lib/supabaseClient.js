import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://dkzavlbgaijoybjlmdyq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRremF2bGJnYWlqb3liamxtZHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NTA0NTEsImV4cCI6MjA5MTQyNjQ1MX0.3YDfu3C4uwwAOHWT4EaPkIURLtvdTOvKwAvbpd_SjAM'
)
