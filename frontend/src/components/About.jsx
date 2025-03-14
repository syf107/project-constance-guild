import { Link } from "react-router";

function About() {
  return (
    <section className="container bg-amber-500  border-b-4 border-amber-700 pb-15">
      <div className="bg-linear-to-b from-amber-500 from-0% via-amber-300 via-50% to-amber-500 to-100% ">
        <div className="text-center mx-auto w-4/5 text-amber-900">
          <h1 className="text-4xl font-bold pb-5">About Constance Guild</h1>
          <p className="text-lg text-justify mb-8">
            Forged in the fires of the Dark Era, the Constance Guild was founded
            by three legendary warriors—a human, an elf, and an orc—who defied
            fate to bring peace to a world consumed by chaos. Named after the
            one thing that must endure—constancy—the guild stands as a beacon of
            strength, unity, and unwavering resolve. For centuries, adventurers
            from all walks of life have gathered under its banner to fight,
            protect, and rise together. This is where legends are made. Will you
            be one of them?
          </p>
          <Link
            to="/history"
            className="text-xl bg-amber-400 px-5 py-2 border-4 hover:cursor-pointer hover:bg-amber-700 hover:text-amber-400"
          >
            Read More Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}

export default About;
