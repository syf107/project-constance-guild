function Hero() {
  return (
    <section className="relative bg-[url(images/guild-market.webp)] bg-cover bg-no-repeat bg-center h-screen flex items-start justify-center">
      <div className="absolute inset-0 bg-linear-to-b from-black from-20% via-transparent via-85% to-amber-500 to-95%"></div>
      <div className="relative  text-center mt-15">
        <h1 className="text-5xl font-bold mb-3 text-amber-400">
          Welcome to the Constance Guild
        </h1>
        <h2 className="text-2xl mb-2 text-amber-500">
          Forge your path to become the greatest adventurer on the Earth
        </h2>
        <p className="text-xl text-amber-500 mb-4">
          Join our guild, where Adventurers from various Class and Race <br />{" "}
          collide to work and prosper together.
        </p>
        <button className="px-6 py-4 text-2xl text-center text-amber-700 bg-green-300 rounded hover:bg-green-800 hover:text-amber-400 hover:cursor-pointer">
          Join the guild now!
        </button>
      </div>
    </section>
  );
}

export default Hero;
