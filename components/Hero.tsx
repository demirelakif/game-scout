import React from 'react'
import { cn } from '@/lib/utils'
import { BackgroundBeamsWithCollision } from './ui/background-beams-with-collision'
import Image from 'next/image'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <BackgroundBeamsWithCollision className='max-h-[20vh]'>
      <div className='flex items-center'>
        <h2 className="text-4xl pr-2 md:pr-4 relative z-20 md:text-6xl font-bold text-center text-4 dark:text-white font-gramatikaBlack tracking-tight">
          Game{" "}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-4 via-teal-200 to-3[text-shadow:0_0_rgba(0,0,0,0.1)] ">
              <span className="">Scout</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-4 via-teal-200 to-3 py-4">
              <span className="">Scout</span>
            </div>
          </div>
        </h2>
          <Image 
           alt={"/binoculars.svg"}
           src={"/binoculars.svg"}
           width={"0"}
           height={"0"}
           className="w-11 h-11 md:w-20 md:h-20"
          />
      </div>
    </BackgroundBeamsWithCollision>
  )
}

export default Hero