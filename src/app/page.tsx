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
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">Conservation</p>
          <h3 className="mt-2 text-2xl font-semibold">Wildlife AI Assistant</h3>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Open the floating <strong>Ask AI</strong> button to chat about animals, habitats, and conservation.
          </p>
        </div>
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

      <AiInputDemo />
    </main>
  );
}
