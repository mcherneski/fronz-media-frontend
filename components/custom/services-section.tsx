import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
 

interface ServicesSectionProps {
    data: {
        id: number
        __component: string
        Services_Header: string
        Service: any[]
    }
}

export function ServicesSection({data}: Readonly<ServicesSectionProps>){
    const {Services_Header, Service} = data
    // Service.forEach((service) => {console.log(service)})
    return (
        <div className="w-3/4 m-auto mt-10">
            <h1 className="text-3xl font-thin mb-6" style={{color: '#CA9E40'}}>{Services_Header}</h1>
            <Accordion type='single' collapsible>
            {Service.map((service) => (
                <AccordionItem id='color-accordion' key={service.Service_Name} className='border-black' value={service.Service_Name}>
                    <AccordionTrigger  className='ml-4 text-lg font-light'>{service.Service_Name}</AccordionTrigger>
                    <AccordionContent>
                        <p className="px-6">{service.Service_Description}</p>
                    </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </div>
    )
}