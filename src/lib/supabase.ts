import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://odcvdwxwusdqfildocgd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kY3Zkd3h3dXNkcWZpbGRvY2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NTc5NTUsImV4cCI6MjA4MDUzMzk1NX0.6_dTJJ-AjrO9Frr0H4EB0Gww1M5FHFhY7AdFd8Z6RfE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
