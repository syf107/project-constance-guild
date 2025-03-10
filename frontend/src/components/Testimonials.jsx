import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const guildTestimonials = [
  {
    title: "📜 Only a Few Months, and I've Already Grown Stronger!",
    testimony:
      "I joined Constance Guild just three months ago, thinking I’d struggle like I always had. But everything changed! The experienced adventurers helped me find the right quests for my level, taught me how to trade items wisely, and even introduced me to a party that complements my skills. Now, I’m earning more gold, slaying monsters with confidence, and finally feeling like a real adventurer!",
    name: "Elias",
    class: "Mage",
  },
  {
    title: "🌱 One Year In – A Completely Different Adventurer!",
    testimony:
      "A year ago, I was just another solo fighter, barely scraping by. But Constance Guild gave me access to endless quests, rare knowledge, and a strong party. I’ve not only doubled my combat skills but also formed bonds with adventurers I trust with my life. Today, I’m leading my own raiding team, and every day feels like another step toward greatness!",
    name: "Sylva",
    class: "Ranger",
  },

  {
    title: "🏆 Five Years, and I Still Call This Home!",
    testimony:
      "When I first joined Constance, I thought it would just be a stepping stone. But after five years, I can say this is more than just a guild—it’s my family. I’ve been through dungeons, monster sieges, and legendary raids, all alongside comrades who push me to be better. Whether you’re a rookie or a veteran, this guild always has something to offer.",
    name: "Durnan",
    class: "Warrior",
  },
  {
    title: "⚔️ A Lifetime of Adventure, and I’m Still Here!",
    testimony:
      "Decades have passed since I first took up my blade, yet I remain a proud member of Constance Guild. I’ve seen generations of adventurers rise, and I’ve mentored many myself. Even now, I find purpose—passing down knowledge, training the next wave of adventurers, and standing beside my allies in the toughest battles. The world changes, but the guild remains. And so do I.",
    name: "Garrik",
    class: "Assassin",
  },
];

function Testimonials() {
  // the value of index stored for the testimonials.
  const [index, setIndex] = useState(0);

  // Go to the next testimonial
  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % guildTestimonials.length);
    console.log(prev);
  };

  //Go to the previous testimonial
  const prevTestimonial = () => {
    setIndex(
      (prev) => (prev - 1 + guildTestimonials.length) % guildTestimonials.length
    );
    console.log(prev);
  };

  return (
    <section className="py-15 bg-amber-500 text-amber-900">
      <div className="w-4/5 mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10">
          Testimonials from Adventurers
        </h1>
        <div className="relative w-full mx-auto text-center border-4 px-10 py-15">
          <h2 className="text-left">{guildTestimonials[index].title}</h2>
          <blockquote>
            <p className="text-justify">
              "{guildTestimonials[index].testimony}"
            </p>
          </blockquote>
          <figcaption className="text-right">
            - {guildTestimonials[index].name},{" "}
            <cite>{guildTestimonials[index].class}</cite>
          </figcaption>

          {/* Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
