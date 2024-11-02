import GameLists from "@/components/GameLists";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="flex justify-center px-2 md:justify-end md:pr-2">
        <SearchBar />
      </div>
      <GameLists />
    </div>
  );
}
