import {BlocksRenderer, type BlocksContent} from '@strapi/blocks-react-renderer'
interface AboutSectionProps {
    data: {
        id: number
        __component: string
        About_Header: string
        About_Content: any[]
    }
}

export function AboutSection({data}: Readonly<AboutSectionProps>) {
        
    const {About_Header, About_Content} = data
    const content: BlocksContent = About_Content

    return (
        <div className="flex flex-col w-full mt-10" style={{color: '#CA9E40'}}>
            <div className='w-3/4 m-auto'>
                <h1 className='text-2xl mb-4 text-3xl font-thin'>{About_Header}</h1>
                    <div className='ml-4'>
                        <BlocksRenderer content={content} />
                    </div>
                </div>
        </div>
    )
}