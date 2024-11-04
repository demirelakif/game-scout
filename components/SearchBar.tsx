'use client'
import React from 'react'
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input'

function SearchBar() {
    const placeholders = [
        "GTA 5",
        "Mafia 3",
        "FarCry 6",
        "The Witcher 3",
        "Hollow Knight",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };
    return (
        <div className='w-[80vw] md:w-[40vw] lg:-[30vw]'>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}

            />
        </div>
    )
}

export default SearchBar