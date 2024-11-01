import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="flex justify-center px-2 md:justify-end md:pr-2">
        <SearchBar />
      </div>
    </div>
  );
}
