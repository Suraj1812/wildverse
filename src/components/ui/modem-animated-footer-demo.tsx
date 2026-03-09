"use client";

import { Footer } from "@/components/ui/modem-animated-footer";

export default function FooterDemo() {
  const navLinks = [
    { label: "Species", href: "#species" },
    { label: "Habitats", href: "#gallery" },
    { label: "Conservation", href: "#conservation" },
    { label: "Contact", href: "#footer" },
  ];

  return (
    <Footer
      brandName="WildVerse"
      brandDescription="Wildlife-focused stories, species tracking, and conservation-first field insights."
      navLinks={navLinks}
      creatorName="Wildlife Team"
      creatorUrl="#"
    />
  );
}
