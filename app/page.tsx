// 'use client'
import qs from 'qs'
import { flattenAttributes } from '@/lib/utils'
import { LandingSection } from '@/components/sections/landing-section'
import { ServicesSection } from '@/components/sections/services-section'
import { PortfolioSection } from '@/components/sections/portfolio-section'

const projectsQuery = qs.stringify({
  populate: {
    Name: {populate: true},
    client: {populate: true},
    slug: {populate: true},
    short_description: {populate: true},
    featured: {populate: true},
    details: {populate: true},
    media: {fields: ['url', 'alternativeText']},
  },
  filter: {
    featured: {
      $eq: true
    }
  }
})

async function getStrapiData(path: string) {
  const baseUrl = 'https://informed-captain-64ef5bbe8f.strapiapp.com'
  // const baseUrl = 'http://localhost:1337'
  const url = new URL(path, baseUrl)
  url.search = projectsQuery

  try {
    const response = await fetch(url.href, {cache: "no-store"})
    const data = await response.json()
    const flattenedData = flattenAttributes(data)
    console.log('Flattened Data: ', flattenedData)
    return flattenedData
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default async function Home() {
  const strapiData = await getStrapiData('/api/case-studies')
  if (!strapiData) { return null }
  console.log(strapiData)
  
  return (
      <main className='w-screen flex flex-col'>
        <LandingSection/>
        <ServicesSection />
        <PortfolioSection sectionData={strapiData}/>
      </main>
  )
}
