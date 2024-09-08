'use client'
import { Card, CardHeader, CardBody } from '@nextui-org/react'
import Link from 'next/link'

export function TextSection ({ title, p, p2, object, objectSocialNetworks }: {title: string, p?: string, p2?: string, object?: any, objectSocialNetworks?: any}) {
  const objectFormatted = object && Object.keys(object).map(key => `${key}: ${object[key]}`).join('\n')
  const formattedSocialNetworks = objectSocialNetworks && Object.keys(objectSocialNetworks).filter(key => objectSocialNetworks[key] !== null)

  return (
    <Card className={`${!objectSocialNetworks && 'cursor-pointer'}  max-w-[420px]`}>
      <CardHeader>
        <p className='font-semibold'>
          {title}
        </p>
      </CardHeader>
      <CardBody>
        {objectFormatted && <pre>{objectFormatted}</pre>}
        {objectSocialNetworks && formattedSocialNetworks.map((key: any) => (
          <Link
            key={key}
            href={objectSocialNetworks[key]}
            target='_blank'
            className='text-purple-600 hover:text-purple-500 transition-colors'
          >
            {key}
          </Link>
        ))}
        {p && <p>{p}</p>}
        {p2 && <p>{p2}</p>}
      </CardBody>
    </Card>
  )
}
