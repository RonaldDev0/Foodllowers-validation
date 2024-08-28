'use client'
import { useState, useEffect } from 'react'
import { useSupabase } from '@/app/providers'
import { Card, CardHeader, CardBody } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export function ImgSection ({ img, title, bucket }: { img: string, title: string, bucket: string }) {
  const { supabase } = useSupabase()
  const [src, setSrc] = useState<null | string>(null)

  useEffect(() => {
    const { data: { publicUrl } } = supabase
      .storage
      .from(bucket)
      .getPublicUrl(img)
    setSrc(publicUrl)
  }, [])

  if (!src) {
    return null
  }

  return (
    <Link target='_blank' href={src}>
      <Card className='cursor-pointer'>
        <CardHeader>
          <p className='font-semibold'>
            {title}
          </p>
        </CardHeader>
        <CardBody className='p-0'>
          <Image
            width={420}
            height={270}
            alt='img'
            src={src}
          />
        </CardBody>
      </Card>
    </Link>
  )
}
