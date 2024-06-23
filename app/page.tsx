// 'use client'
import qs from 'qs'
import { flattenAttributes } from '@/lib/utils'
import { LandingSection } from '@/components/sections/landing-section'
import { ServicesSection } from '@/components/sections/services-section'
import { PortfolioSection } from '@/components/sections/portfolio-section'

const featuredQuery = qs.stringify({
  
    filters: {
      featured: {
        $eq: true,
      },
    },
    populate: {
      Name: {populate: true},
      slug: {populate: true},
      featured: {populate: true},
      media: {fields: ['url', 'alternativeText']},
    },
  
})

async function getStrapiData(path: string) {
  const baseUrl = 'https://informed-captain-64ef5bbe8f.strapiapp.com'
  // const baseUrl = 'http://localhost:1337'
  const url = new URL(path, baseUrl)
  url.search = featuredQuery

  try {
    const response = await fetch(url.href)
    const data = await response.json()
    const flattenedData = flattenAttributes(data)
    
    return flattenedData
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default async function Home() {
  const strapiData = await getStrapiData('/api/case-studies')
  if (!strapiData) { return null }
  

  return (
      <main className='w-screen flex flex-col'>
        <LandingSection/>
        <ServicesSection />
        <PortfolioSection sectionData={strapiData}/>
      </main>
  )
}
