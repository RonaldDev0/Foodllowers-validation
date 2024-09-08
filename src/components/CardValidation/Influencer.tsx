'use client'
import { Card, CardBody } from '@nextui-org/react'
import Link from 'next/link'

export function InfluencerCardValidation ({ influencer }: { influencer: any }) {
  return (
    <Link href={`/validation/influencer?q=${influencer.id}`}>
      <Card className='w-96'>
        <CardBody>
          <div>
            <p>{influencer.full_name}</p>
            <p>{influencer.email}</p>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
