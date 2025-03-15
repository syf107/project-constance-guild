import { useState } from "react";

const faqData = [
  {
    question: "How does the guild work?",
    description:
      "To join, simply register on the site. Once you're a member, your data will be added to the guild database, and you'll gain access to:",
    list: [
      "A Guild Members List – Find and connect with other adventurers.",
      "A Quest Board – Choose and track your quests.",
      "A Party System – Form or join groups to tackle challenges together.",
    ],
  },
  {
    question: "How do I apply for a quest?",
    description:
      "Quests are not publicly visible on the homepage. You must join the guild to access the full list. Once inside, you can:",
    list: [
      "Filter quests based on class requirements (Warrior, Mage, Archer, etc.).",
      "Choose between different quest types: monster hunting 🏹 or item gathering 💎.",
      "Add quests to your personal list and start your adventure!",
    ],
  },
  {
    question: "How do I claim my rewards?",
    description: "Upon completing a quest, you will:",
    list: [
      "Instantly gain contribution points that help you climb the guild leaderboard.",
      "Receive a unique reward code, which you can redeem with the guild to claim your prizes.",
    ],
  },
  {
    question: "What are the benefits of joining a party?",
    description:
      "When you’re in a party, your dashboard unlocks a Party Section, where you can:",
    list: [
      "View party member names and stats.",
      "Access a chat system (in development) to strategize before dungeon raids.",
      "If you’re the party leader, you can apply for quests on behalf of your team!",
    ],
  },
  {
    question: "Why should I list my name in the Guild Members section?",
    description:
      "Listing your name helps you get noticed by party leaders who need strong members.",
    list: [
      "Makes it easier for others to invite you into their team.",
      "Increases your chances to grow through new opportunities and collaborations.",
    ],
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    console.log(openIndex, index);
  };

  return (
    <section className="w-full container mx-auto py-15 bg-amber-700">
      <div className="w-4/5 mx-auto container space-y-5 border-4 border-amber-700 text-amber-700 border-double py-10 px-5 bg-amber-400">
        <h2 className="text-5xl font-bold text-center text-amber-700 mb-15">
          Frequently Asked Questions (FAQ)
        </h2>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border-double border-b-4 border-amber-700 pb-4"
          >
            <button
              className="w-full flex justify-between items-center text-xl font-bold hover:text-amber-900 transition duration-200"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-720"
                }`}
              >
                ▲
              </span>
            </button>
            {openIndex === index && (
              <div className={`mt-2 ml-2 border-l-6 px-4 border-amber-700`}>
                <p className="font-bold text-md">{faq.description}</p>
                {faq.list.length > 0 && (
                  <ul className="mt-2 list-disc list-inside">
                    {faq.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
export default FAQ;
