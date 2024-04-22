'use client'
import { Card, CardHeader, CardBody } from '@nextui-org/react'

export function TextSection ({ title, p, p2 = '' }: {title: string, p: string, p2?: string }) {
  return (
    <Card className='cursor-pointer'>
      <CardHeader>
        <p className='font-semibold'>
          {title}
        </p>
      </CardHeader>
      <CardBody>
        <p>{p}</p>
        <p>{p2}</p>
      </CardBody>
    </Card>
  )
}
