import { cn } from '@/lib/utils'
import React from 'react'

const CircleButton = ({ classname, children, OnClick, onText }: { classname?: string, children: React.ReactNode, OnClick?: () => void, onText?: string }) => {
    return (


        <div onClick={OnClick} className={cn("h-7 w-7 sm:h-9 sm:w-9 rounded-full md:w-9 md:h-9 lg:h-10 lg:w-10 flex items-center justify-center hover:border hover:border-sky-300 bg-4 transform transition duration-200 hover:scale-150 hover:shadow-lg hover:bg-1 hover:text-white text-2 relative group", classname)}>

            {/* Hover durumunda görünen onText */}
            <div className={cn("absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200", onText ? "visible" : "hidden")}>
                {onText}
            </div>

            {children}
        </div>

    )
}

export default CircleButton