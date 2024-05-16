import qs from 'qs'
import { flattenAttributes } from '@/lib/utils'
import { HeroSection } from '@/components/custom/hero-section'
import { AboutSection } from '@/components/custom/about-section'
import { ServicesSection } from '@/components/custom/services-section'
import { ContactSection } from '@/components/custom/contact-section'
import { Footer } from '@/components/custom/footer'
import Image from 'next/image'

const homePageQuery = qs.stringify({
  populate: {
    logo: {
      fields: ['url', 'alternativeText']
    },
    Logo_Subtitle: {
      populate: true
    },
    blocks: {
      populate: {
        Hero_Image: {
          fields: ['url', 'alternativeText']
        },
        Hero_Header: {
          populate: true
        },
        Hero_Header_Scroll: {
          populate: true
        },
        About_Header: {
          populate: true
        },
        About_Content: {
          populate: true
        },
        Service: {
          populate: true
        }
      }
    },
  }
})

async function getStrapiData(path: string) {
  const baseUrl = 'https://informed-captain-64ef5bbe8f.strapiapp.com'
  const url = new URL(path, baseUrl)
  url.search = homePageQuery

  try {
    const response = await fetch(url.href, { cache: 'no-store'})
    const data = await response.json()
    const flattenedData = flattenAttributes(data)
  
    return flattenedData
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default async function Home() {

  const strapiData = await getStrapiData('/api/home-page')
  if (!strapiData) { return null }
  const { logo, Logo_Subtitle, blocks } = strapiData;

  return (
    <main>
      <div className='absolute top-0 left-0 flex flex-col z-20 h-[200px]'>
          <Image alt='Fronz Media Logo' width={405} height={89} src={logo.url} className='aspect-auto w-2/5 mt-4 ml-4 mb-2' />
        <p className='relative text-sm ml-16' style={{color: '#CA9E40'}}>{Logo_Subtitle}</p>
      </div>
      <HeroSection data={blocks[0]} />
      <AboutSection data={blocks[1]} />
      <ServicesSection data={blocks[2]} />
      <ContactSection data={blocks[3]} />
      <Footer />
    </main>
  )
}
