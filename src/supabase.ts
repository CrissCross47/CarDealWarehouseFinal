import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nmtcruexsujdbbblbirp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tdGNydWV4c3VqZGJiYmxiaXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzk2NTIsImV4cCI6MjA5NjkxNTY1Mn0.V88qAoU5Iodru0Qo06ujb5HiXatscwHaVsak6wf1eTc";

export const supabase = createClient(supabaseUrl, supabaseKey);
