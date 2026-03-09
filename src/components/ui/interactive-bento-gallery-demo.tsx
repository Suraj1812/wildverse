"use client";

import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";

const mediaItems = [
  {
    id: 1,
    type: "image",
    title: "Snow Leopard",
    desc: "Elusive mountain predator",
    url: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1000&q=80",
    span: "sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-3",
  },
  {
    id: 2,
    type: "video",
    title: "Elephant Herd",
    desc: "Savannah family crossing",
    url: "https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4",
    span: "col-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Red Fox",
    desc: "Alert hunter in grassland",
    url: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80",
    span: "sm:col-span-2 sm:row-span-2 md:col-span-1 md:row-span-3",
  },
  {
    id: 4,
    type: "image",
    title: "Bald Eagle",
    desc: "Focused and soaring",
    url: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=80",
    span: "sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 5,
    type: "video",
    title: "Macaw Flight",
    desc: "Vibrant rainforest motion",
    url: "https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4",
    span: "sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-3",
  },
  {
    id: 6,
    type: "image",
    title: "Sea Turtle",
    desc: "Calm coastal swimmer",
    url: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1200&q=80",
    span: "sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "Temple Monkeys",
    desc: "Playful troop behavior",
    url: "https://images.unsplash.com/photo-1708365170456-36b6d9f5231a?q=80&w=1041&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    span: "sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-3",
  },
];

export function BentoGridGalleryDemo() {
  return (
    <div className="w-full" data-aos="fade-up">
      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title="Wildlife Gallery Collection"
        description="Drag and explore a curated collection of animal and habitat moments"
      />
    </div>
  );
}
