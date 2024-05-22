import { PortfolioCard } from "@/components/custom/portfolio-card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"

interface PortfolioSectionProps {
    sectionData: {
        data: [
            {
                id: number
                Name: string
                client: string
                slug: string
                short_description: string
                featured: boolean
                details: any[]
                media: {
                    data: [
                        {
                            id: number
                            url: string
                            alternativeText: string
                        }
                    ]
                }
            }
        ]
    }
}

export function PortfolioSection({ sectionData }: Readonly<PortfolioSectionProps>) {
    const { data } = sectionData
    console.log('Portfolio Section Data: ', data)
    const featuredProjects = data.filter((p) => p.featured)
    console.log('Featured Projects after data filter: ', featuredProjects)
    
    return (
        <section id='portfolio' className='h-screen w-screen mx-auto flex flex-col items-center justify-center md:w-2/3 lg:mx-auto'>
            <div className='w-screen text-center flex flex-row items-start justify-center m-4'>
                <h1 className='text-fronzGold text-3xl md:text-5xl'>Featured Work</h1>
            </div>
            <div className='h-content w-screen justify-center flex-wrap my-4 mx-auto p-8'>
                <Carousel className='w-full h-content md:w-2/3' opts={{ align: 'center', loop: true }}>
                    <CarouselContent className=''>
                        {featuredProjects.map((p) => (
                            <CarouselItem key={p.id} className='basis-full md:basis-1/2'>
                                <PortfolioCard
                                    name={p.Name}
                                    client={p.client}
                                    // imageUrl={'https://informed-captain-64ef5bbe8f.media.strapiapp.com' + p.media.data[0].url}
                                    imageUrl={p.media.data[0].url}
                                    // imageUrl={'http://localhost:1337' + p.media.data[0].url}
                                    linkHref={`/portfolio/${p.slug}`}
                                    description={p.short_description}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            </div>
            <div className='text-center flex flex-row items-center justify-center my-32 z-20'>
                    <Link href='/portfolio'><h1 className='text-2xl text-center text-fronzGold hover:border-b-2 hover:border-fronzGold'>View Project Gallery</h1></Link>
                </div>
        </section>
    )
}