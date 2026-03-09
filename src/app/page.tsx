import AiInputDemo from "@/components/ui/ai-input-demo";
import { FeaturesSectionWithBentoGridDemo } from "@/components/ui/feature-section-with-bento-grid-demo";
import { BentoGridGalleryDemo } from "@/components/ui/interactive-bento-gallery-demo";
import FooterDemo from "@/components/ui/modem-animated-footer-demo";
import ScrollAnimatedVideoDemo from "@/components/ui/scroll-animated-video-demo";
import TeamShowcaseDemo from "@/components/ui/team-showcase-demo";
import WildlifeCarouselDemo from "@/components/ui/wildlife-carousel-demo";

export default function Home() {
  return (
    <main id="home" className="bg-background">
      <section id="hero" className="scroll-mt-20" data-aos="fade-up">
        <ScrollAnimatedVideoDemo />
      </section>
      <section
        id="species"
        className="scroll-mt-20 border-t border-border/50"
        data-aos="fade-up"
        data-aos-delay="40"
      >
        <FeaturesSectionWithBentoGridDemo />
      </section>
      <section
        id="carousel"
        className="scroll-mt-20 border-t border-border/50"
        data-aos="fade-up"
        data-aos-delay="70"
      >
        <WildlifeCarouselDemo />
      </section>
      <section
        id="gallery"
        className="scroll-mt-20 border-t border-border/50"
        data-aos="fade-up"
        data-aos-delay="80"
      >
        <BentoGridGalleryDemo />
      </section>
      <section
        id="conservation"
        className="scroll-mt-20 border-t border-border/50"
        data-aos="fade-up"
        data-aos-delay="120"
      >
        <AiInputDemo />
      </section>
      <section
        id="team"
        className="scroll-mt-20 border-t border-border/50"
        data-aos="fade-up"
        data-aos-delay="160"
      >
        <TeamShowcaseDemo />
      </section>
      <section
        id="footer"
        className="scroll-mt-20 border-t border-border/50"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <FooterDemo />
      </section>
    </main>
  );
}
