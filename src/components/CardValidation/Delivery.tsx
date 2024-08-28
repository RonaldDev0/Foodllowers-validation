'use client'
import { useSupabase } from '@/app/providers'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export function DeliveryCardValidation ({ delivery }: { delivery: any }) {
  const { supabase } = useSupabase()
  const [img, setImg] = useState<null | string>(null)

  useEffect(() => {
    const { data: { publicUrl } } = supabase
      .storage
      .from('deliverys')
      .getPublicUrl(delivery.identification_card_front)

    setImg(publicUrl)
  }, [])

  if (!img) {
    return null
  }

  return (
    <Link href={`/validation/delivery?q=${delivery.id}`}>
      <Card className='w-96'>
        <CardHeader>
          <div>
            <p>{delivery.name}</p>
            <p>{delivery.email}</p>
          </div>
        </CardHeader>
        <CardBody className='p-0'>
          <Image
            width={400}
            height={200}
            alt='img'
            src={img}
          />
        </CardBody>
      </Card>
    </Link>
  )
}
