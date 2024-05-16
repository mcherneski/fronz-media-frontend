
import { FaSquareTwitter } from "react-icons/fa6"
import Image from 'next/image'
import Link from 'next/link'

export function Footer(){
    return (
        <div className="flex flex-row justify-end items-center h-10 w-full mt-8 mx-auto p-6 bg-fronzGold">
            <Link href='https://twitter.com/staceyfronz' className='m-2'><FaSquareTwitter className="w-[30px] h-[30px] color-fronzGray" /></Link>
            <Link href='https://warpcast.com/fronz' className='m-2'><Image src='/warpcast.png' alt='warpcast icon' width={28} height={28} className="color-fronzGray" /></Link>
        </div>
    )
}