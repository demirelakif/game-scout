"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ShortScreenshots {
  id: number;
  image: string;
}

interface Store {
  id: number;
  name: string;
  slug: string;
}

interface StoreInfo {
  store: Store;
}

interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface PlatformInfo {
  platform: Platform;
}

interface GameData {
  name: string;
  slug: string;
  playtime: number;
  platforms: PlatformInfo[];
  stores: StoreInfo[];
  short_screenshots: ShortScreenshots[];
}

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: GameData;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-2 overflow-hidden h-[40vh] w-[80vw] md:h-[30vh] md:w-[28vw] lg:h-[35vh] lg:w-[20vw] transition-all duration-100 ease-out cursor-pointer ",
        // hovered !== null && hovered === index && "scale-[1.40] z-10", 
        //hovered !== null && hovered !== index && "blur-sm "
      )}
    >
      <Image
        src={card.short_screenshots[0]?.image}
        alt={card.short_screenshots[0]?.id.toString()}
        fill
        className="object-cover max-h-48"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.name}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";


export function FocusCards({ cards }: { cards: GameData[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex w-full justify-center h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <Card
            key={card.name}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
    </div>

  );
}
