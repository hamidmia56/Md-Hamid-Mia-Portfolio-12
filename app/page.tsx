import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getExperience,
  getProjects,
  getSettings,
  getSkills,
  getTestimonials,
} from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [settings, projects, skills, experience, testimonials] =
    await Promise.all([
      getSettings(),
      getProjects(),
      getSkills(),
      getExperience(),
      getTestimonials(),
    ]);

  return (
    <>
      <Navbar name={settings.full_name} resumeUrl={settings.resume_url} />
      <main>
        <Hero settings={settings} />
        <About settings={settings} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience items={experience} />
        {testimonials.length > 0 && <Testimonials items={testimonials} />}
        <Contact email={settings.email} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
