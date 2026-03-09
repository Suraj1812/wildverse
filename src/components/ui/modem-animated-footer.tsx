"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  className?: string;
}

export const Footer = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  navLinks = [],
  creatorName,
  creatorUrl,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative mt-0 w-full overflow-hidden", className)} data-aos="fade-up">
      <footer className="relative mt-8 border-t bg-background" data-aos="fade-up">
        <div className="relative mx-auto flex min-h-[20rem] max-w-7xl flex-col justify-between p-4 py-8 sm:min-h-[22rem] md:min-h-[24rem]">
          <div className="mb-12 flex w-full flex-col sm:mb-20 md:mb-0">
            <div className="flex w-full flex-col items-center">
              <div className="flex flex-1 flex-col items-center space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-foreground">{brandName}</span>
                </div>
                <p className="w-full max-w-sm px-4 text-center font-semibold text-muted-foreground sm:w-96 sm:px-0">
                  {brandDescription}
                </p>
              </div>

              {navLinks.length > 0 && (
                <div className="flex max-w-full flex-wrap justify-center gap-4 px-4 text-sm font-medium text-muted-foreground">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="duration-300 hover:font-semibold hover:text-foreground"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-2 px-4 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-1 md:px-0">
            <p className="text-center text-base text-muted-foreground md:text-left">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <Link
                  href={creatorUrl}
                  target="_blank"
                  className="text-base text-muted-foreground transition-colors duration-300 hover:font-medium hover:text-foreground"
                >
                  Crafted by {creatorName}
                </Link>
              </nav>
            )}
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 select-none bg-gradient-to-b from-foreground/20 via-foreground/10 to-transparent bg-clip-text px-4 text-center font-extrabold leading-none tracking-tighter text-transparent md:bottom-20"
          style={{
            fontSize: "clamp(3rem, 12vw, 10rem)",
            maxWidth: "95vw",
          }}
        >
          {brandName.toUpperCase()}
        </div>

        <div className="absolute bottom-18 left-1/2 h-1 w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent backdrop-blur-sm sm:bottom-20" />

        <div className="absolute bottom-14 h-20 w-full bg-gradient-to-t from-background via-background/80 to-background/40 blur-[1em]" />
      </footer>
    </section>
  );
};
