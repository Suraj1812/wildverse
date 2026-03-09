"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

export function FeaturesSectionWithBentoGrid() {
  const features = [
    {
      title: "Track species effectively",
      description:
        "Track migration, sightings, and habitat changes with an easy wildlife dashboard.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 border-b md:col-span-4 md:border-r dark:border-neutral-800 lg:col-span-4",
    },
    {
      title: "Capture wildlife moments",
      description:
        "Organize ranger and camera-trap photos across forests, coasts, and mountains.",
      skeleton: <SkeletonTwo />,
      className:
        "col-span-1 border-b dark:border-neutral-800 md:col-span-2 lg:col-span-2",
    },
    {
      title: "Watch wildlife stories",
      description:
        "Learn from field documentaries and conservation explainers.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 border-b md:col-span-3 md:border-r dark:border-neutral-800 lg:col-span-3",
    },
    {
      title: "Protect habitats globally",
      description:
        "Visualize biodiversity hotspots and monitor threatened ecosystems around the world.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 border-b md:col-span-3 md:border-none lg:col-span-3",
    },
  ];

  return (
    <div className="relative z-20 mx-auto max-w-7xl py-12 lg:py-20" data-aos="fade-up">
      <div className="px-8" data-aos="zoom-in" data-aos-delay="40">
        <h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-foreground lg:text-5xl lg:leading-tight">
          Built for wildlife exploration
        </h4>

        <p className="mx-auto my-4 max-w-2xl text-center text-sm font-normal text-neutral-500 dark:text-neutral-300 lg:text-base">
          Discover species, habitats, and migration patterns through immersive visuals and field-ready tools.
        </p>
      </div>

      <div className="relative">
        <div className="mt-12 grid grid-cols-1 rounded-md xl:border dark:border-neutral-800 md:grid-cols-6 lg:grid-cols-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              className={feature.className}
              dataAos="fade-up"
              dataAosDelay={100 + index * 60}
            >
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
  dataAos,
  dataAosDelay,
}: {
  children?: React.ReactNode;
  className?: string;
  dataAos?: string;
  dataAosDelay?: number;
}) => {
  return (
    <div
      className={cn("relative overflow-hidden p-4 sm:p-8", className)}
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
    >
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="mx-auto max-w-5xl text-left text-xl tracking-tight text-foreground md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "mx-auto max-w-4xl text-left text-sm font-normal text-neutral-500 dark:text-neutral-300 md:text-base",
        "mx-0 my-2 max-w-sm text-left md:text-sm"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex h-full gap-10 px-2 py-8">
      <div className="group mx-auto h-full w-full bg-white p-5 shadow-2xl dark:bg-neutral-900">
        <div className="flex h-full w-full flex-1 flex-col space-y-2">
          <Image
            src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1200&q=80"
            alt="Elephant herd in savannah"
            width={800}
            height={800}
            className="aspect-square h-full w-full rounded-sm object-cover object-left-top"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-60 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-60 w-full bg-gradient-to-b from-white via-transparent to-transparent dark:from-black" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <Link
      href="https://www.youtube.com/watch?v=JkaxUblCGz0"
      target="__blank"
      className="group/image relative flex h-full gap-10"
    >
      <div className="group mx-auto h-full w-full bg-transparent dark:bg-transparent">
        <div className="relative flex h-full w-full flex-1 flex-col space-y-2">
          <IconBrandYoutubeFilled className="absolute inset-0 z-10 m-auto h-20 w-20 text-red-500" />
          <Image
            src="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=1200&q=80"
            alt="Wild tiger portrait"
            width={800}
            height={800}
            className="aspect-square h-full w-full rounded-sm object-cover object-center blur-none transition-all duration-200 group-hover/image:blur-md"
          />
        </div>
      </div>
    </Link>
  );
};

export const SkeletonTwo = () => {
  const images = [
    "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80",
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  const getRotate = (idx: number) => (idx % 2 === 0 ? -8 + idx : 7 - idx);

  return (
    <div className="relative flex h-full flex-col items-start gap-10 overflow-hidden p-8">
      <div className="-ml-20 flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={`images-first-${idx}`}
            style={{
              rotate: getRotate(idx),
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="mt-4 -mr-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <Image
              src={image}
              alt="Wildlife gallery image"
              width={500}
              height={500}
              className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={`images-second-${idx}`}
            style={{
              rotate: getRotate(idx + 1),
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="mt-4 -mr-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <Image
              src={image}
              alt="Wildlife gallery image"
              width={500}
              height={500}
              className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            />
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[100] h-full w-20 bg-gradient-to-r from-white to-transparent dark:from-black" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[100] h-full w-20 bg-gradient-to-l from-white to-transparent dark:from-black" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="relative mt-10 flex h-60 flex-col items-center bg-transparent dark:bg-transparent md:h-60">
      <Globe className="absolute -right-10 -bottom-80 md:-right-10 md:-bottom-72" />
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};
