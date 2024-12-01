import Image from "next/image";
import React from "react";

export default function Navbar() {
  return (
    <div
      className="
    flex
    items-center
    justify-center
    w-full
    h-20
    bg-accent
    "
    >
      <nav className="
      flex
      iteme-center
      justify-center
      w-11/12
      bg-accent 
      relative
      ">
        <Image className="
        absolute
        -top-5
        " alt={"Novo Logo"} width={180} height={180} src={"/Logo.png"} ></Image>
      </nav>
    </div>
  );
}
