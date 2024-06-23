'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import type { RenderPhotoProps } from 'react-photo-album'

export default function NextJsImage({
    photo,
    imageProps: {alt, title, sizes, className, onClick},
    wrapperStyle
}: RenderPhotoProps) {

    return (
        <div style={{ ...wrapperStyle, position: 'relative' }}>
            <Image
                fill
                src={photo}
                placeholder={"blurDataUrl" in photo ? "blur" : undefined}
                {...{alt, title, sizes, className, onClick}}
            />
        </div>
    )

}

