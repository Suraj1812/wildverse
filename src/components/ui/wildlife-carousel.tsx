"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type WildlifeSlide = {
  id: string;
  name: string;
  image: string;
  fact: string;
};

type WildlifeCarouselProps = {
  slides: WildlifeSlide[];
  className?: string;
  autoPlayMs?: number;
};

export default function WildlifeCarousel({
  slides,
  className,
  autoPlayMs = 4200,
}: WildlifeCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);

  const goTo = React.useCallback(
    (next: number) => {
      if (!slides.length) return;
      const normalized = (next + slides.length) % slides.length;
      setDirection(normalized > index ? 1 : -1);
      setIndex(normalized);
    },
    [index, slides.length]
  );

  const next = React.useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = React.useCallback(() => goTo(index - 1), [goTo, index]);

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => next(), autoPlayMs);
    return () => window.clearInterval(id);
  }, [next, autoPlayMs, slides.length]);

  if (!slides.length) return null;
  const current = slides[index];

  return (
    <section
      className={cn("mx-auto w-full max-w-6xl px-4 py-14 md:py-18", className)}
      data-aos="fade-up"
    >
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Wildlife Showcase</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">Wild & Iconic Animals</h2>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={prev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background hover:bg-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background hover:bg-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border bg-background shadow-2xl">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="relative h-[52vh] w-full md:h-[62vh]"
          >
            <Image
              src={current.image}
              alt={current.name}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/20 bg-black/35 p-4 backdrop-blur">
          <p className="text-xs tracking-[0.2em] text-white/75 uppercase">Species Spotlight</p>
          <h3 className="mt-1 text-2xl font-bold text-white md:text-3xl">{current.name}</h3>
          <p className="mt-1 max-w-3xl text-sm text-white/90 md:text-base">{current.fact}</p>
        </div>

        <div className="absolute top-1/2 right-2 left-2 flex -translate-y-1/2 items-center justify-between md:hidden">
          <button
            type="button"
            onClick={prev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 md:grid-cols-7">
        {slides.map((slide, i) => (
          <button
            type="button"
            key={slide.id}
            onClick={() => goTo(i)}
            className={cn(
              "relative h-14 overflow-hidden rounded-lg border transition md:h-16",
              i === index ? "border-foreground shadow-lg" : "border-border hover:border-foreground/50"
            )}
          >
            <Image
              src={slide.image}
              alt={slide.name}
              fill
              sizes="160px"
              className="object-cover"
            />
            <div
              className={cn(
                "absolute inset-0 transition",
                i === index ? "bg-black/0" : "bg-black/35"
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
