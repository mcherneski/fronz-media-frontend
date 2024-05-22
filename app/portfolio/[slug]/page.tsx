'use client'
import {BlocksRenderer, type BlocksContent} from '@strapi/blocks-react-renderer'
import qs from 'qs'
import { getStrapiData } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowBack } from "react-icons/io";

async function getPostBySlug(slug: string) {
    const filterSlug = slug
    console.log('Filter Slug: ', filterSlug)
    const query = qs.stringify({
        populate: {
          Name: {populate: true},
          client: {populate: true},
          slug: {populate: true},
          short_description: {populate: true},
          featured: {populate: true},
          details: {populate: true},
          media: {fields: ['url', 'alternativeText']},
        },
        filters: {
          slug: {
            $eqi: filterSlug
          }
        }
      })

    const strapiData = await getStrapiData('/api/case-studies', query)
    if (!strapiData) return null
    return strapiData
}

export default async function ProjectDetails({ params }: { params: { slug: string }} ) {
    const projectData = await getPostBySlug(params.slug)
    if (!projectData) return null

    const {Name, client, details, media} = projectData.data[0]
    const content: BlocksContent = details
    const imageServerPrefix = 'https://informed-captain-64ef5bbe8f.media.strapiapp.com'
    // const imageServerPrefix = 'http://localhost:1337'

    return (
        <div className='flex flex-col h-screen w-screen my-32'>
          <div className='absolute top-0 left-0 h-20'>
            <Link href='/portfolio'><IoIosArrowBack /></Link>
          </div>
            <div className='relative t-0 flex flex-col w-screen text-center'>
              <h1 className="text-fronzGold text-5xl">{Name}</h1>
              <h3 className='text-fronzBlue text-xl'>{client}</h3>
              <div className='w-full m-auto md:w-2/3'>
                <Image 
                  // src={imageServerPrefix + media.data[0].url} alt={media.data[0].alternativeText} width={1000} height={1000}
                  src={media.data[0].url} alt={media.data[0].alternativeText} width={1000} height={1000} 
                  className='px-8 py-8 m-auto'
                />
              </div>
            </div>
            <div className='relative flex flex-col h-content w-full m-auto items-center justify-center text-white text-sm px-8 md:w-2/3'>
              <BlocksRenderer content={content} />
            </div>
            <div className='h-content w-screen xl:w-3/4 items-center justify-center py-8 mb-4 mx-auto'>
              <h3 className='text-fronzGold text-3xl text-center'>Gallery</h3>
              <div className='flex flex-row flex-wrap items-center justify-center w-full'>
              {
                media.data.map((m: any) => (
                  <Image
                    key={m.id}
                    // src={imageServerPrefix + m.url} alt={m.alternativeText} width={300} height={300}
                    src={m.url} alt={m.alternativeText} width={300} height={300}
                    className='p-2'
                  />
                ))
              }
              </div>
            </div>
        </div>
    )
}