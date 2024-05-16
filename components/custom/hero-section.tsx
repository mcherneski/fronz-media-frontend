'use client'
import {useState, useEffect} from 'react'

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

export function HeroSection({data}: Readonly<HeroSectionProps>) {
    const {Hero_Header, Hero_Image, Hero_Header_Scroll} = data
    const imageUrl = 'http://localhost:1337' + Hero_Image.url
    const [currentText, setCurrentText] = useState(Hero_Header_Scroll[0].Word)

    let i = 0
    useEffect(() => {
        const timer = setInterval(() => {
                setCurrentText(Hero_Header_Scroll[i % Hero_Header_Scroll.length].Word)
                i++
        }, 5000)

        return () => clearInterval(timer)
    },[Hero_Header_Scroll])

    return (
        <header className='relative h-[600px] overflow-hidden z-10 justify-center'>
            <img 
                alt="background"
                className='absolute inset-0 object-cover w-full h-full'
                height={1080}
                src={imageUrl}
                style={{
                    aspectRatio: '1920/1080',
                    objectFit: 'cover',
                    opacity: 0.3
                }}
                width={1920}
            />
            <div className="relative flex flex-col items-center justify-center h-full w-full mx-auto max-w-[1080px] min-w-[500px] text-center">
                <h1 className='text-2xl md:text-3xl lg:text-5xl mb-2 w-3/4' style={{color: '#CA9E40'}}>
                    {Hero_Header}
                </h1>
                <h1 key={currentText} className='animate-fade-in-up text-2xl md:text-3xl lg:text-5xl font-medium w-3/4' style={{color: '#CA9E40'}}>
                    {currentText}
                </h1>
            </div>
        </header>
    )
}