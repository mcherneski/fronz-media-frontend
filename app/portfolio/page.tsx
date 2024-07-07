
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
    
    projects.data.forEach((project: any) => {
        console.log('Project Data: ', project)
        console.log('Project Media: ', project.media.data)
    })

    return (
        <>
            <main className='h-content w-screen flex flex-col items-center justify-center flex-nowrap mb-32 mt-[150px]'>
                <div className='w-full h-1/4 flex flex-row items-start justify-center mt-20'>
                    <h1 className='w-screen text-fronzGold text-6xl text-center my-8'>Project Gallery</h1>
                </div>
                <div className='flex h-full w-3/4 flex-row items-center justify-center flex-wrap '>
                    {
                        projects.data.map((project: any) => (
                            <Card key={project.Name} className='w-full h-[500px] sm:w-1/3 m-4 bg-transparent text-fronzGold overflow-hidden'>
                                <CardHeader>
                                    <CardTitle className='text-center text-lg'>{project.Name}</CardTitle>
                                    <CardDescription className='text-fronzBlue text-center text-md'>{project.client}</CardDescription>
                                </CardHeader>
                                <CardContent className='w-full flex flex-col justify-center items-center'>
                                    <div className='w-full h-[200px] max-h-[500px] flex justify-center items-center overflow-hidden'>
                                        {project.media.data && project.media.data.length > 0 && (
                                            <Image
                                                // Make SRC just project.media.data[0].url in production 
                                                // src={'http://localhost:1337' + project.media.data[0].url}
                                                src={project.media.data[0].url}
                                                alt={project.media.data[0].alternativeText}
                                                width={300} height={300}
                                                objectFit='cover'
                                                objectPosition='top'
                                                className='box-shadow-2xl m-2 overflow-hidden'
                                            />
                                        )}

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
            <div className='w-full h-[50px]' />
        </>
    )
}
