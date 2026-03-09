"use client";

import React from "react";

import { MinimalistHero } from "@/components/ui/minimalist-hero";

const MinimalistHeroDemo = () => {
  const navLinks = [
    { label: "HOME", href: "#home" },
    { label: "SPECIES", href: "#species" },
    { label: "CONSERVATION", href: "#conservation" },
    { label: "TEAM", href: "#team" },
  ];

  return (
    <MinimalistHero
      logoText="wildlife."
      navLinks={navLinks}
      mainText="Explore wild species and untamed landscapes through stories focused on habitat protection and biodiversity."
      expandedContent="From arctic foxes and sea turtles to rainforest macaws and big cats, we document how animals adapt, migrate, hunt, and survive in fragile ecosystems. Our field stories focus on endangered species, habitat restoration, and practical conservation actions that protect biodiversity for future generations."
      readMoreLink="#"
      imageSrc="https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=900&q=80"
      imageAlt="Arctic fox in snowy terrain"
      overlayText={{
        part1: "wild",
        part2: "earth.",
      }}
      locationText="Serengeti National Park"
    />
  );
};

export default MinimalistHeroDemo;
