"use client";

import WildlifeCarousel, { WildlifeSlide } from "@/components/ui/wildlife-carousel";

const wildlifeSlides: WildlifeSlide[] = [
  {
    id: "fox",
    name: "Red Fox",
    image:
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fact: "An adaptive hunter found from grasslands to snowy forests, known for sharp hearing and stealth.",
  },
  {
    id: "raccoon",
    name: "Raccoon",
    image:
      "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fact: "A highly intelligent omnivore with dexterous paws, thriving in woodlands and urban environments.",
  },
  {
    id: "lion",
    name: "Lion",
    image:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fact: "A social big cat living in prides, lions play a key role in balancing savannah ecosystems.",
  },
  {
    id: "turtle",
    name: "Sea Turtle",
    image:
      "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fact: "An ancient ocean navigator threatened by habitat loss, fishing nets, and plastic pollution.",
  },
  {
    id: "white-tiger",
    name: "White Tiger",
    image:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fact: "An uncommon Bengal tiger pigmentation variant requiring strong habitat protection and genetic health management.",
  },
  {
    id: "squirrel",
    name: "Squirrel",
    image:
      "https://images.unsplash.com/photo-1504006833117-8886a355efbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fact: "A fast arboreal forager that helps forest regeneration by dispersing seeds and nuts.",
  },
  {
    id: "horse",
    name: "Wild Horse",
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fact: "A resilient grazer of open landscapes, vital for maintaining grassland dynamics in the wild.",
  },
];

export default function WildlifeCarouselDemo() {
  return <WildlifeCarousel slides={wildlifeSlides} />;
}
