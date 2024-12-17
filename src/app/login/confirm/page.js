"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/app/createClient";
import { CircularProgress } from "@mui/material";

export default function Confirm() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(1);

  // Redirect user to the appropriate page based on their progress
  const redirectToPage = async (user) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();

      if (error) {
        console.error('Error fetching user:', error);
        return;
      }

      if (!data) {
        console.error('User data not found');
        return;
      }

      console.log('progress', data.progress);

      // Redirect based on user progress
      if (data.progress === "0") {
        router.push("/welcome");
      } else if (data.progress === "1") {
        router.push("/home");
      } else {
        console.log('No appropriate page for the user');
      }
    } catch (error) {
      console.error('Error in redirectToPage:', error);
    }
  };

  // Use effect to check user and set up countdown
  useEffect(() => {
    const checkAndAddUser = async () => {
      try {
        const user = (await supabase.auth.getUser()).data.user;
        console.log("user", user);

        if (!user) {
          console.error('No user found');
          return;
        }

        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // User doesn't exist, create a new one
            const res = await supabase
              .from('users')
              .insert([{ email: user.email, name: user.user_metadata.displayName || '', progress: 0 }]);

            if (res.error) {
              console.error('Error adding user:', res.error?.message);
            }
          } else {
            console.error('Error checking user:', error);
          }
        }

        // Proceed to redirect after countdown
        await redirectToPage(user);
      } catch (error) {
        console.error('Error in user check:', error);
      }
    };

    // Countdown logic to delay redirect
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          checkAndAddUser(); // Check and redirect after countdown completes
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="text-center flex flex-row">
        <h2 className="text-3xl font-bold text-white mr-4">
          Login successful
        </h2>
        <CircularProgress color="success" />
      </div>
    </div>
  );
}

