'use client'
import React, { useEffect, useState } from 'react'
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input'
import { GameData } from './ui/focus-cards';
import { searchGame } from '@/app/action';

let firstTime = 2;

function SearchBar({
    setData,
    orderBy,
    isOrderPlus
}:
    {
        setData: (value: GameData[]) => void;
        orderBy: string;
        isOrderPlus: boolean;

    }) {
    const placeholders = [
        "GTA 5",
        "Mafia 3",
        "FarCry 6",
        "The Witcher 3",
        "Hollow Knight",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);


    };

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (firstTime > 0 || orderBy=="Popular") {
            firstTime --;
            return;
        } // first rendera ayrılır
        searchGame({ name: searchText, isOrderPlus: isOrderPlus, orderBy: orderBy }).then((data_) => setData(data_));
    }, [orderBy, isOrderPlus])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get('search') as string;

        if (searchValue) {
            await searchGame({ name: searchValue, isOrderPlus: isOrderPlus, orderBy: orderBy }).then((data_) => setData(data_));
        }
    };
    return (
        <div className='w-[26vw] sm:w-fit'>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}

            />
        </div>
    )
}

export default SearchBar