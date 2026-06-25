import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CursorGlow } from "./components/CursorGlow";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { SelectedWork } from "./components/SelectedWork";
import { Process } from "./components/Process";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SelectedWork />
        <Process />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
