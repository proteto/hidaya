import { supabase } from "@/app/createClient";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Get the current user's session
        const session = await getServerSession(req, res, authOptions);
        
        if (!session) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Update user progress and level
        const { data: updatedUser, error } = await supabase
            .from('users')
            .update({
                progress: req.body.progress,
                level: req.body.level
            })
            .eq('id', session.user.id)
            .single();

        if (error) {
            console.error('Onboarding update error:', error);
            return res.status(500).json({ message: 'Error updating user progress' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Onboarding update error:', error);
        return res.status(500).json({ message: 'Error updating user progress' });
    }
}
