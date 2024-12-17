import { supabase } from "@/app/createClient";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const levelId = searchParams.get('level_id');  // Get the level ID from the query string

  try {
    // Fetch headings, subheadings, chapters, and answers for the selected level
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('level_id', levelId)
      .order('position', { ascending: true });

    if (error) throw error;

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
