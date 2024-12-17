"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { completeLevel } from "@/redux/slices/levelSlice";
import Image from "next/image";
import { use } from "react";

// const content = {
//   beginner: [
//     {
//       id: 1,
//       title: 'How do we believe in Allah?',
//       content: 'We should believe in Allah as the sole Creator, Sustainer, and Sovereign, with no partners or equals.',

//     },
//     {
//       id: 2,
//       title: 'What are the major attributes of Allah?',
//       content: 'The major attributes of Allah are: Existence, Oneness, Self-sufficiency, Dissimilarity to the created and Eternity.',
//     },
//     {
//       id: 3,
//       title: "Who are the angels (Mala'ika) in Islam?",
//       content: 'They are beings created by Allah from light. They are invisible to humans but have specific roles and duties.',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 4,
//       title: 'How many angels are there in Islam?',
//       content: 'The exact number of angels is not known',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 5,
//       title: "Who brought Allah's revelations to the prophets?",
//       content: 'Jibreel',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 6,
//       title: 'Who is The Angel of Death?',
//       content: 'Azrael',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 7,
//       title: 'What are the Divinely revealed books in Islam?',
//       content: 'Quran, Tawrat, Zabur, Injil',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 8,
//       title: 'Which is the only remaining holy book in its original form?',
//       content: 'The Holy Quran',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 9,
//       title: 'How many Prophets have been mentioned in holy Quran?',
//       content: '25',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 10,
//       title: 'Who is the last Prophet?',
//       content: 'Prophet Muhammed (PBUH)',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 11,
//       title: 'Who was Prophet Muhammad?',
//       content: 'Prophet Muhammad (peace be upon him) was born in 570 CE in Makkah. He became a prophet at age 40, receiving revelations from Allah through Angel Jibreel. He preached the worship of one God, justice, and compassion. He migrated to Madinah, where he established a strong community, and passed away in 632 CE, leaving a lasting impact on Islam and humanity.',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 12,
//       title: 'Who are the Arch-Prophets (Ulul Azm) in Islam?',
//       content: 'Muhammad, Ibrahim, Musa, Isa, Nuh (Peace be upon them)',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 13,
//       title: 'What is the Day of Judgment?',
//       content: 'Day when Allah will resurrect all beings to account for their deeds',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 14,
//       title: 'When will the Day of Judgment occur?',
//       content: 'The exact time of the Day of Judgment is known only to Allah',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 15,
//       title: 'Who will be rewarded paradise?',
//       content: 'Those who have lived righteous lives',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 16,
//       title: 'Who will be rewarded hell?',
//       content: 'Those who have led sinful lives',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 17,
//       title: 'What is the Arabic word for Divine Decree?',
//       content: 'Qadr',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 18,
//       title: 'What is belief in the Divine Decree (Qadar) in Islam?',
//       content: 'Belief in Qadar is the belief that everything that happens, both good and bad, is predestined by Allah. It is part of the six articles of faith in Islam.',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     {
//       id: 19,
//       title: 'Does believing in Divine Decree mean that humans have no free will?',
//       content: 'No, Islam teaches that while Allah has knowledge and control over everything, humans are still accountable for their actions, as they have been given free will to choose between right and wrong.',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },

//   ],
//   intermediate: [
//     {
//       id: 1,
//       title: 'How many chapters (surahs) are in the Quran?',
//       content: 'The Quran contains 114 chapters (surahs). Each surah varies in length, from the shortest having only 3 verses to the longest having 286 verses. The Quran is the holy book of Islam, believed to be the direct word of Allah as revealed to Prophet Muhammad.',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     // Add more intermediate content
//   ],
//   advanced: [
//     {
//       id: 1,
//       title: 'What is the concept of "Ijma" in Islamic jurisprudence?',
//       content: '"Ijma" refers to the consensus of Islamic scholars on a particular issue in Islamic law. It is considered one of the sources of Islamic jurisprudence, along with the Quran, Sunnah, and Qiyas (analogical reasoning). When scholars reach a consensus on an issue, it becomes binding on the Muslim community.',
//       mediaType: 'image',
//       mediaUrl: '/placeholder.svg?height=300&width=400',
//     },
//     // Add more advanced content
//   ],
// };

