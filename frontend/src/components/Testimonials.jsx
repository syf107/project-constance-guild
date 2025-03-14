import { useEffect, useState, useRef } from "react";
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
  const intervalRef = useRef(null);

  // Go to the next testimonial
  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % guildTestimonials.length);
  };

  //Go to the previous testimonial
  const prevTestimonial = () => {
    setIndex(
      (prev) => (prev - 1 + guildTestimonials.length) % guildTestimonials.length
    );
  };

  // autoslide

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % guildTestimonials.length);
    }, 3000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  // Function to pause the autoslide
  const pauseAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  // Function to start the autoslide again
  const resumeAutoSlide = () => {
    startAutoSlide();
  };

  return (
    <section className="py-15 bg-amber-400 text-amber-700">
      <div className="w-4/5 mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10">
          Testimonials from Adventurers
        </h1>
        <div
          onMouseEnter={pauseAutoSlide}
          onMouseLeave={resumeAutoSlide}
          className="bg-amber-700 text-amber-400 relative h-fill w-full mx-auto text-center border-double border-4 shadow-2xl px-10 py-15 hover:bg-amber-400 hover:text-amber-700 transition-all duration-500"
        >
          <h2 className="text-left text-2xl mb-2 font-bold">
            {guildTestimonials[index].title}
          </h2>
          <blockquote className="border-double border-y-4 mb-5 py-10">
            <p className="text-justify pl-2 mx-10 text-lg italic border-l-4 ">
              "{guildTestimonials[index].testimony}"
            </p>
          </blockquote>
          <figcaption className="text-right pr-2 font-bold">
            - {guildTestimonials[index].name},{" "}
            <cite>{guildTestimonials[index].class}</cite>
          </figcaption>

          {/* Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
          >
            <FaChevronRight size={20} />
          </button>
          {/*  Pagination comment button */}
          <div className="flex flex-row justify-center gap-1 mt-7">
            {guildTestimonials.map((_, indexTestimonial) => {
              return (
                <button
                  key={indexTestimonial}
                  onClick={() => setIndex(indexTestimonial)}
                  className={`h-2 w-2 border-1 rounded-3xl hover:cursor-pointer ${
                    index === indexTestimonial ? "bg-amber-700" : "bg-amber-400"
                  }`}
                ></button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
