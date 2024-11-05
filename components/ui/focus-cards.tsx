"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FaComputer, FaXbox, FaPlaystation, FaApple, FaInternetExplorer, FaLinux } from "react-icons/fa6";
import { MdOutlineDesktopMac } from "react-icons/md";
import { SiNintendoswitch } from "react-icons/si";
import { DiAndroid } from "react-icons/di";
import { SiSega } from "react-icons/si";
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
  parent_platforms: PlatformInfo[];
  metacritic: number;
  released: string;
}

// const uniquePlatforms = (platforms: PlatformInfo[]) => {
//   // Benzersiz platform türlerini bulmak için bir Set oluşturuyoruz
//   const platformTypes = new Set(
//     platforms.map(p => {
//       if (p.platform.slug.startsWith("playstation")) return "playstation";
//       if (p.platform.slug.startsWith("xbox")) return "xbox";
//       if (p.platform.slug.startsWith("pc")) return "pc";
//       if (p.platform.slug.startsWith("nintendo")) return "nintendo";
//       if (p.platform.slug.startsWith("android")) return "android";
//       if (p.platform.slug.startsWith("ios")) return "ios";
//       if (p.platform.slug.startsWith("android")) return "android";
//       return null;
//     }).filter(type => type !== null) // null olan değerleri filtreliyoruz
//   );

//   // Platform türlerine göre simgeleri döndür
//   return Array.from(platformTypes).map(type => {
//     if (type === "playstation") return <FaPlaystation key="playstation" />;
//     if (type === "xbox") return <FaXbox key="xbox" />;
//     if (type === "pc") return <FaComputer key="pc" />;
//     if(type === "nintendo") return <SiNintendoswitch key={"nintendo"}/>
//     return null;
//   });
// };


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
      key={index}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-2 h-[40vh] w-[80vw] md:h-[30vh] md:w-[28vw] lg:h-[35vh] lg:w-[20vw] transition-all duration-100 ease-out cursor-pointer ",
        hovered !== null && hovered === index && "scale-[1.2] z-10",
        hovered !== null && hovered !== index && "-z-10 "
      )}
    >

      {/* <div
        className={cn(
          "absolute inset-0 bg-3 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >

      </div> */}
      <div
        className={cn(
          "absolute bottom-0 left-2", // w-12 ve h-12 ekledik
        )}
      >
        <h3 className="text-center text-white font-gramatikaExtraLight">{card.released.split("-")[0]}</h3>
      </div>




      <div
        className={cn(
          "absolute z-10 -top-3 -right-3 h-10 w-10 lg:-top-4 lg:-right-4 md:-top-3  md:-right-3 rounded-full md:w-12 md:h-12 lg:h-16 lg:w-16 flex items-center justify-center", // w-12 ve h-12 ekledik
          card.metacritic > 90 && "bg-green-600",
          card.metacritic > 80 && card.metacritic < 90 && "bg-green-400",
          card.metacritic < 80 && card.metacritic > 70 && "bg-yellow-500",
          card.metacritic < 70 && "bg-red-500"
        )}
      >
        <h3 className="text-center text-white font-gramatikaBold">{card.metacritic}</h3>
      </div>

      {hovered == index ? (
        <div className="bg-black flex rounded-md  ">
          <div className="grid grid-cols-3 gap-2">
            {card.short_screenshots.map((img, index) => (
              <Image
                key={index}
                src={img.image}
                width={32}
                height={32}
                alt={`gallery-${index}`}
                className="object-cover max-h-48 sm:max-h-72 md:max-h-44 lg:max-h-48 xl:max-h-56"
              />
            ))}
          </div>
        </div>
      ) :
        <Image
          src={card.short_screenshots[0]?.image ? card.short_screenshots[0]?.image : "/placeholder.png"}
          alt={card.short_screenshots[0]?.id.toString() ? card.short_screenshots[0]?.id.toString() : "placholder"}
          fill
          className="object-cover max-h-48 sm:max-h-72 md:max-h-44 lg:max-h-48 xl:max-h-56"
        />}

      <div className="absolute top-48 sm:top-72 md:top-44 lg:top-48 xl:top-56 left-1 text-2xl font-gramatikaBold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 ">
        {card.name}
      </div>
      <div className="absolute bottom-1 right-1 flex flex-row gap-2">
        {card.parent_platforms.map((platform) => (
          <div key={platform.platform.id}>
            {platform.platform.slug === "playstation" && (<FaPlaystation className={cn("md:w-5 md:h-5 lg:w-7 lg:h-7 w-4 h-4 sm:w-6 sm:h-6")} />)}
            {platform.platform.slug === "ios" && (<FaApple className={cn("md:w-5 md:h-5 lg:w-7 lg:h-7 w-4 h-4 sm:w-6 sm:h-6")} />)}
            {platform.platform.slug === "android" && (<DiAndroid className={cn("md:w-5 md:h-5 lg:w-7 lg:h-7 w-4 h-4 sm:w-6 sm:h-6")} />)}
            {platform.platform.slug === "nintendo" && (<SiNintendoswitch className={cn("md:w-5 md:h-5 lg:w-7 lg:h-7 w-4 h-4 sm:w-6 sm:h-6")} />)}
            {platform.platform.slug === "pc" && (<FaComputer className={cn("md:w-5 md:h-5 lg:w-7 lg:h-7 w-4 h-4 sm:w-6 sm:h-6")} />)}
            {platform.platform.slug === "xbox" && (<FaXbox className={cn("md:w-5 md:h-5 lg:w-7 lg:h-7 w-4 h-4 sm:w-6 sm:h-6")} />)}
            {platform.platform.slug === "web" && (<FaInternetExplorer className={cn("md:w-5 md:h-5 lg:w-7 lg:h-7 w-4 h-4 sm:w-6 sm:h-6")} />)}
            {platform.platform.slug === "mac" && (<MdOutlineDesktopMac className={cn("md:w-5 md:h-5 lg:w-7 lg:h-7 w-4 h-4 sm:w-6 sm:h-6")} />)}
            {platform.platform.slug === "sega" && (<SiSega className={cn("md:w-5 md:h-5 lg:w-7 lg:h-7 w-4 h-4 sm:w-6 sm:h-6")} />)}
            {platform.platform.slug === "linux" && (<FaLinux className={cn("md:w-5 md:h-5 lg:w-7 lg:h-7 w-4 h-4 sm:w-6 sm:h-6")} />)}
          </div>
        ))}
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
