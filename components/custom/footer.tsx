// 'use client'
import { ContactButton } from '@/components/custom/contact-button'
// import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
// import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'

export function Footer() {
    // const router = useRouter()
    // const sections = ['', '#services', '#portfolio']
    // let i = 0

    return (
        <div className='fixed bottom-0 right-0 flex flex-row justify-end items-center h-20 w-screen bg-transparent'>
            {/* <div className='flex flex-row items-center justify-center'>

                <Button variant='link' size='lg' aria-label='next' onClick={() => {
                    i = (i + 1) % sections.length
                    const newRoute = sections[i]
                    router.push(newRoute)
                }}>
                    <MdOutlineKeyboardArrowDown className='text-fronzGold text-6xl hover:text-fronzBlue' />
                </Button>


                <Button variant='link' size='lg' aria-label='next' onClick={() => {
                    i = (i - 1 + sections.length) % sections.length
                    const newRoute = sections[i]
                    router.push(newRoute)
                }}>
                    <MdOutlineKeyboardArrowUp className='text-fronzGold text-6xl hover:text-fronzBlue' />
                </Button>

            </div> */}
            <div className='px-4 md:px-20'>
                <ContactButton />
            </div>
        </div>
    )
}