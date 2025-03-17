const adventurers = [
  {
    number: 1,
    name: "Aric Stormblade",
    class: "Warrior",
    reputation: "Elite Guardian",
    party: "Iron Fangs",
    contributionPoints: 1520,
  },
  {
    number: 2,
    name: "Lyra Moonshadow",
    class: "Rogue",
    reputation: "Master Challenger",
    party: null,
    contributionPoints: 1780,
  },
  {
    number: 3,
    name: "Theron Windwalker",
    class: "Ranger",
    reputation: "Seasoned Explorer",
    party: "Emerald Striders",
    contributionPoints: 940,
  },
  {
    number: 4,
    name: "Selene Starweaver",
    class: "Mage",
    reputation: "Arcane Warlord",
    party: null,
    contributionPoints: 2100,
  },
  {
    number: 5,
    name: "Garruk Ironhide",
    class: "Paladin",
    reputation: "Mythic Vanguard",
    party: "Divine Shields",
    contributionPoints: 2500,
  },
  {
    number: 6,
    name: "Kael Drakensoul",
    class: "Necromancer",
    reputation: "Legendary Slayer",
    party: "Ebon Pact",
    contributionPoints: 1930,
  },
  {
    number: 7,
    name: "Fiona Emberheart",
    class: "Berserker",
    reputation: "Veteran Pathfinder",
    party: null,
    contributionPoints: 1160,
  },
  {
    number: 8,
    name: "Zorin Duskrunner",
    class: "Assassin",
    reputation: "Apprentice Adventurer",
    party: "Shadow Vortex",
    contributionPoints: 670,
  },
  {
    number: 9,
    name: "Elowen Whisperleaf",
    class: "Druid",
    reputation: "Novice Wanderer",
    party: null,
    contributionPoints: 350,
  },
  {
    number: 10,
    name: "Darius Blackthorn",
    class: "Warlock",
    reputation: "Eternal Champion",
    party: "Dark Omen",
    contributionPoints: 5000,
  },
];

export default function GuildMembers() {
  return (
    <main className="py-15">
      <section className="px-10 py-15 border-4 border-double container w-9/10 mx-auto bg-amber-400 text-amber-900">
        <h1 className="text-5xl font-bold text-center mb-10">Guild Members</h1>
        <p className="indent-10 text-xl text-justify">
          This page will show the adventurers within Constance Guild. You can
          see the details of their Name, Class, Reputation, Party, and
          Contribution Points. By registering to the guild, your information
          automatically will be put down below.
        </p>
      </section>
    </main>
  );
}
