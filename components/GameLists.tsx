'use client'
import React, { useEffect, useState } from 'react'
import { FocusCards, GameData } from './ui/focus-cards';
import { fetchGames, searchGame } from '@/app/action';
import { useInView } from "react-intersection-observer";
import Image from 'next/image';
import SearchAndDropdown from './SearchAndDropdown';

let pageCount = 1;
const delay = 500;
let first = true;

export default function GameLists() {
    const [data, setData] = useState<GameData[]>([])
    const [searchData, setSearchData] = useState<GameData[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { ref, inView } = useInView();
    const [orderBy, setOrderBy] = useState<string>('Popular')
    const [isOrderPlus, setIsOrderPlus] = useState<boolean>(false);

    useEffect(() => {
        if (inView) {
            setIsLoading(true);
            const timeoutId = setTimeout(() => {
                fetchGames({ page: pageCount, orderBy: orderBy, isOrderPlus }).then((games) => {
                    console.log("Burasi ilk fetch yeri")
                    setData([...data, ...games])
                    pageCount++;
                });
                setIsLoading(false)
            }, delay);
            return () => clearTimeout(timeoutId);
        }


    }, [inView])


    useEffect(() => {
        if (searchData[0]) {
            setIsLoading(true);
            const timeoutId = setTimeout(() => {
                setData(searchData);
                console.log("Burasi search set yeri")
                setIsLoading(false)
            }, delay - 200);
            return () => clearTimeout(timeoutId);
        }

    }, [searchData])
    useEffect(() => {
        setIsLoading(true);
        const timeoutId = setTimeout(() => {
            fetchGames({ page: 1, orderBy: orderBy, isOrderPlus }).then((games) => {
                setData(games);  // Verileri doğrudan ayarlayın
                console.log("Burasi 2. fetch yeri");
                pageCount = 1;
            });
            setIsLoading(false);
        }, delay);

        // Temizleme işlemi
        return () => clearTimeout(timeoutId);
    }, [orderBy, isOrderPlus]); // Sadece orderBy ve isOrderPlus değişimlerine yanıt ver


    return (
        <div className='py-20'>
            <SearchAndDropdown orderBy={orderBy} setOrderBy={setOrderBy} isOrderPlus={isOrderPlus} setIsOrderPlus={setIsOrderPlus} setData={setSearchData} />
            <FocusCards cards={data} />
            <section className="flex justify-center items-center w-full text-3">
                <div ref={ref}>
                    {inView && isLoading && (
                        <Image
                            src="./spinner.svg"
                            alt="spinner"
                            width={56}
                            height={56}
                            className="object-contain"
                        />
                    )}
                </div>
            </section>
        </div>
    );
}
