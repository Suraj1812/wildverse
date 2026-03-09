"use client";

import { useState } from "react";
import Image from "next/image";
import { FaBehance, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Snow Leopard",
    role: "MOUNTAIN PREDATOR",
    image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80",
    social: { twitter: "#", linkedin: "#", behance: "#" },
  },
  {
    id: "2",
    name: "African Elephant",
    role: "KEYSTONE HERBIVORE",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=800&q=80",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "3",
    name: "Bengal Tiger",
    role: "FOREST APEX PREDATOR",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "4",
    name: "Great Horned Owl",
    role: "NOCTURNAL HUNTER",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=800&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "5",
    name: "Sea Turtle",
    role: "OCEAN NAVIGATOR",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "6",
    name: "Scarlet Macaw",
    role: "RAINFORREST CANOPY",
    image: "https://images.unsplash.com/photo-1552727451-6f5671e14d83?auto=format&fit=crop&w=800&q=80",
    social: { instagram: "#" } as TeamMember["social"],
  },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div
      className="mx-auto flex w-full max-w-5xl select-none flex-col items-start gap-8 px-4 py-8 font-sans md:flex-row md:gap-10 md:px-6 lg:gap-14"
      data-aos="fade-up"
    >
      <div className="flex flex-shrink-0 gap-2 overflow-x-auto pb-1 md:gap-3 md:pb-0" data-aos="zoom-in-right">
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="h-[120px] w-[110px] sm:h-[140px] sm:w-[130px] md:h-[165px] md:w-[155px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        <div className="mt-[48px] flex flex-col gap-2 sm:mt-[56px] md:mt-[68px] md:gap-3">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="h-[132px] w-[122px] sm:h-[155px] sm:w-[145px] md:h-[182px] md:w-[172px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        <div className="mt-[22px] flex flex-col gap-2 sm:mt-[26px] md:mt-[32px] md:gap-3">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="h-[125px] w-[115px] sm:h-[146px] sm:w-[136px] md:h-[172px] md:w-[162px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      <div
        className="flex w-full flex-1 flex-col gap-4 pt-0 sm:grid sm:grid-cols-2 md:flex md:flex-col md:gap-5 md:pt-2"
        data-aos="fade-left"
        data-aos-delay="100"
      >
        {members.map((member) => (
          <MemberRow key={member.id} member={member} hoveredId={hoveredId} onHover={setHoveredId} />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        "relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl transition-opacity duration-300",
        className,
        isDimmed ? "opacity-60" : "opacity-100"
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes="(max-width: 768px) 40vw, 20vw"
        className="object-cover transition-[filter] duration-500"
        style={{
          filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.77)",
        }}
      />
    </div>
  );
}

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = Boolean(
    member.social?.twitter || member.social?.linkedin || member.social?.instagram || member.social?.behance
  );

  return (
    <div
      className={cn("cursor-pointer transition-opacity duration-300", isDimmed ? "opacity-50" : "opacity-100")}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "h-3 w-4 flex-shrink-0 rounded-[5px] transition-all duration-300",
            isActive ? "w-5 bg-foreground" : "bg-foreground/25"
          )}
        />
        <span
          className={cn(
            "text-base leading-none font-semibold tracking-tight transition-colors duration-300 md:text-[18px]",
            isActive ? "text-foreground" : "text-foreground/80"
          )}
        >
          {member.name}
        </span>

        {hasSocial && (
          <div
            className={cn(
              "ml-0.5 flex items-center gap-1.5 transition-all duration-200",
              isActive ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-2 opacity-0"
            )}
          >
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 text-muted-foreground transition-all duration-150 hover:scale-110 hover:bg-foreground/10 hover:text-foreground"
                title="X / Twitter"
              >
                <FaTwitter size={10} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 text-muted-foreground transition-all duration-150 hover:scale-110 hover:bg-foreground/10 hover:text-foreground"
                title="LinkedIn"
              >
                <FaLinkedinIn size={10} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 text-muted-foreground transition-all duration-150 hover:scale-110 hover:bg-foreground/10 hover:text-foreground"
                title="Instagram"
              >
                <FaInstagram size={10} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 text-muted-foreground transition-all duration-150 hover:scale-110 hover:bg-foreground/10 hover:text-foreground"
                title="Behance"
              >
                <FaBehance size={10} />
              </a>
            )}
          </div>
        )}
      </div>

      <p className="mt-1.5 pl-[27px] text-[7px] font-medium tracking-[0.2em] text-muted-foreground uppercase md:text-[10px]">
        {member.role}
      </p>
    </div>
  );
}
