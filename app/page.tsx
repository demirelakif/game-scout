import GameLists from "@/components/GameLists";
import Hero from "@/components/Hero";
import SearchAndDropdown from "@/components/SearchAndDropdown";

export default function Home() {
  return (
    <div>
      <Hero />
      {/* <SearchAndDropdown /> */}
      <GameLists />
    </div>
  );
}
