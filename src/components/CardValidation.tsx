'use client'
import { useSupabase } from '@/app/providers'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardBody } from '@nextui-org/react'
import Image from 'next/image'

export function CardValidation ({ delivery }: { delivery: any }) {
  const router = useRouter()
  const { supabase } = useSupabase()
  const [img, setImg] = useState<null | string>(null)

  useEffect(() => {
    const { data: { publicUrl } } = supabase
      .storage
      .from('deliverys')
      .getPublicUrl(delivery.identification_card_front)

    setImg(publicUrl + '?time=' + Date.now())
  }, [])

  if (!img) {
    return null
  }

  return (
    <Card className='cursor-pointer'>
      <CardBody
        onClick={() => router.push(`/validation?q=${delivery.id}`)}
        className='p-0'
      >
        <Image
          width={400}
          height={200}
          alt='img'
          src={img}
        />
      </CardBody>
    </Card>
  )
}
