'use client'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import Image from 'next/image'

export default function PaymentsPage () {
  const [img, setImg] = useState<string | null>(null)

  const handlePay = () => {
    fetch('/api/pay_colaborators')
      .then(res => res.blob())
      .then(blob => {
        if (blob.size === 0) return
        setImg(URL.createObjectURL(blob))
      })
  }

  return (
    <main className='w-full flex flex-col items-center gap-5'>
      <Button
        color='secondary'
        onClick={handlePay}
        className='w-96 text-lg'
      >
        Pay
      </Button>
      {img && (
        <Image
          src={img}
          alt='screenshot'
          width={800}
          height={600}
          className='w-full'
        />
      )}
    </main>
  )
}
