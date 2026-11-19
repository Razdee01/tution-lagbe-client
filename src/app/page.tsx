import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import SubjectMarquee from "@/components/SubjectMarquee";
import SubjectsGrid from "@/components/SubjectsGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import TuitionSearchBar from "@/components/TuitionSearchBar";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <SubjectMarquee></SubjectMarquee>
      <TuitionSearchBar></TuitionSearchBar>
      <HowItWorks></HowItWorks>
      <SubjectsGrid></SubjectsGrid>
      <TestimonialsSection></TestimonialsSection>
      <PricingSection></PricingSection>
      <Footer></Footer>
    </div>
  );
}
