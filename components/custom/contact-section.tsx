'use client'
import { Button } from "../ui/button"
import { useState } from "react"
import { ContactForm } from "./contact-form"

interface ContactSectionProps {
    data: {
        id: number
        __component: string
        Contact_Header: string
        Contact_Copy: string
    }
}

export function ContactSection({data}: Readonly<ContactSectionProps>){
const {Contact_Header, Contact_Copy} = data
const [showForm, setShowForm] = useState(false)

const closeForm = () => {
    if (showForm){
        setShowForm(false)
    }
}

    return (
        <div className="w-3/4 flex flex-col m-auto pt-10" >
            <h1 className="text-3xl font-thin mt-4 mb-4" style={{color: '#CA9E40'}}>{Contact_Header}</h1>
            <p className="text-sm pb-10 px-4" style={{color: '#CA9E40'}}>{Contact_Copy}</p>
            {showForm && <ContactForm closeForm={closeForm} />}
            
            <Button className='m-auto' onClick={() => setShowForm(true)} style={{backgroundColor: '#4984A7', color: '#151414'}}>Contact Form</Button>
        </div>
    )
}