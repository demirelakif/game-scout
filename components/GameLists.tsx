import { cn } from '@/lib/utils'
import React from 'react'
import { FocusCards } from './ui/focus-cards';
import { fetchGames } from '@/app/action';

async function GameLists() {
    const data = await fetchGames();

    return (
        <div className='pt-20 overflow-hidden'>
            <FocusCards cards={data} />
        </div>
    );
}

export default GameLists