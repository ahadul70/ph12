import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import ServicesOverview from "@/components/home/ServicesOverview";
import Testimonials from "@/components/home/Testimonials";

export const metadata = {
  title: "Care.xyz - Care you can Trust",
  description: "Professional babysitting, elderly care, and specialized support for your loved ones at home.",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <ServicesOverview />
      <Testimonials />
    </div>
  );
}
