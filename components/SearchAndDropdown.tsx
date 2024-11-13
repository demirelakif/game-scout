import React from 'react'
import SearchBar from "@/components/SearchBar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import CircleButton from './CircleButton';
import { FaAngleDown, FaAngleUp, FaFilter } from 'react-icons/fa6';
import { GameData } from './ui/focus-cards';
import { FaDownload, FaXbox } from 'react-icons/fa';
import { useRouter } from 'next/navigation';



const SearchAndDropdown = ({
    setOrderBy,
    isOrderPlus,
    setIsOrderPlus,
    orderBy,
    setData,
}
    :
    {
        setOrderBy: (value: string) => void;
        orderBy: string;
        isOrderPlus: boolean;
        setIsOrderPlus: (value: boolean) => void;
        setData: (value: GameData[]) => void;
    }) => {
        const router = useRouter()

        const handleClick = () => {
            router.push("/gamepass")
          }
    return (
        <section className="flex justify-evenly sm:justify-between sm:px-14 md:px-10 lg:px-16 xl:px-32 pt-1 pb-9">
            <div className='flex gap-2 items-center'>
                <DropdownMenu>
                    <DropdownMenuTrigger className="bg-4 rounded-3xl px-4 py-2 text-xs sm:px-8 text-start font-gramatikaRegular text-2 md:text-lg sm:text-sm text-nowrap hover:border hover:border-sky-300  transform transition duration-200 hover:scale-110 hover:shadow-lg hover:bg-1 hover:text-white">
                        <section className='flex'>
                            Order By:
                            <h1>
                                {orderBy}
                            </h1>
                        </section>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={orderBy} onValueChange={setOrderBy}>
                            <DropdownMenuRadioItem value="Metacritic">
                                Metacritic
                            </DropdownMenuRadioItem>

                            <DropdownMenuRadioItem value="Rating">
                                Rating
                            </DropdownMenuRadioItem>

                            <DropdownMenuRadioItem value="Name">
                                Name
                            </DropdownMenuRadioItem>

                            <DropdownMenuRadioItem value={"Popular"}>
                                Popular
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Released">
                                Released date
                            </DropdownMenuRadioItem>

                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <CircleButton onText='Order' classname='hover:scale-110 cursor-pointer' OnClick={() => { setIsOrderPlus(!isOrderPlus) }}>
                    {isOrderPlus ? <FaAngleUp /> : <FaAngleDown />}
                </CircleButton>
                <CircleButton onText='How To Get' classname='hover:scale-110 cursor-pointer' OnClick={() => { router.push('/how-to-get')}}>
                    {isOrderPlus ? <FaDownload color='gray'/> : <FaDownload color='#107C10'/>}
                </CircleButton>
            </div>
            <SearchBar orderBy={orderBy} isOrderPlus={isOrderPlus} setData={setData} />
        </section>
    )
}

export default SearchAndDropdown