"use client";

import React, { CSSProperties, ReactNode, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Source = { mp4?: string; webm?: string; ogg?: string };
type VideoLike = string | Source;

type Eases = {
  container?: string;
  overlay?: string;
  text?: string;
};

export type HeroScrollVideoProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  credits?: ReactNode;
  media?: VideoLike;
  poster?: string;
  mediaType?: "video" | "image";
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;
  overlay?: {
    caption?: ReactNode;
    heading?: ReactNode;
    paragraphs?: ReactNode[];
    extra?: ReactNode;
  };
  initialBoxSize?: number;
  targetSize?: { widthVw: number; heightVh: number; borderRadius?: number } | "fullscreen";
  scrollHeightVh?: number;
  showHeroExitAnimation?: boolean;
  sticky?: boolean;
  overlayBlur?: number;
  overlayRevealDelay?: number;
  eases?: Eases;
  smoothScroll?: boolean;
  lenisOptions?: Record<string, unknown>;
  className?: string;
  style?: CSSProperties;
  themeMode?: "light" | "dark" | "system";
};

const DEFAULTS = {
  initialBoxSize: 360,
  targetSize: "fullscreen" as const,
  scrollHeightVh: 280,
  overlayBlur: 10,
  overlayRevealDelay: 0.35,
  eases: {
    container: "expo.out",
    overlay: "expo.out",
    text: "power3.inOut",
  } as Eases,
};

function isSourceObject(m?: VideoLike): m is Source {
  return !!m && typeof m !== "string";
}

