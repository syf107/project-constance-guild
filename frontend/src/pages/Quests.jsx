import { useState } from "react";
import CTAButton from "../components/CTAButton";

const quests = [
  {
    title: "Goblin Menace",
    type: "Kill Monsters",
    difficulty: 2,
    objective: "Eliminate 10 Goblins in the nearby forest.",
    location: "Shadowpine Woods",
    timeLimit: 3,
    rewards: {
      gold: 150,
      items: ["Goblin Ear x10", "Rusty Dagger"],
      contributionPoints: 20,
    },
    questGiver: "Guild",
    partyRequired: false,
    status: "Not Started",
  },
  {
    title: "Lost Heirloom",
    type: "Collect Items",
    difficulty: 3,
    objective: "Retrieve the lost necklace from the bandit camp.",
    location: "Red Fang Hideout",
    timeLimit: 5,
    rewards: {
      gold: 300,
      items: ["Silver Necklace", "Bandit Insignia"],
      contributionPoints: 30,
    },
    questGiver: "Guild Member - Lady Eleanor",
    partyRequired: false,
    status: "Not Started",
  },
  {
    title: "Wolves at the Gate",
    type: "Kill Monsters",
    difficulty: 4,
    objective: "Eliminate 15 Dire Wolves threatening the village.",
    location: "Frostfall Valley",
    timeLimit: 4,
    rewards: {
      gold: 500,
      items: ["Wolf Pelt x15", "Alpha Wolf Fang"],
      contributionPoints: 50,
    },
    questGiver: "Guild",
    partyRequired: true,
    status: "In Progress",
  },
  {
    title: "Escort the Merchant",
    type: "Escort/Protect",
    difficulty: 3,
    objective:
      "Ensure safe passage for a merchant traveling through bandit territory.",
    location: "Ironpass Road",
    timeLimit: 2,
    rewards: {
      gold: 350,
      items: ["Merchant's Gratitude Token"],
      contributionPoints: 40,
    },
    questGiver: "Guild Member - Merchant Boris",
    partyRequired: true,
    status: "Not Started",
  },
  {
    title: "Hunt the Alpha Bear",
    type: "Kill Monsters",
    difficulty: 5,
    objective: "Defeat the colossal Alpha Bear terrorizing the northern woods.",
    location: "Eldertree Glade",
    timeLimit: 6,
    rewards: {
      gold: 800,
      items: ["Alpha Bear Pelt", "Sharp Claw"],
      contributionPoints: 100,
    },
    questGiver: "Guild",
    partyRequired: true,
    status: "Not Started",
  },
  {
    title: "The Stolen Relic",
    type: "Collect Items",
    difficulty: 3,
    objective: "Retrieve the sacred relic stolen by cultists.",
    location: "Ruins of Dar'Khan",
    timeLimit: 4,
    rewards: {
      gold: 450,
      items: ["Ancient Relic", "Cultist Robe"],
      contributionPoints: 50,
    },
    questGiver: "Guild Member - High Priestess Selene",
    partyRequired: false,
    status: "Not Started",
  },
  {
    title: "Bounty: The Crimson Fang",
    type: "Bounty",
    difficulty: 4,
    objective: "Eliminate the notorious bandit leader, Crimson Fang.",
    location: "Black Hollow Cavern",
    timeLimit: 7,
    rewards: {
      gold: 700,
      items: ["Crimson Fang's Mask", "Stolen Treasure"],
      contributionPoints: 80,
    },
    questGiver: "Guild",
    partyRequired: true,
    status: "Not Started",
  },
  {
    title: "Defend the Village",
    type: "Escort/Protect",
    difficulty: 5,
    objective: "Protect the village from an impending orc raid.",
    location: "Hearthwood Village",
    timeLimit: 1,
    rewards: {
      gold: 1000,
      items: ["Heroic Medal", "Warrior’s Greaves"],
      contributionPoints: 120,
    },
    questGiver: "Guild",
    partyRequired: true,
    status: "Not Started",
  },
  {
    title: "Mystic Herbs for the Alchemist",
    type: "Collect Items",
    difficulty: 2,
    objective: "Gather 12 Moonshade Herbs for the guild's alchemist.",
    location: "Twilight Glade",
    timeLimit: 3,
    rewards: {
      gold: 200,
      items: ["Moonshade Herb x12"],
      contributionPoints: 25,
    },
    questGiver: "Guild Member - Alchemist Rylen",
    partyRequired: false,
    status: "Completed",
  },
  {
    title: "Exterminate the Undead",
    type: "Kill Monsters",
    difficulty: 4,
    objective: "Destroy 20 risen skeletons plaguing the old battlefield.",
    location: "Grave of the Fallen",
    timeLimit: 5,
    rewards: {
      gold: 600,
      items: ["Ancient Bone x20", "Cursed Dagger"],
      contributionPoints: 75,
    },
    questGiver: "Guild",
    partyRequired: true,
    status: "Not Started",
  },
  {
    title: "Rescue the Captive Scout",
    type: "Escort/Protect",
    difficulty: 3,
    objective:
      "Rescue the scout imprisoned by goblins and escort them to safety.",
    location: "Goblin Caves",
    timeLimit: 4,
    rewards: {
      gold: 400,
      items: ["Scout’s Dagger"],
      contributionPoints: 50,
    },
    questGiver: "Guild Member - Captain Lorian",
    partyRequired: true,
    status: "In Progress",
  },
  {
    title: "Ancient Guardian Awakens",
    type: "Kill Monsters",
    difficulty: 5,
    objective: "Defeat the awakened stone guardian in the ruins.",
    location: "Temple of the Forgotten",
    timeLimit: 6,
    rewards: {
      gold: 900,
      items: ["Guardian’s Core", "Ancient Shard"],
      contributionPoints: 110,
    },
    questGiver: "Guild",
    partyRequired: true,
    status: "Not Started",
  },
  {
    title: "Merchant’s Lost Caravan",
    type: "Collect Items",
    difficulty: 2,
    objective: "Retrieve stolen goods from desert raiders.",
    location: "Dunes of Everdusk",
    timeLimit: 5,
    rewards: {
      gold: 250,
      items: ["Merchant’s Supplies"],
      contributionPoints: 35,
    },
    questGiver: "Guild Member - Trader Yassim",
    partyRequired: false,
    status: "Not Started",
  },
  {
    title: "The Cursed Tome",
    type: "Collect Items",
    difficulty: 4,
    objective: "Recover a powerful cursed book from a haunted library.",
    location: "The Obsidian Archives",
    timeLimit: 5,
    rewards: {
      gold: 500,
      items: ["Cursed Tome", "Shadow Ink"],
      contributionPoints: 65,
    },
    questGiver: "Guild",
    partyRequired: false,
    status: "Not Started",
  },
  {
    title: "Dragon’s Hoard",
    type: "Kill Monsters",
    difficulty: 5,
    objective: "Slay the rogue drake guarding its stolen treasures.",
    location: "Drake’s Hollow",
    timeLimit: 7,
    rewards: {
      gold: 1200,
      items: ["Drake Scale", "Gold Ingot x3"],
      contributionPoints: 150,
    },
    questGiver: "Guild",
    partyRequired: true,
    status: "Not Started",
  },
];

