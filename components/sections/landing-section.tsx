'use client'
import {useState, useEffect} from 'react'
import Image from 'next/image'

interface ImageProps {
    id: number
    url: string
    alternativeText: string
}

interface ScrollProps {
    id: number
    Word: string
}

interface HeroSectionProps {
    data: {
        id: number
        __component: string
        Hero_Header: string
        Hero_Image: ImageProps
        Hero_Header_Scroll: ScrollProps[]
    }
}

// export function LandingSection({data}: Readonly<HeroSectionProps>) {
export function LandingSection() {
    // const {Hero_Header, Hero_Image, Hero_Header_Scroll} = data
    return (
        <section id='home' className='h-screen w-screen'>
            <div className='
                flex flex-col h-2/3 items-center justify-center px-10 mt-10
                xl:w-2/3 xl:mx-auto
                lg:h-screen lg:w-2/3 lg:mx-auto
                md:w-full md:h-screen md:m-2 md:px-24
                sm:w-full
            '
            id='logo-container'
            >
                <Image src={'/fronz-logo-lg_hd.png'} alt='Fronz Logo' width={1021} height={216} />
                
            </div>
            <h1 
                className='text-xl text-fronzGold text-center -mt-10
                md:text-6xl md:mt-10 md:mb-24
                '
            >an agency of creative alchemists</h1>
        </section>
    )
}