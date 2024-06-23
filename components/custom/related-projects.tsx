import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'



export async function RelatedProjects({ data }: { data: any }) {

    // console.log('Related Projects: ', related)
    return (
        <>
            <h3 className='text-fronzGold text-3xl text-center my-2'>Related Projects</h3>
            <div className='w-full h-1/4 flex flex-row flex-wrap items-start justify-center mt-20'>
            
                {
                    data.map((project: any) => (
                        <Card key={project.id} className='bg-transparent m-4 text-white hover:text-fronzGold hover:border-fronzBlue '>
                            <Link href={`/portfolio/${project.slug}`}>
                            <CardHeader>
                                <Image
                                    src={project.media.data[0].url}
                                    alt={project.media.data[0].alternativeText}
                                    width={350}
                                    height={300}
                                    className='box-shadow-2xl m-2 overflow-hidden'
                                />
                            </CardHeader>
                            <CardContent className='text-center hover:text-fronzGold'>
                                <CardTitle className='text-lg hover:text-xl'>
                                        {project.Name}
                                </CardTitle>
                                <CardDescription className='text-center text-white  '>
                                    {project.client}
                                </CardDescription>
                            </CardContent>
                            </Link>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}



