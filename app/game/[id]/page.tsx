'use client'
import { fetchGameById, fetchGames } from "@/app/action";
import CircleButton from "@/components/CircleButton";
import { GameData } from "@/components/ui/focus-cards";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { FaHeart, FaMeh, FaPlus, FaThumbsDown } from "react-icons/fa";

export default function DetailPage() {
    const [game, setGame] = useState<GameData>();
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        setisLoading(true);
        setTimeout(() => {
            fetchGameById(id as string).
                then((g) => {
                    setGame(g)
                    console.log(g.screenshots)
                });
            setisLoading(false);
        }, 2000);

    }, [])

    if (isLoading) {
        return <Image
            src={"/spinner.svg"}
            alt="spinner"
            width={64}
            height={64}
            className="absolute left-1/2 top-1/3"
        />

    }

    else {
        return (
            <section className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-64 w-full">
                <div className="font-gramatikaBlack text-4 text-3xl pb-5">
                    {game?.name}
                    <p className="text-3 font-gramatikaRegular text-lg -mt-2">
                        {game?.developers.map((developer)=>developer.name)}
                    </p>
                </div>
                {/* main image and gallery */}
                <div className="flex flex-row max-h-[30vh] md:max-h-[45vh] gap-2 w-full">
                    {/* main image */}
                    <div className="relative max-h-[30vh] md:max-h-[45vh] w-full ">
                        <Image
                            src={
                                selectedImage && game?.screenshots?.find(screenshot => screenshot.id === selectedImage)?.image
                                    ? game.screenshots.find(screenshot => screenshot.id === selectedImage)?.image || "/placeholder.png"
                                    : game?.background_image || "/placeholder.png"
                            }
                            fill
                            className="object-cover rounded-3xl"
                            alt={game?.slug || "placeholder"}
                        />



                    </div>
                    {/* screenshots  */}
                    <div className="grid grid-flow-col auto-rows-max grid-rows-2 gap-2 md:grid-rows-4 md:gap-y-3 min-w-[25vw]">
                        {
                            game?.screenshots?.map((screenshot, index) => (
                                <div className="relative h-[10vh] w-full hover:opacity-60 cursor-pointer"
                                    key={screenshot.id}
                                >

                                    <Image
                                        src={screenshot.image}
                                        fill
                                        alt={game?.slug ? game.slug : "placeholder"}
                                        onClick={() => setSelectedImage(screenshot.id)}
                                        className={`rounded-2xl object-cover transition-transform duration-200 ${screenshot.id === selectedImage ? "scale-125 z-10" : ""}`} />

                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* game detail infos and description */}
                <div className="grid grid-cols-2 justify-between gap-3 py-8">

                    {/* description */}
                    <section className="">
                        <p
                            className="text-4 font-gramatikaRegular text-justify"
                            dangerouslySetInnerHTML={{ __html: (game?.description_raw || "").replace(/\r?\n/g, "<br />") }}
                        />
                    </section>

                    {/*game details if mobile its 1 col if its not 2 col  */}
                    <section className="grid grid-rows-1 md:grid-cols-2 xl:grid-cols-3 ">
                        <div className="flex justify-end md:justify-end gap-3 md:text-2xl xl:order-3 md:order-2 sm:order-1 text-3xl ">
                            {/* ratings from users */}
                            <div className="flex-col">
                                <CircleButton onText="GOAT" classname="w-10 h-10">
                                    <Image
                                        fill
                                        className="object-center px-1"
                                        src={"/goat.svg"}
                                        alt="goat"
                                    />
                                </CircleButton>
                                <h4 className="text-center text-xl font-gramatikaBold text-4">{game?.ratings[0].count}</h4>
                            </div>
                            <div className="flex-col">
                                <CircleButton onText="Like" classname="w-10 h-10">
                                    <FaHeart color="#FF4D4D" />
                                </CircleButton>
                                <h4 className="text-center text-xl font-gramatikaBold text-4">{game?.ratings[1].count}</h4>
                            </div>
                            <div className="flex-col">
                                <CircleButton onText="Meh" classname="w-10 h-10">
                                    <FaMeh color="#B0BEC5" />
                                </CircleButton>
                                <h4 className="text-center text-xl font-gramatikaBold text-4">{game?.ratings[3].count}</h4>
                            </div>
                            <div className="flex-col">
                                <CircleButton onText="Dislike" classname="w-10 h-10">
                                    <FaThumbsDown color="#B22222" />
                                </CircleButton>
                                <h4 className="text-center text-xl font-gramatikaBold text-4">{game?.ratings[2].count}</h4>
                            </div>
                        </div>
                        <div className="sm:order-2 md:text-xl md:order-1 lg:order-1">
                            a
                        </div>
                        <div className="sm:order-3 md:text-xl md:order-3 lg:order-2">
                            b
                        </div>
                    </section>

                </div>

            </section>
        )
    }
}