export default function Quests() {
  const [selectedQuest, setSelectedQuest] = useState(null);

  return (
    <section className="my-15 px-10 py-15 w-9/10 container mx-auto text-amber-900 bg-amber-400 border-double border-4 border-amber-900">
      <h1 className="text-5xl font-bold text-center mb-10">Quests</h1>
      <p className="indent-10 text-xl/10 text-justify">
        This is the most favourite section of every Adventurers in the Guild.
        It's the place where your monster hunting isn't just monster hunting. It
        will give you more prize, experience, and also contribution points that
        later will be added simultaneoulsy; it will raise your reputation in the
        guild. You will see only a few of quests here. You see, there are more
        of it--you see, the-only-guild-members quests.
      </p>
      <div className="px-5 py-5 bg-amber-700 border-y-8 border-double border-amber-950  my-10 text-amber-400 h-fill">
        <div className="container mx-auto p-2 grid grid-cols-3 gap-5">
          <div
            className={`${
              selectedQuest === null ? "col-span-3" : "col-span-1"
            } gap-4 border-4 border-double border-amber-900 px-4 py-5 overflow-y-scroll h-120`}
          >
            <h2 className="text-2xl font-bold mb-2 text-center">
              Available Quests
            </h2>
            <div
              className={`grid ${
                selectedQuest !== null ? "grid-cols-1" : "grid-cols-3"
              } gap-4 transition-all duration-500 ease-in-out`}
            >
              {quests.map((quest, index) => {
                console.log(index);
                const isSelected =
                  selectedQuest && selectedQuest.title === quest.title;

                return (
                  <div
                    key={index}
                    className={`pb-4 pr-4 pt-2 pl-2 border-1 border-amber-900 shadow-md cursor-pointer hover:bg-amber-400 hover:shadow-amber-800 hover:text-amber-800 transition duration-300 ${
                      isSelected && "bg-amber-400 text-amber-800"
                    }`}
                    onClick={() => setSelectedQuest(quest)}
                  >
                    <h2 className="text-xl font-semibold">{quest.title}</h2>
                    <p>{quest.location}</p>
                    <p className="text-sm">Type: {quest.type}</p>
                    <p className="text-sm">
                      Difficulty: {"⭐".repeat(quest.difficulty)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedQuest && (
            <div
              className={`relative bg-amber-400 border-double border-4 border-amber-900 shadow-lg p-6 overflow-y-auto ${
                selectedQuest !== null ? "col-span-2" : "hidden"
              } text-amber-900 flex flex-col gap-5 transition-all duration-500 ease-in-out`}
            >
              <button
                className="absolute top-2 right-2 text-lg font-5xl hover:cursor-pointer"
                onClick={() => setSelectedQuest(null)}
              >
                ✖
              </button>
              <div>
                <h2 className="text-2xl font-bold text-center border-b-4 border-double border-amber-900 pb-2">
                  📜 {selectedQuest.title}
                </h2>
                <div className="bg-amber-600 text-amber-300 text-sm flex flex-row justify-between border-amber-700">
                  <p className="flex-1 italic">🗺 {selectedQuest.location}</p>
                  <p className="flex-1 text-center font-semibold">
                    "{selectedQuest.type}"
                  </p>
                  <p className="flex-1 text-right">
                    {"⭐".repeat(selectedQuest.difficulty)}
                  </p>
                </div>
              </div>
              <div className="">
                <h3 className="text-xl font-semibold border-b-2 border-amber-700">
                  Quest Details
                </h3>
                <p className="text-md mt-2">🎯: {selectedQuest.objective}</p>
                <p>
                  ⏳: {selectedQuest.timeLimit}{" "}
                  {selectedQuest.timeLimit > 1 ? "days" : "day"}
                </p>
                <p>
                  {selectedQuest.partyRequired
                    ? "👥 Party Quest"
                    : "👤 Solo Quest"}
                </p>
                <p className="text-right text-sm">
                  Requested by: {selectedQuest.questGiver}
                </p>
              </div>

              <div className="">
                <h3 className="text-xl font-semibold border-b-2 border-amber-700">
                  Rewards
                </h3>
                <p>🏆: {selectedQuest.rewards.contributionPoints} points</p>
                <p>🟡: {selectedQuest.rewards.gold} golds</p>
                <p>🎁: {selectedQuest.rewards.items.join(", ")}</p>
              </div>
              <CTAButton text={"You can take the quest by joining the Guild"} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
