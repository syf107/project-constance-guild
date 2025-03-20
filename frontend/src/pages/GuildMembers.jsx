import CTAButton from "../components/CTAButton";

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
    <section className="px-10 py-15 my-15 border-4 border-double border-amber-900 container w-9/10 mx-auto h-fill bg-amber-400 text-amber-900 flex flex-col">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-center mb-5">Guild Members</h1>
        <p className="indent-10 text-xl/8 text-justify">
          This page will show the adventurers within Constance Guild. You can
          see the details of their Name, Class, Reputation, Party, and
          Contribution Points. By registering to the guild, your information
          automatically will be put down below.
        </p>
      </div>
      <div className="w-9/10 mx-auto mb-10">
        <table className="w-full text-left">
          <thead className="bg-amber-500 text-amber-900 text-center">
            <tr>
              <th className="px-1 py-2">#</th>
              <th className="px-1 py-2">Name</th>
              <th className="px-1 py-2  ">Class</th>
              <th className="px-1 py-2  ">Reputation</th>
              <th className="px-1 py-2  ">Party</th>
              <th className="px-1 py-2">Contribution Points</th>
            </tr>
          </thead>
          <tbody>
            {adventurers.map((adventurer) => (
              <tr
                key={adventurer.number}
                className={`text-md border-b-4 border-double border-amber-950 ${
                  adventurer.number % 2 === 0
                    ? "bg-amber-500 text-amber-700"
                    : "bg-amber-700 text-amber-500"
                } hover:bg-amber-400 hover:text-amber-900 transition-all duration-300 hover:text-lg hover:font-semibold`}
              >
                <td className="p-3 ">{adventurer.number}</td>
                <td className="p-3 ">{adventurer.name}</td>
                <td className="p-3 ">{adventurer.class}</td>
                <td className="p-3 ">{adventurer.reputation}</td>
                <td className="p-3 ">{adventurer.party || "-"}</td>
                <td className="p-3 text-center">
                  {adventurer.contributionPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CTAButton text={"Your name would be good on the list"} />
    </section>
  );
}
