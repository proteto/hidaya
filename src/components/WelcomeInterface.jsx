import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import questions from './questions.json';
import { supabase } from '@/app/createClient';

const WelcomeInterface = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({ country: '', level: '' });
  const [session, setSession] = useState(null);

  // Fetch Supabase session on component mount
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setSession(session);
      }
    };
    getSession();
  }, [router]);

  const currentQuestion = questions.questions[currentQuestionIndex];

  const handleCountryChange = (event) => {
    setAnswers((prev) => ({ ...prev, country: event.target.value }));
  };

  const handleOptionSelect = (option) => {
    setAnswers((prev) => ({ ...prev, level: option }));
  };

  const handleContinue = async () => {
    if (currentQuestionIndex === questions.questions.length - 1) {
      // Save country and level to Supabase
      if (session && session.user) {
        const { email } = session.user;
        const { country, level } = answers;
        try {
          const { error } = await supabase.from('users').upsert({ email, country, level }, { onConflict: ['email'], updating: true });
          if (error) console.error('Error saving data:', error);
        } catch (error) {
          console.error('Error during upsert:', error);
        }
      }
      router.push('/next-page');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleCheckMyLevel = () => {
    router.push('/check-my-level');
  };

  return (
    <div className="p-8">
      {currentQuestion && (
        <div>
          <h2 className="text-xl font-bold mb-4">{currentQuestion.text}</h2>

          {currentQuestion.type === 'country' && (
            <select
              value={answers.country}
              onChange={handleCountryChange}
              className="mb-4 p-2 border rounded w-full">
              <option value="">Select your country</option>
              {currentQuestion.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          )}

          {currentQuestion.type === 'status' || currentQuestion.type === 'know' ? (
            <div>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`p-2 m-2 border rounded ${answers.level === option ? 'bg-blue-500 text-white' : ''}`}>
                  {option}
                </button>
              ))}
            </div>
          ) : currentQuestion.type === 'start' || currentQuestion.type === 'time' || currentQuestion.type === 'level check' ? (
            <p>{currentQuestion.text}</p>
          ) : null}

          {currentQuestion.levelCheck ? (
            <>
              <button
                onClick={handleContinue}
                disabled={currentQuestion.type === 'country' && !answers.country}
                className="mt-4 bg-blue-500 text-white p-2 rounded">
                Continue
              </button>
              <button
                onClick={handleCheckMyLevel}
                className="mt-4 bg-green-500 text-white p-2 rounded">
                Check My Level
              </button>
            </>
          ) : (
            <button
              onClick={handleContinue}
              disabled={currentQuestion.type === 'country' && !answers.country}
              className="mt-4 bg-blue-500 text-white p-2 rounded">
              Continue
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WelcomeInterface;

