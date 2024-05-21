import qs from 'qs'
import { getStrapiData } from '@/lib/utils'
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

const projectsQuery = qs.stringify({
    populate: {
        Name: { populate: true },
        client: { populate: true },
        slug: { populate: true },
        short_description: { populate: true },
        featured: { populate: true },
        details: { populate: true },
        media: { fields: ['url', 'alternativeText'] },
    }
})


export default async function PortfolioPage() {
    const projects = await getStrapiData('/api/case-studies', projectsQuery)
    
    console.log('Projects data: ', projects)
    return (
        <main className='h-screen w-screen flex flex-col items-center justify-center flex-nowrap'>
            <div className='w-full flex flex-row items-start justify-center mt-20'>
                <h1 className='w-screen text-fronzGold text-6xl text-center my-8'>Portfolio</h1>
            </div>
            <div className='flex h-3/4 w-3/4 flex-row items-center justify-center flex-wrap '>
                {
                    projects.data.map((project: any) => (
                        <Card key={project.Name} className='w-full h-[500px] sm:w-1/3 m-4 bg-transparent text-fronzGold overflow-hidden'>
                            <CardHeader>
                                <CardTitle className='text-center text-lg'>{project.Name}</CardTitle>
                                <CardDescription className='text-fronzBlue text-center text-md'>{project.client}</CardDescription>
                            </CardHeader>
                            <CardContent className='w-full flex flex-col justify-center items-center'>
                                <div className='w-full h-[200px] max-h-[500px] flex justify-center items-center overflow-hidden'>
                                    <Image 
                                        // src={'https://informed-captain-64ef5bbe8f.media.strapiapp.com' + project.media.data[0].url}
                                        src={'http://localhost:1337' + project.media.data[0].url}
                                        alt={project.media.data[0].alternativeText} 
                                        width={300} height={300}             
                                        objectFit='cover'
                                        objectPosition='top'
                                        className='box-shadow-2xl m-2 overflow-hidden'
                                    />
                                </div>
                                
                                <p className='w-3/4 pt-2 text-center line-clamp-3'>{project.short_description}</p>
                            </CardContent>
                            <CardFooter className='w-full flex flex-row justify-center items-center'>
                                <Link href={`/portfolio/${project.slug}`}><p className='text-center text-fronzBlue p-2 text-lg'>Read More</p></Link>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </main>
    )
}
