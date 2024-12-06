import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    <div className='flex items-center justify-center w-full py-4 bg-black bg-opacity-60 gap-10 z-10'>
      <Image alt='Spotify' src={"/Social-icon/Spotify.svg"} width={75} height={120}></Image>
      <Image alt='Instagram' src={"/Social-icon/Instagram.svg"} width={75} height={120}></Image>
      <Image alt='X - Twitter' src={"/Social-icon/X.svg"} width={75} height={120}></Image>
      </div>
  )
}

export default Footer