import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient<Database>(
  "https://gspbydyiagljkkiuqshq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcGJ5ZHlpYWdsamtraXVxc2hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4NzQzNjgsImV4cCI6MjAxMDQ1MDM2OH0.WCe6z1f6gKYDnzVwLMouCFh3Cz2ceCwLfEY69hDO0jo",
);
