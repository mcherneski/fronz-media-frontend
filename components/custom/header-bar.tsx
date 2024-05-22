'use client'
import { FaSquareTwitter } from "react-icons/fa6"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from "next/navigation"

export function HeaderBar() {
    const path = usePathname()

    return (
        <div 
            className="
                absolute flex flex-row justify-between items-center h-20 w-full mx-auto bg-black z-50
                sm:px-12
                xl:bg-transparent
            ">
           <div className='h-full pl-4 md:pl-0 flex flex-col items-center justify-center'>
                {path !== '/' ? <Link href='/' className='' ><Image src='/fronz-logo-lg_hd.png' alt='fronz logo' width={150} height={300} className="p-2" /></Link> : ''}
           </div>
           <div className='flex flex-row justify-between items-center'>
                <Link href='https://twitter.com/staceyfronz' className='m-2 px-2'><FaSquareTwitter className="w-[50px] h-[50px] text-fronzGold" /></Link>
                <Link href='https://warpcast.com/fronz' className='m-2 pl-2 pr-4 md:h-30px md:w-50px'><Image src='/warpcast.png' alt='warpcast icon' width={50} height={50} className="text-fronzGold" /></Link>
           </div>
        </div>
    )
}