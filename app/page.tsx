import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { ContactCTA } from "./components/ContactCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedProjects />
        <Services />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