export const HeroScrollVideo: React.FC<HeroScrollVideoProps> = ({
  title = "Wild Earth",
  subtitle = "Animals in Motion",
  meta = "WILDLIFE • 2026",
  credits = (
    <>
      <p>Captured for</p>
      <p>Conservation Stories</p>
    </>
  ),
  media,
  poster,
  mediaType = "video",
  muted = true,
  loop = true,
  playsInline = true,
  autoPlay = false,
  overlay = {
    caption: "SPECIES LOG • 07",
    heading: "Living Habitats, Moving Life",
    paragraphs: [
      "Scroll to expand the wildlife frame and reveal habitat insights.",
      "Built for species discovery, ecosystem learning, and conservation storytelling.",
    ],
    extra: null,
  },
  initialBoxSize = DEFAULTS.initialBoxSize,
  targetSize = DEFAULTS.targetSize,
  scrollHeightVh = DEFAULTS.scrollHeightVh,
  showHeroExitAnimation = true,
  sticky = true,
  overlayBlur = DEFAULTS.overlayBlur,
  overlayRevealDelay = DEFAULTS.overlayRevealDelay,
  eases = DEFAULTS.eases,
  smoothScroll = true,
  lenisOptions,
  className,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayCaptionRef = useRef<HTMLDivElement | null>(null);
  const overlayContentRef = useRef<HTMLDivElement | null>(null);

  const cssVars: CSSProperties = useMemo(
    () =>
      ({
        ["--initial-size" as string]: `${initialBoxSize}px`,
        ["--overlay-blur" as string]: `${overlayBlur}px`,
      }) as CSSProperties,
    [initialBoxSize, overlayBlur]
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    let rafId = 0;
    let heroTl: gsap.core.Timeline | null = null;
    let mainTl: gsap.core.Timeline | null = null;
    let darkenEl: HTMLDivElement | null = null;

    const root = rootRef.current;
    const container = containerRef.current;
    const overlayEl = overlayRef.current;
    const overlayCaption = overlayCaptionRef.current;
    const overlayContent = overlayContentRef.current;
    const headline = headlineRef.current;
    if (!root || !container || !overlayEl || !overlayCaption || !overlayContent || !headline) return;

    if (smoothScroll) {
      lenis = new Lenis({
        duration: 0.8,
        smoothWheel: true,
        ...lenisOptions,
      });
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      lenis.on("scroll", () => ScrollTrigger.update());
    }

    const containerEase = eases.container ?? "expo.out";
    const overlayEase = eases.overlay ?? "expo.out";
    const textEase = eases.text ?? "power3.inOut";

    darkenEl = document.createElement("div");
    darkenEl.style.position = "absolute";
    darkenEl.style.inset = "0";
    darkenEl.style.background = "rgba(0,0,0,0)";
    darkenEl.style.pointerEvents = "none";
    darkenEl.style.zIndex = "1";
    container.appendChild(darkenEl);

    if (showHeroExitAnimation) {
      heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: headline,
          start: "top top",
          end: "top+=380 top",
          scrub: 1,
        },
      });

      headline.querySelectorAll<HTMLElement>(".hsv-headline > *").forEach((el, i) => {
        heroTl?.to(
          el,
          {
            y: -28,
            opacity: 0,
            filter: "blur(3px)",
            ease: textEase,
          },
          i * 0.06
        );
      });
    }

    const triggerEl = root.querySelector("[data-sticky-scroll]") as HTMLElement | null;
    if (!triggerEl) return;

    const target =
      targetSize === "fullscreen"
        ? { width: "100vw", height: "100vh", borderRadius: 0 }
        : {
            width: `${targetSize.widthVw}vw`,
            height: `${targetSize.heightVh}vh`,
            borderRadius: targetSize.borderRadius ?? 0,
          };

    gsap.set(container, {
      width: initialBoxSize,
      height: initialBoxSize,
      borderRadius: 22,
    });
    gsap.set(overlayEl, { clipPath: "inset(100% 0 0 0)" });
    gsap.set(overlayContent, { filter: `blur(${overlayBlur}px)`, y: 24 });
    gsap.set(overlayCaption, { y: 24 });

    mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    mainTl
      .to(
        container,
        {
          width: target.width,
          height: target.height,
          borderRadius: target.borderRadius,
          ease: containerEase,
        },
        0
      )
      .to(
        darkenEl,
        {
          backgroundColor: "rgba(0,0,0,0.22)",
          ease: "power2.out",
        },
        0
      )
      .to(
        overlayEl,
        {
          clipPath: "inset(0% 0 0 0)",
          backdropFilter: `blur(${overlayBlur}px)`,
          ease: overlayEase,
        },
        overlayRevealDelay
      )
      .to(overlayCaption, { y: 0, ease: overlayEase }, overlayRevealDelay + 0.05)
      .to(
        overlayContent,
        {
          y: 0,
          filter: "blur(0px)",
          ease: overlayEase,
        },
        overlayRevealDelay + 0.05
      );

    const videoEl = container.querySelector("video") as HTMLVideoElement | null;
    if (videoEl) {
      videoEl.play().catch(() => {});
    }

    return () => {
      heroTl?.kill();
      mainTl?.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (root.contains(t.trigger as Node)) t.kill(true);
      });
      if (darkenEl?.parentElement) darkenEl.parentElement.removeChild(darkenEl);
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [
    initialBoxSize,
    targetSize,
    scrollHeightVh,
    overlayBlur,
    overlayRevealDelay,
    eases.container,
    eases.overlay,
    eases.text,
    showHeroExitAnimation,
    sticky,
    smoothScroll,
    lenisOptions,
  ]);

  const renderMedia = () => {
    if (mediaType === "image") {
      const src = typeof media === "string" ? media : media?.mp4 || "";
      return <Image src={src} alt="Wildlife scene" fill className="object-cover" sizes="100vw" priority />;
    }

    const sources: JSX.Element[] = [];
    if (typeof media === "string") {
      sources.push(<source key="mp4" src={media} type="video/mp4" />);
    } else if (isSourceObject(media)) {
      if (media.webm) sources.push(<source key="webm" src={media.webm} type="video/webm" />);
      if (media.mp4) sources.push(<source key="mp4" src={media.mp4} type="video/mp4" />);
      if (media.ogg) sources.push(<source key="ogg" src={media.ogg} type="video/ogg" />);
    }

    return (
      <video
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        autoPlay={autoPlay || muted}
        className="h-full w-full object-cover"
      >
        {sources}
      </video>
    );
  };

  return (
    <div
      ref={rootRef}
      className={["hsv-root", className].filter(Boolean).join(" ")}
      style={{ ...cssVars, ...style }}
      data-aos="fade-up"
    >
      <div className="hsv-container" ref={headlineRef}>
        <div className="hsv-headline">
          <h1 className="hsv-title">{title}</h1>
          {subtitle ? <h2 className="hsv-subtitle">{subtitle}</h2> : null}
          {meta ? <div className="hsv-meta">{meta}</div> : null}
          {credits ? <div className="hsv-credits">{credits}</div> : null}
        </div>
      </div>

      <div className="hsv-scroll" data-sticky-scroll style={{ height: `${Math.max(150, scrollHeightVh)}vh` }}>
        <div className={`hsv-sticky ${sticky ? "is-sticky" : ""}`}>
          <div className="hsv-media" ref={containerRef}>
            {renderMedia()}
            <div className="hsv-overlay" ref={overlayRef}>
              {overlay?.caption ? (
                <div className="hsv-caption" ref={overlayCaptionRef}>
                  {overlay.caption}
                </div>
              ) : null}
              <div className="hsv-overlay-content" ref={overlayContentRef}>
                {overlay?.heading ? <h3>{overlay.heading}</h3> : null}
                {overlay?.paragraphs?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {overlay?.extra}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hsv-root {
          --bg: var(--background);
          --text: var(--foreground);
          --muted: color-mix(in oklch, var(--foreground), transparent 45%);
          --muted-bg: color-mix(in oklch, var(--foreground), transparent 92%);
          --muted-border: color-mix(in oklch, var(--foreground), transparent 82%);
          --overlay-bg: linear-gradient(
            to top,
            color-mix(in oklch, black, transparent 26%) 0%,
            color-mix(in oklch, black, transparent 48%) 45%,
            transparent 100%
          );
          --overlay-text: color-mix(in oklch, var(--foreground), white 18%);
          --accent: color-mix(in oklch, var(--foreground), white 20%);
          --accent-2: color-mix(in oklch, var(--foreground), white 35%);
          --shadow: 0 16px 36px rgba(0, 0, 0, 0.16);
          background: var(--bg);
          color: var(--text);
          overflow-x: clip;
        }
        .hsv-container {
          height: 100vh;
          display: grid;
          place-items: center;
          padding: 0;
          position: relative;
        }
        .hsv-headline {
          text-align: center;
          max-width: min(100%, 1100px);
        }
        .hsv-title {
          margin: 0 0 0.6rem 0;
          font-size: clamp(40px, 8vw, 96px);
          line-height: 0.98;
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, var(--text) 0%, var(--text) 55%, var(--accent) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hsv-subtitle {
          margin: 0 0 1.25rem 0;
          font-size: clamp(18px, 3.5vw, 28px);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .hsv-meta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.7rem;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          background: var(--muted-bg);
          border: 1px solid var(--muted-border);
          color: var(--text);
          margin: 1rem 0 0 0;
        }
        .hsv-meta::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          display: inline-block;
        }
        .hsv-credits {
          margin-top: 1rem;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }
        .hsv-scroll {
          position: relative;
        }
        .hsv-sticky.is-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: grid;
          place-items: center;
        }
        .hsv-media {
          position: relative;
          width: var(--initial-size);
          height: var(--initial-size);
          border-radius: 20px;
          overflow: hidden;
          background: #000;
          box-shadow: var(--shadow);
        }
        .hsv-overlay {
          position: absolute;
          inset: 0;
          background: var(--overlay-bg);
          color: var(--overlay-text);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          text-align: left;
          padding: clamp(16px, 4vw, 52px);
          clip-path: inset(100% 0 0 0);
          backdrop-filter: blur(calc(var(--overlay-blur) * 0.35));
          z-index: 2;
        }
        .hsv-caption {
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          position: static;
          margin-bottom: 0.4rem;
          opacity: 0.88;
          color: rgba(255, 255, 255, 0.82);
        }
        .hsv-overlay-content {
          margin-top: 0;
          max-width: min(62ch, 92vw);
          display: grid;
          gap: 0.95rem;
          background: color-mix(in oklch, black, transparent 72%);
          border: 1px solid color-mix(in oklch, white, transparent 88%);
          border-radius: 18px;
          padding: clamp(16px, 2.3vw, 26px);
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.26);
        }
        .hsv-overlay-content h3 {
          font-size: clamp(22px, 3.2vw, 40px);
          line-height: 1.04;
          margin: 0;
          font-weight: 900;
          background: linear-gradient(90deg, #fff 0%, #e6ffef 50%, #a5f3fc 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hsv-overlay-content p {
          font-size: clamp(14px, 1.25vw, 18px);
          line-height: 1.6;
          margin: 0;
          color: #f8fafc;
          opacity: 0.86;
          max-width: 58ch;
        }
        .hsv-overlay-content p:first-of-type {
          opacity: 0.96;
        }
        .hsv-tags {
          margin-top: 0.3rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .hsv-tags span {
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.24);
          background: rgba(255, 255, 255, 0.09);
          padding: 0.28rem 0.58rem;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.92);
        }
      `}</style>
    </div>
  );
};

export default HeroScrollVideo;
