import CTAButton from "./CTAButton";

function CallToAction() {
  return (
    <section className="w-full bg-amber-700">
      <div className="relative bg-[url(/images/land.jpg)] bg-cover bg-no-repeat bg-center h-screen">
        <div className="absolute inset-0 bg-linear-to-b from-amber-700 from-10%"></div>
        <div className="relative flex-row justify-items-center">
          <h1 className="text-center font-bold text-4xl text-amber-400 mb-10">
            What are you waiting for?
          </h1>
          <div className="relative w-4/5 mx-auto flex justify-between bg-amber-700 mb-15 border-4 border-amber-300 border-double py-10 px-5 text-amber-300">
            <div className="basis-1/4">
              <p className="text-7xl text-amber-300 font-extrabold">300++</p>
              <p className="text-4xl tracking-widest font-semibold">
                Adventurers
              </p>
              <p className="text-xl text-justify">
                Have joined us. Exploring and Expanding the Horizons.
              </p>
            </div>
            <div className="basis-1/4">
              <p className="text-7xl text-amber-300 font-extrabold">90++</p>
              <p className="text-4xl tracking-widest font-semibold">Quests</p>
              <p className="text-xl text-justify">
                Actively requested by the kingdom and citizens.
              </p>
            </div>
            <div className="basis-1/4">
              <p className="text-7xl text-amber-300 font-extrabold">30++</p>
              <p className="text-4xl tracking-widest font-semibold">Party</p>
              <p className="text-xl text-justify">
                Protecting the lands and raiding the dungeons.
              </p>
            </div>
          </div>

          <CTAButton text={"Join Us right now!"} />
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
