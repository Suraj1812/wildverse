"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  expandedContent?: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  locationText: string;
  className?: string;
}

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  expandedContent,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  locationText,
  className,
}: MinimalistHeroProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.55 });

  const mediaCardWidth = useTransform(progress, [0, 1], [250, 980]);
  const mediaCardHeight = useTransform(progress, [0, 1], [340, 560]);
  const mediaRadius = useTransform(progress, [0, 1], [24, 14]);
  const imageScale = useTransform(progress, [0, 1], [1.12, 1]);
  const imageY = useTransform(progress, [0, 1], [0, -22]);
  const headingY = useTransform(progress, [0, 1], [0, -24]);
  const headingOpacity = useTransform(progress, [0, 1], [1, 0.82]);
  const sideTextX = useTransform(progress, [0, 1], [0, -22]);
  const sideTextOpacity = useTransform(progress, [0, 0.7, 1], [1, 0.9, 0.45]);
  const chromeOpacity = useTransform(progress, [0, 1], [1, 0.72]);
  const previewText = mainText.length > 90 ? `${mainText.slice(0, 90)}...` : mainText;

  const handleNavClick = React.useCallback((href: string) => {
    if (!href.startsWith("#")) {
      setMobileMenuOpen(false);
      return;
    }
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  }, []);

  const handleReadMore = React.useCallback(() => {
    if (readMoreLink && !readMoreLink.startsWith("#")) {
      window.open(readMoreLink, "_blank", "noopener,noreferrer");
      return;
    }
    setExpanded((v) => !v);
  }, [readMoreLink]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "relative h-[170vh] w-full bg-background font-sans",
        className
      )}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-between overflow-hidden p-8 md:p-12">
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0),rgba(0,0,0,0.04))] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0),rgba(0,0,0,0.2))]"
          style={{ opacity: chromeOpacity }}
        />

        <header className="z-30 flex w-full max-w-7xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold tracking-wider"
            style={{ opacity: chromeOpacity }}
          >
            {logoText}
          </motion.div>
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-1.5 md:hidden"
            aria-label="Open menu"
            style={{ opacity: chromeOpacity }}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-foreground"></span>
            <span className="block h-0.5 w-6 bg-foreground"></span>
            <span className="block h-0.5 w-5 bg-foreground"></span>
          </motion.button>
        </header>
        {mobileMenuOpen ? (
          <div className="z-40 mt-3 flex w-full max-w-7xl flex-col gap-2 rounded-xl border bg-background/90 p-4 backdrop-blur md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded px-2 py-2 text-sm font-medium tracking-wide text-foreground/80 hover:bg-accent hover:text-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}

        <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="z-20 order-2 text-center md:order-1 md:text-left"
            style={{ opacity: sideTextOpacity, x: sideTextX }}
          >
            <motion.p
              className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0"
              animate={{ scale: expanded ? 1.03 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {expanded ? mainText : previewText}
            </motion.p>
            <button
              type="button"
              className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font"
              onClick={handleReadMore}
            >
              {expanded ? "Show Less" : "Read More"}
            </button>
            {expanded ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 max-w-sm rounded-xl border bg-background/80 p-4 text-left text-sm leading-relaxed text-foreground shadow-xl backdrop-blur"
              >
                {expandedContent || mainText}
              </motion.div>
            ) : null}
          </motion.div>

          <div className="relative order-1 flex h-full items-center justify-center md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative z-10 overflow-hidden border border-foreground/15 shadow-2xl"
              style={{
                width: mediaCardWidth,
                height: mediaCardHeight,
                borderRadius: mediaRadius,
                y: imageY,
                maxWidth: "92vw",
              }}
            >
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-cover"
                style={{ scale: imageScale }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    "https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
            style={{ y: headingY, opacity: headingOpacity }}
          >
            <h1 className="text-7xl font-extrabold text-foreground md:text-8xl lg:text-9xl">
              <motion.span>{overlayText.part1}</motion.span>
              <br />
              <motion.span>{overlayText.part2}</motion.span>
            </h1>
          </motion.div>
        </div>

        <footer className="z-30 flex w-full max-w-7xl items-center justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-sm font-medium text-foreground/80"
            style={{ opacity: chromeOpacity }}
          >
            {locationText}
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export type { MinimalistHeroProps };
