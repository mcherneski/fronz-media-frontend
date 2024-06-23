import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import Link from 'next/link'
  import Image from 'next/image'

  type PortfolioCardProps = {
    name: string
    client: string
    description: string
    imageUrl: string
    linkHref: string
  }

  export function PortfolioCard({ name, client, description, imageUrl, linkHref }: PortfolioCardProps) {
    return (
        <Card className='h-content w-3/4 mx-auto flex flex-col items-center justify-center bg-black text-fronzGold'>
            <CardHeader>
                <CardTitle className='text-center text-xl'>{name}</CardTitle>
                <CardDescription>{client}</CardDescription>
            </CardHeader>
            <CardContent className='w-full h-full flex flex-col items-center justify-center'>
                <Image src={imageUrl} alt={`Image for ${name}`} width={300} height={169} />
                <p className='w-full text-center  text-fronzBlue line-clamp-2'>{description}</p>
            </CardContent>
            <CardFooter>
                <Link href={linkHref}><p className="">Read More</p></Link>
            </CardFooter>
        </Card>
    )
  }