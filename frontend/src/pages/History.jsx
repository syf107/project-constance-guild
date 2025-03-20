import CTAButton from "../components/CTAButton";

export default function History() {
  return (
    <section className="text-amber-900 container w-9/10 mx-auto indent-10 text-xl/10 text-justify my-15 border-4 border-double border-amber-900 bg-amber-400 px-10 py-15 flex flex-col gap-y-5 h-fill">
      <h1 className="text-5xl font-bold text-center mb-5">
        The History of Constance Guild
      </h1>
      <p>
        In the annals of time, when darkness threatened to consume the world,
        three warriors—bound not by blood, but by an unbreakable bond—stood
        against the tide. A <strong>human</strong>, an <strong>elf</strong>, and
        an <strong>orc</strong>, once strangers, became legends. They were known
        as the <strong>Heroes of the Dark Era</strong>, the only ones who dared
        to rise when all others had fallen.
      </p>

      <p>
        It was an age of war and ruin, where monsters roamed freely, and the
        lands trembled beneath their fury. Cities crumbled, and hope waned like
        the last embers of a dying fire. Yet, amidst the chaos, these three
        warriors fought side by side, their differences set aside for a cause
        far greater than themselves.
      </p>

      <p>
        When the war was won, and the shadows pushed back into the abyss, they
        made a vow:
        <strong>
          {" "}
          "Strength alone may win battles, but unity wins wars."{" "}
        </strong>
        From this promise, the <strong>Constance Guild </strong> was born—a
        beacon of stability in an ever-changing world.
      </p>
      <p>
        The name "Constance" was chosen with purpose. In a world ruled by
        violence and uncertainty, there needed to be something unwavering,
        steadfast, and eternal. The guild would be that pillar, a place where
        adventurers of all races could stand together, not as enemies, but as
        comrades.
      </p>
      <p>
        And so, we remain. <br />
      </p>

      <p className="indent-0 text-center">
        <strong>We fight. We protect. We endure.</strong>
      </p>

      <p className="indent-0 text-center">
        <strong>Welcome to the Constance Guild.</strong> ⚔️🔥
      </p>
      <CTAButton text={"Be part of the History"} />
    </section>
  );
}
