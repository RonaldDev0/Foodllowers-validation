'use client'
import Link from 'next/link'
import { Card, CardBody } from '@nextui-org/react'

export function KitchenCardValidation ({ kitchen }: { kitchen: any }) {
  return (
    <Link key={kitchen.id} href={`validation/kitchen?q=${kitchen.id}`}>
      <Card className='w-96'>
        <CardBody>
          <p>{kitchen.email}</p>
        </CardBody>
      </Card>
    </Link>
  )
}
