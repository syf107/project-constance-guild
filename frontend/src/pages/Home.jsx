import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import QnA from "../components/frequentlyAskedQuestion";
import CallToAction from "../components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Testimonials />
      <QnA />
      <CallToAction />
    </>
  );
}
