"use client";

import React from "react";

import HeroScrollVideo from "@/components/ui/scroll-animated-video";

export default function ScrollAnimatedVideoDemo() {
  return (
    <main className="bg-background">
      <HeroScrollVideo
        title="Wildlife in Motion"
        subtitle="Wild Species • Critical Habitats • Conservation"
        meta={null}
        credits={
          <>
            <p>Built for</p>
            <p>Animal Discovery</p>
          </>
        }
        media="https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4"
        poster="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1600&q=80"
        overlay={{
          caption: "WILDLIFE SPECIES ATLAS",
          heading: "Wildlife Species Atlas",
          paragraphs: [
            "Track critically endangered species across shrinking habitats and fragmented migration corridors.",
            "Follow conservation work focused on anti-poaching, habitat restoration, and long-term recovery.",
          ],
          extra: (
            <div className="hsv-tags">
              <span>Endangered</span>
              <span>Habitat Loss</span>
              <span>Recovery Work</span>
            </div>
          ),
        }}
      />
    </main>
  );
}
