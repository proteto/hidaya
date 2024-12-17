import { supabase } from "@/app/createClient";

export async function POST(req) {
  const { userId, contentId, status } = await req.json();

  try {
    // Insert or update the user's progress
    const { data, error } = await supabase
      .from('user_progress')
      .upsert([
        {
          user_id: userId,
          content_id: contentId,
          status: status,
          completed_at: status === 'completed' ? new Date() : null,
        },
      ]);

    if (error) throw error;

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
