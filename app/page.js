import Items from "@/components/Items";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 -z-10 h-screen opacity-90">
        <Image
          className=""
          src="/BackGround-image.jpg" // Replace with your image path
          alt="Background"
          layout="fill" // Makes the image cover the entire div
          objectFit="cover" // Ensures the image covers the area without distortion
          quality={100} // Optional: Sets the image quality
          loading="lazy"
        />
      </div>
      <Navbar />
      <Searchbar />
      <Items />
    </div>
  );
}
