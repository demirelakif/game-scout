import { cn } from '@/lib/utils'
import React from 'react'
import { FocusCards } from './ui/focus-cards';

const GameLists = () => {
    const cards = [
        {
            title: "Forest Adventure",
            src: "https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg",
        },
        {
            title: "Valley of life",
            src: "https://media.rawg.io/media/screenshots/07f/07f7cf80741ff306e4eca982c3e64ac8.jpg",
        },
        {
            title: "Sala behta hi jayega",
            src: "https://media.rawg.io/media/screenshots/fef/fefd51ec13aa33acbd796ef79bcef7cb.jpg",
        },
        {
            title: "Camping is for pros",
            src: "https://media.rawg.io/media/screenshots/b78/b78ffd258d5793be704c380e572748bc.jpg",
        },
        {
            title: "The road not taken",
            src: "https://media.rawg.io/media/screenshots/17c/17c85ab9dfc4fda8e1e5ba72932ef2bf.jpg",
        },
        {
            title: "The First Rule",
            src: "https://media.rawg.io/media/screenshots/a12/a12ca99cc74c1e7eba7100b0891dd1e0.jpg",
        },
    ];

    return (
        <div className='pt-20'>
            <FocusCards cards={cards} />
        </div>
    );
}

export default GameLists