const content = {
  beginner: {
    units: [
      {
        id: 1,
        title: "Fundamentals of Islamic Belief",
        content: [
          {
            id: 1,
            question: 'How do we believe in Allah?',
            answer: 'We should believe in Allah as the sole Creator, Sustainer, and Sovereign, with no partners or equals.',
          },
          {
            id: 2,
            question: 'What are the major attributes of Allah?',
            answer: 'The major attributes of Allah are: Existence, Oneness, Self-sufficiency, Dissimilarity to the created and Eternity.',
          },
          {
            id: 3,
            question: "Who are the angels (Mala'ika) in Islam?",
            answer: 'They are beings created by Allah from light. They are invisible to humans but have specific roles and duties.',
          },
          {
            id: 4,
            question: 'How many angels are there in Islam?',
            answer: 'The exact number of angels is not known',
          },
          {
            id: 5,
            question: "Who brought Allah's revelations to the prophets?",
            answer: 'Jibreel',
          },
          {
            id: 6,
            question: 'Who is The Angel of Death?',
            answer: 'Azrael',
          },
          {
            id: 7,
            question: 'What are the Divinely revealed books in Islam?',
            answer: 'Quran, Tawrat, Zabur, Injil',
          },
          {
            id: 8,
            question: 'Which is the only remaining holy book in its original form?',
            answer: 'The Holy Quran',
          },
          {
            id: 9,
            question: 'How many Prophets have been mentioned in holy Quran?',
            answer: '25',
          },
          {
            id: 10,
            question: 'Who is the last Prophet?',
            answer: 'Prophet Muhammed (PBUH)',
          },
          {
            id: 11,
            question: 'Who was Prophet Muhammad?',
            answer: 'Prophet Muhammad (peace be upon him) was born in 570 CE in Makkah. He became a prophet at age 40, receiving revelations from Allah through Angel Jibreel. He preached the worship of one God, justice, and compassion. He migrated to Madinah, where he established a strong community, and passed away in 632 CE, leaving a lasting impact on Islam and humanity.',
          },
          {
            id: 12,
            question: 'Who are the Arch-Prophets (Ulul Azm) in Islam?',
            answer: 'Muhammad, Ibrahim, Musa, Isa, Nuh (Peace be upon them)',
          },
          {
            id: 13,
            question: 'What is the Day of Judgment?',
            answer: 'Day when Allah will resurrect all beings to account for their deeds',
          },
          {
            id: 14,
            question: 'When will the Day of Judgment occur?',
            answer: 'The exact time of the Day of Judgment is known only to Allah',
          },
          {
            id: 15,
            question: 'Who will be rewarded paradise?',
            answer: 'Those who have lived righteous lives',
          },
          {
            id: 16,
            question: 'Who will be rewarded hell?',
            answer: 'Those who have led sinful lives',
          },
          {
            id: 17,
            question: 'What is the Arabic word for Divine Decree?',
            answer: 'Qadr',
          },
          {
            id: 18,
            question: 'What is belief in the Divine Decree (Qadar) in Islam?',
            answer: 'Belief in Qadar is the belief that everything that happens, both good and bad, is predestined by Allah. It is part of the six articles of faith in Islam.',
          },
          {
            id: 19,
            question: 'Does believing in Divine Decree mean that humans have no free will?',
            answer: 'No, Islam teaches that while Allah has knowledge and control over everything, humans are still accountable for their actions, as they have been given free will to choose between right and wrong.',
          },
        ],

      },
      {
        id: 2,
        title: "Five Pillars of Islam",
        content: [
          {
            question: "What is Shahada in Islam?",
            answer: "Shahada is the declaration of faith, where a Muslim says, 'I bear witness that no one deserves to be worshiped except Allah and I bear witness that Muhammad is the Messenger of Allah' (ASH-HADU ANNA LA ILAHA ILLA ALLAH, WA ASH-HADU ANNA MUHAMMADAN RASULU ALLAH)"
          },
          {
            question: "Does saying the Shahada mean a person is committed to following Allah's teachings?",
            answer: "Yes, saying the Shahada is a commitment to following Allah's guidance and the teachings of Prophet Muhammad. It is the foundation of the entire Islamic faith."
          },
          {
            question: "What is Salat in Islam?",
            answer: "Salat is the second pillar of Islam and refers to the five daily prayers performed by Muslims at specific times in a day."
          },
          {
            question: "What are five obligatory daily prayers in Islam?",
            answer: "1 - Fajr, 2 - Zuhr, 3 - Asr, 4 - Maghrib, 5 - Isha'"
          },
          {
            question: "What happens during Salat? What are the actions involved?",
            answer: "During Salat, Muslims face the Kaaba in Mecca, recite verses from the Quran, and perform physical actions like standing, bowing, and prostrating. Each action reflects submission to Allah and has spiritual significance."
          },
          {
            question: "What is Zakat in Islam?",
            answer: "Zakat is the third pillar of Islam, which means 'to purify.' It is a mandatory act of charity that purifies a Muslim’s wealth and soul by redistributing a portion of it to those in need."
          },
          {
            question: "How does Zakat work? What are the criteria for giving Zakat, and who benefits from it?",
            answer: "Muslims are required to give 2.5% of their wealth annually if it exceeds a certain threshold known as nisab (equal to the value of 85 grams of gold or 595 grams of silver). Zakat is given to specific categories of people, such as the poor, the needy, those in debt, and others as outlined in the Quran."
          },
          {
            question: "What is Sawm in Islam?",
            answer: "Sawm is the fourth pillar of Islam, which refers to fasting during the holy month of Ramadan. Muslims fast from dawn to sunset, refraining from food, drink, and other physical needs."
          },
          {
            question: "What does fasting during Ramadan involve? Is it just about not eating?",
            answer: "Fasting is more than just abstaining from food and drink. It also includes avoiding smoking, negative habits like arguing, and impure thoughts. Muslims also make an intention (niyyah) before dawn to fast for the sake of Allah."
          },
          {
            question: "What is Hajj in Islam?",
            answer: "Hajj is the fifth and final pillar of Islam, a once-in-a-lifetime pilgrimage to Mecca for Muslims who are physically and financially able to perform it."
          },
          {
            question: "What makes Hajj so special?",
            answer: "Hajj is the largest spiritual gathering of Muslims worldwide. Pilgrims come together to worship Allah and perform rituals that were taught by Prophet Muhammad during his last pilgrimage."
          },
          {
            question: "When does Hajj take place?",
            answer: "Hajj occurs during Dhul Hijjah, the 12th month of the Islamic calendar. It ends with the festival of Eid ul-Adha, which commemorates the devotion of Prophet Ibrahim to Allah."
          },
        ]
      }
      // Add more units here
    ]
  },
  intermediate: {
    units: [
      {
        id: 1,
        title: "Quranic Studies",
        content: [
          {
            question: "How many chapters in the Quran?",
            answer: "There are 114 chapters in the Quran."
          }
          // Add more questions for this unit
        ]
      }
      // Add more units here
    ]
  },
  advanced: {
    units: [
      {
        id: 1,
        title: "Islamic Jurisprudence",
        content: [
          {
            question: 'What is "Ijma" in Islamic law?',
            answer: '"Ijma" is consensus among scholars on legal matters.'
          }
          // Add more questions for this unit
        ]
      }
      // Add more units here
    ]
  }
};

