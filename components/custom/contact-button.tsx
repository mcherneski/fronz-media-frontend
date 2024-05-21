'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TfiEmail } from "react-icons/tfi";
import { ContactCard } from '@/components/custom/contact-card';
export function ContactButton() {
    const [showForm, setShowForm] = useState(false)

    const closeForm = () => {
        setShowForm(false)
    }

    return (
        <>
            {showForm && <ContactCard closeForm={closeForm} />}
            <Button size='icon' onClick={() => setShowForm(true)} variant='ghost' className='text-fronzGold hover:bg-transparent hover:text-white' >
                <TfiEmail className='text-8xl xl:text-4xl'/>
            </Button>
        </>
    )
}