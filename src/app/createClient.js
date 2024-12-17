import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  'https://yqhhzzbhwhxbwbaicpgs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxaGh6emJod2h4YndiYWljcGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NzMxMDMsImV4cCI6MjA0OTU0OTEwM30.NrY87XCePxDqb7Pq73gd5kgZuaW_e3Fngcylv49F9Wg'
);

export const fetchUsers = async () => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};
