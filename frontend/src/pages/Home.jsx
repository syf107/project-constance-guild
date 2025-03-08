import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Features />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
