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
// export function ServicesSection({ data }: Readonly<ServicesSectionProps>) {
export function ServicesSection() {

    return (
        <section
            className='h-2/3 w-screen flex flex-grow flex-col items-center justify-start
            xl:w-2/3 xl:mx-auto xl:mt-24
            lg:flex-row lg:h-screen
            md:px-8 md:h-screen md:flex-row
            sm:flex-row
            '
            id='services'
        >
            <div className='
                h-full mb-8 ml-8 flex items-center 
                lg:justify-start lg:w-1/4 lg:h-full lg:pl-10
                md:w-1/4 md:justify-center
                '
            >
                <h1 className='
                    text-fronzGold text-4xl
                    lg:text-8xl
                    md:text-6xl'
                >WHAT WE DO</h1>
            </div>
            <div className='
                h-full flex items-center
                xl:pb-36
                lg:w-3/4 lg:justify-end lg:py-10 lg:pb-20
                md:w-full md:justify-center'
            >
                <Accordion type='single' collapsible
                    className='
                    mx-auto
                    lg:w-3/4 lg:mr-8
                    md:w-3/4 md:pl-8'
                >
                    <AccordionItem key='nd' className='border-fronzGray font-fronzGold text-fronzGold' value='Narrative Design'>
                        <AccordionTrigger className='ml-4 text-md md:text-xl font-light text-left'>Narrative Design</AccordionTrigger>
                        <AccordionContent className='bg-transparent text-white font-light text-md py-2'>
                            <p className='px-6 pb-4 leading-6'>We infuse your product features, vision, and community values into the broader cultural narrative, empowering investors, contributors and community members to visualize their role and impact.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem key='emt' className='border-fronzGray font-fronzGold text-fronzGold' value='Essential Media Toolkit'>
                        <AccordionTrigger className='ml-4 text-md md:text-xl font-light text-left'>Essential Media Toolkit</AccordionTrigger>
                        <AccordionContent className='bg-transparent text-white font-light text-md py-2'>
                            <p className='px-6 pb-4 leading-6'>
                                We create design and media assets to broadcast your narrative and values across diverse audiences and platforms.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem key='ce' className='border-fronzGray font-fronzGold text-fronzGold' value='Creative Engagement'>
                        <AccordionTrigger className='ml-4 text-md md:text-xl font-light text-left'>Creative Engagement</AccordionTrigger>
                        <AccordionContent className='bg-transparent text-white font-light text-md py-2'>
                            <p className='px-6 pb-4 leading-6'>
                                Our core offering, we work with clients to create keystone creative campaigns, including brand films, documentary series, and immersive event experiences, leveraging web3 tech in the rollout to amplify their impact and resonance.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem key='ujcp' className='border-fronzGray font-fronzGold text-fronzGold' value='User Journey and Contributor Personas'>
                        <AccordionTrigger className='ml-4 text-md md:text-xl font-light text-left'>User Journey and Contributor Personas</AccordionTrigger>
                        <AccordionContent className='bg-transparent text-white font-light text-md py-2'>
                            <p className='px-6 pb-4 leading-6'>
                                We dissect your user journey and contributor personas to grasp exactly who you are engaging with.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}


