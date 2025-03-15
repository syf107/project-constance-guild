import CTAButton from "./CTAButton";

function Hero() {
  return (
    <section className="relative bg-[url(images/guild-market.webp)] bg-cover bg-no-repeat bg-center h-screen">
      <div className="absolute inset-0 bg-linear-to-b from-amber-900 from-20% via-transparent via-85% to-amber-500 to-95%"></div>
      <div className="relative text-center pt-15">
        <h1 className="text-5xl font-bold mb-1 text-amber-400">
          Welcome to the Constance Guild
        </h1>
        <h2 className="text-2xl mb-4 text-amber-400">
          Forge your path to become the greatest adventurer on the Earth
        </h2>
        <p className="text-lg text-amber-500 mb-4">
          Join our guild, where Adventurers from various Class and Race <br />{" "}
          collide to work and prosper together.
        </p>
        <CTAButton text={"Join us now!"} />
      </div>
    </section>
  );
}

export default Hero;
