"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FaComputer, FaXbox, FaPlaystation, FaApple, FaInternetExplorer, FaLinux, FaReddit, FaRocket, FaHeart, FaPlus, FaHeartCircleMinus, FaThumbsDown } from "react-icons/fa6";
import { MdOutlineDesktopMac } from "react-icons/md";
import { SiNintendoswitch } from "react-icons/si";
import { DiAndroid } from "react-icons/di";
import { SiSega } from "react-icons/si";
import CircleButton from "../CircleButton";
import GoatSvg from './goat.svg';
import { FaMeh } from "react-icons/fa";
import ImageCarousel from "./ImageCarousel";
import { useRouter } from "next/navigation";

interface ShortScreenshots {
  id: number;
  image: string;
}

interface screenshots {
  id:number;
  image:string;
  width:number;
  height: number;
  is_deleted : boolean;
}

interface ratings {
  id: number;
  title: string;
  count: number;
  percent: number;
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
interface tags {
  id: number;
  name: string;
  slug: string;
  languages: string;
  games_count: number;
  image_background: string;
}

interface developers {
  id: number;
  name: string;
  slug: string;
  games_count : number;
  image_background: string;
}

interface esrb_rating {
  id: number;
  name: string;
  slug: string;
}

export interface GameData {
  id: number;
  name: string;
  slug: string;
  playtime: number;
  platforms: PlatformInfo[];
  stores: StoreInfo[];
  short_screenshots: ShortScreenshots[];
  parent_platforms: PlatformInfo[];
  metacritic: number;
  released: string;
  ratings: ratings[];
  tags: tags[];
  background_image: string;
  rating: number;
  developers : developers[];
  esrb_rating : esrb_rating;
  description_raw: string;
  website: string;
  screenshots : screenshots[];

  
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
  }) => {
    const router = useRouter()

    useEffect(() => {
      const handleScroll = () => {
        setHovered(null); // Sayfa kaydırıldığında hovered state sıfırlanır
      };

      window.addEventListener('scroll', handleScroll);

      // Event listener'ı component kaldırıldığında temizle
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseDown={() => setHovered(index)}
        onClick={()=> router.push(`/game/${card.id}`)}
        key={index}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-lg relative bg-2 h-[35vh] sm:h-[42vh] w-[80vw] md:h-[30vh] md:w-[28vw] lg:h-[35vh] lg:w-[20vw] transition-all duration-100 ease-out cursor-pointer ",
          hovered !== null && hovered === index

          && "scale-[1.2] transition-all duration-100 ease-linear z-10 h-[38vh] sm:h-[52vh] md:h-[35vh] lg:h-[42vh]",
          card.name && card.name.replaceAll(" ", "").length > 29 && hovered !== null && hovered === index && "h-[50vh] md:h-[38vh] lg:h-[45vh]",
          hovered !== null && hovered !== index && "-z-10 "
        )}
      >

        {/* container col */}
        <div className="text-2xl font-gramatikaBold flex flex-col items-start h-full w-full rounded-lg justify-normal">
          {/* Photo frame */}
          <div className="relative h-48 sm:h-72 md:h-44 lg:h-48 xl:h-56 w-full">
            {hovered == index && card.short_screenshots ? (
              <div className="relative h-full">
                <ImageCarousel short_screenshots={card.short_screenshots} />
              </div>
            ) : (
              <Image
                src={card.short_screenshots[0] ? card.short_screenshots[0]?.image : '/placeholder.png'}
                alt="gallery-0"
                fill
                objectFit="cover"
                className="rounded-t-lg"
              />
            )}
          </div>
          {/* Title  */}
          <h3 className="pl-1 text-4">
            {card.name}
          </h3>


          {/* released year and platforms row */}
          <div className="flex flex-row items-center justify-between px-1 w-full">
            <h3 className="text-center text-lg text-white font-gramatikaExtraLight">{card.released ? card.released.split("-")[0] : ''}
            </h3>
            <div className="flex flex-row gap-2">
              {
                card.parent_platforms &&
                card.parent_platforms.map((platform) => (
                  <div key={platform.platform.id} className="text-4">
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
          <div className={cn("pt-3 bottom-1 w-full px-1", index != hovered && "hidden")}>
            <div className="flex justify-between bg-1 rounded-3xl">
              <CircleButton onText="Add">
                <FaPlus />
              </CircleButton>
              <CircleButton onText="GOAT">
                <Image
                  width={24}
                  height={24}
                  src={"/goat.svg"}
                  alt="goat"
                />
              </CircleButton>

              <CircleButton onText="Like">
                <FaHeart color="#FF4D4D" />
              </CircleButton>
              <CircleButton onText="Meh">
                <FaMeh color="#B0BEC5" />
              </CircleButton>
              <CircleButton onText="Dislike">
                <FaThumbsDown color="#B22222" />
              </CircleButton>
            </div>

            {
              <div className="flex flex-row pt-2 overflow-x-clip text-nowrap">
                {card.tags && card.tags.map((tag) => (
                  <div key={tag.id} className="px-1 py-1 rounded-full text-xs font-gramatikaExtraLight text-3 whitespace-nowrap transform transition-transform duration-300 hover:translate-x-2">
                    {tag.name}
                  </div>
                ))}
              </div>

            }
          </div>


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



      </div>
    )
  }
);


Card.displayName = "Card";


export function FocusCards({ cards }: { cards: GameData[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex w-full justify-center h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-9 gap-y-24">
        {cards.map((card, index) => (
          card.name && (
            <Card
              key={card.name}
              card={card}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
            />
          )
        ))}
      </div>
    </div>

  );
}
