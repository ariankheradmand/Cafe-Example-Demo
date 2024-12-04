import Categories from "@/components/Categories";
import Items from "@/components/Items";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/Bg-grad.svg')] bg-repeat bg-cover bg-opacity-85">
      <div className="absolute inset-0 h-full -z-5 backdrop-blur-sm bg-black/30"></div>

      <Navbar />
      <Searchbar />
      <Categories />
      <Items />
    </div>
  );
}
