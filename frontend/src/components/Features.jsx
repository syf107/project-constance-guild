const featuresContent = [
  {
    title: "Reliable Comrades by Your Side!",
    description:
      "The life of an adventurer is challenging. There will be moments when you feel lost, unsure of where to hunt monsters safely for your level, accidentally sell rare items for a fraction of their worth, or struggle to earn enough gold. But worry not! Constance Guild is home to seasoned adventurers who share their knowledge, helping you avoid these pitfalls and thrive in your journey.",
    picture: "/images/feature-reliable-comrades.webp",
    alt: "The monthly party to bind the friendship in the guild.",
  },
  {
    title: "More Quests, More Gold!",
    description:
      "Monsters lurk in every corner of the land, threatening villages, towns, and the roads between them. As adventurers, it is our duty to keep the realm safe. But why stop at just slaying them when you can earn more in the process? At Constance Guild, we provide access to exclusive quest requests, valuable information, and strong connections across the kingdom. Accepting these quests means higher rewards—not just from the people and fellow adventurers, but also from the kingdom itself! Plus, the monster loot you collect is in high demand within the guild, ensuring you get the best price for your efforts.",
    picture: "/images/feature-quest.webp",
    alt: "The guild house town hall where people applying the quest and getting the prize out of it..",
  },
  {
    title: "Strength in Numbers – Form a Party!",
    description:
      "At Constance Guild, adventurers of all races and classes come together, each bringing their unique skills to the table. We believe that slaying monsters becomes significantly easier when you work as a team. If a battle seems too difficult to face alone, join a party and fight alongside skilled companions who can support you. The ultimate challenge? Dungeon raids and fearsome bosses—conquer them with your guildmates and carve your name into legend!",
    picture: "/images/feature-raid-party.webp",
    alt: "One of party in Constance Guild raiding the dungeon.",
  },
];

function Features() {
  return (
    <section className="py-15 text-amber-400 bg-amber-700">
      <h1 className="font-bold text-5xl text-center mb-10">
        What Awaits You in the Constance Guild?
      </h1>
      <div className="w-4/5 mx-auto">
        {featuresContent.map((feature, index) => (
          <article
            className={
              "border-4 border-double px-4 py-3  gap-3 mb-15 items-start hover:text-amber-700 hover:bg-amber-400 hover:border-amber-80 hover:shadow-xl transition-colors duration-500"
            }
            key={index}
          >
            <h2 className="text-2xl font-bold  text-center py-5">
              {feature.title}
            </h2>

            <div
              className={`flex items-start border-y-4 border-double px-5 py-5 ${
                index % 2 == 0 ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <img
                className="max-w-5/10 px-3 py-3"
                src={feature.picture}
                alt={feature.alt}
              />
              <p className="text-md text-justify pt-3 indent-10">
                {feature.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Features;