export default function LevelPage({ params }) {
  const unwrappedParams = use(params);
  const progress = useSelector((state) => state.level);
  const { type, id } = unwrappedParams || {};

  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [currentUnit, setCurrentUnit] = useState(content[type]?.units[id - 1]);

  const [contentToDisplay, setContentToDisplay] = useState([]);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (type && content[type]) {
      const unlockedContent = content[type]?.units.filter(
        (item) => progress[type][item.id.toString()]?.unlocked
      );

      setContentToDisplay(unlockedContent);
    }
  }, [type, progress]);

  useEffect(() => {
    if (type && Array.isArray(content[type])) {
      const currentUnit = content[type].units[id - 1];
      setCurrentUnit(currentUnit);

      const totalTopics = currentUnit?.content.length || 0;
      setContentToDisplay(
        content[type].filter((item) => item.id <= parseInt(id))
      );
    } else {
      console.warn("Invalid content or type:", type);
      setContentToDisplay([]);
    }
  }, [type, id, content]);

  const totalTopics = currentUnit?.content.length || 0;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleNext = () => {
  //   if (!type || !id) {
  //     console.error("Invalid route parameters");
  //     return;
  //   }

  //   const currentContent = content[type];

  //   if (!currentContent) {
  //     console.error(Content for type "${type}" not found.);
  //     return;
  //   }

  //   // If it's the last topic in this level
  //   if (currentTopic === currentContent.length - 1) {
  //     dispatch(
  //       completeLevel({
  //         level: parseInt(id),
  //         type
  //       })
  //     );

  //     const levels = ["beginner", "intermediate", "advanced"];
  //     const currentIndex = levels.indexOf(type);

  //     if (currentIndex !== -1 && id === "3") {
  //       const nextType = levels[currentIndex + 1];
  //       if (nextType) {
  //         router.push(/level/${nextType}/1); // Go to the next type's first level
  //       } else {
  //         router.push("/home");
  //       }
  //     } else {
  //       router.push("/home"); // Default fallback
  //     }
  //   } else {
  //     setCurrentTopic((prev) => prev + 1);
  //     setShowAnswer(false);
  //   }
  // };
  const handleNext = () => {
    const isLastTopic = currentTopic === currentUnit?.content.length - 1;

    if (isLastTopic) {
      dispatch(completeLevel({ level: parseInt(id), type }));
      router.push("/home");
    } else {
      setCurrentTopic((prev) => {
        const nextTopic = prev + 1;
        setShowAnswer(false);
        return nextTopic;
      });
    }
  };


  const handleSkip = () => {
    if (currentTopic === content[type].length - 1) {
      dispatch(
        completeLevel({
          level: parseInt(id),
          type
        })
      );

      router.push("/home");
    } else {
      setCurrentTopic((prev) => prev + 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8 flex justify-center items-center">
      <motion.div
        key={currentTopic}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8 text-5xl font-bold">
          {currentUnit?.content[currentTopic]?.question}
        </div>
        <div className="mb-8">
          <p className="text-gray-400">
            {" "}
          </p>
          <p className="text-green-500 mt-4 text-3xl">
            {currentUnit?.content[currentTopic]?.answer}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xl">
            Topic {currentTopic + 1} of {totalTopics}
          </p>
        </div>
      </motion.div>
    </div>
  );
}