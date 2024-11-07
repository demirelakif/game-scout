'use client'
import React, { useEffect, useState } from 'react'
import { FocusCards, GameData } from './ui/focus-cards';
import { fetchGames } from '@/app/action';
import { useInView } from "react-intersection-observer";
import Image from 'next/image';
import SearchAndDropdown from './SearchAndDropdown';

let pageCount = 1;
let delay = 500;
let first = true;

export default function GameLists() {
    const [data, setData] = useState<GameData[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { ref, inView } = useInView();
    const [orderBy, setOrderBy] = useState<string>('Popular')
    const [isOrderPlus, setIsOrderPlus] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const timeoutId = setTimeout(() => {
            fetchGames({ page: pageCount, orderBy: orderBy, isOrderPlus }).then((games) => {
                setData([...data, ...games])
                pageCount++;
            });
            setIsLoading(false)
        }, delay);


    }, [inView])
    useEffect(() => {
        if (first) {
            first = false;
            return;
        }
        setIsLoading(true);
        const timeoutId = setTimeout(() => {
            fetchGames({ page: pageCount, orderBy: orderBy, isOrderPlus }).then((games) => {
                setData([games])
                pageCount = 1;
            });
            setIsLoading(false)
        }, delay);

    }, [orderBy, isOrderPlus])

    return (
        <div className='py-20'>
            <SearchAndDropdown orderBy={orderBy} setOrderBy={setOrderBy} isOrderPlus={isOrderPlus} setIsOrderPlus={setIsOrderPlus} />
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
