
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer'
import qs from 'qs'
import { getStrapiData } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { RelatedProjects } from '@/components/custom/related-projects'
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'

async function getPostBySlug(slug: string) {
  const filterSlug = slug
  const query = qs.stringify({
    filters: {
      slug: {
        $eqi: filterSlug
      }
    },
    populate: {
      Name: { populate: true },
      client: { populate: true },
      slug: { populate: true },
      short_description: { populate: true },
      featured: { populate: true },
      details: { populate: true },
      media: { fields: ['url', 'alternativeText'] },
      videoGallery: {
        fields: ['video', 'videoTitle']
      },
      tags: {
        populate:
        {
          case_studies: {
            populate: {
              Name: { populate: true },
              client: { populate: true },
              slug: { populate: true },
              tags: { populate: true },
              media: { fields: ['url', 'alternativeText'] }
            }
          }
        }
      }
    },

  })

  const strapiData = await getStrapiData('/api/case-studies', query)
  if (!strapiData) return null
  return strapiData
}

export default async function ProjectDetails({ params }: { params: { slug: string } }) {
  
  const projectData = await getPostBySlug(params.slug)

  if (!projectData || !projectData.data || projectData.data.length === 0) return null

  let allCaseStudies: any[] = []
  let relatedCaseStudies: any[] = []

  if (projectData.data[0].tags && projectData.data[0].tags.data.length) {
    projectData.data[0].tags.data.forEach((tag: any) => {
      tag.case_studies.data.forEach((cs: any) => {
        allCaseStudies.push(cs)
      })
    })
    const filteredCaseStudies = allCaseStudies.filter((cs: any) => cs.id !== projectData.data[0].id)
    relatedCaseStudies = Array.from(new Map(filteredCaseStudies.map((cs: any) => [cs.id, cs])).values())
  }
  

  const { Name, client, details, media } = projectData.data[0]
  const content: BlocksContent = details
  const imageServerPrefix = 'https://informed-captain-64ef5bbe8f.media.strapiapp.com'
  const mediaUrl = media.data && media.data.length > 0 ? imageServerPrefix + media.data[0].url : '';
  const mediaAltText = media.data && media.data.length > 0 ? media.data[0].alternativeText : '';
  // const imageServerPrefix = 'http://localhost:1337'

  return (
    <main className='flex flex-col items-center h-content w-screen my-32'>
      <div className='relative t-0 flex flex-col w-full h-[350px] sm:h-[600px] sm:w-3/4 '>
      {mediaUrl && (
        <Image
          src={media.data[0].url} alt={media.data[0].alternativeText} width={1280} height={1000}
          // src={imageServerPrefix + media.data[0].url} alt={media.data[0].alternativeText} width={1280} height={1000}
          // src={media.data[0].url} alt={media.data[0].alternativeText} width={1000} height={1000} 
          className='px-8 pb-4 object-cover object-center w-full overflow-hidden'
        />
      )}

      </div>
      <Card className='w-3/4 bg-transparent border-transparent text-white'>
        <CardHeader>
          <CardTitle className='text-fronzGold text-5xl'>{Name}</CardTitle>
          <CardDescription className='text-fronzBlue text-2xl'>{client}</CardDescription>
        </CardHeader>
          <div className='p-8'>
          <BlocksRenderer content={content} />
          </div>
      </Card>
      <div className='h-content w-screen xl:w-3/4 items-center justify-center py-8 mb-4 mx-auto'>
        {
          projectData.data[0].videoGallery.length > 0 && (
            <>
              <h3 className='text-fronzGold text-3xl text-center my-2'>Video Gallery</h3>
              <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                {
                  projectData.data[0].videoGallery.map((v: any) => (
                    <iframe
                      src={`https://player.vimeo.com/video/${v.video.providerUid}`}
                      title={v.video.videoTitle}
                      width='500'
                      height='300'
                      allowFullScreen
                      className='p-2'
                      key={v.video.providerUid}
                    />
                  ))
                }
              </div>
            </>
          )
        }
        {media.data.length > 0 && (
          <>
            <h3 className='text-fronzGold text-3xl text-center my-2'>Image Gallery</h3>
            <div className='flex flex-row flex-wrap items-center justify-center w-full'>
              {
                // TODO: Add an onClicked() function to open a modal with the image in full view
                media.data.map((m: any) => (
                  <Image
                    key={m.id}
                    src={imageServerPrefix + m.url}
                    alt={m.alternativeText}
                    width={500}
                    height={300}
                    // src={m.url} alt={m.alternativeText} width={300} height={300}
                    className='p-2 hover:scale-150 transition-transform duration-500 ease-in-out'
                  />
                ))
              }
            </div>
          </>
        )}

      </div>

      <div className='w-full'>
        <RelatedProjects data={relatedCaseStudies} />
      </div>

    </main>
  )
}