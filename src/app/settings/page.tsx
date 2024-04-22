'use client'
import { useEffect } from 'react'
import { useDataUser } from '@/store'
import { useRouter } from 'next/navigation'
import { ColorSchema } from './ColorSchema'

export interface ISetting {
  path: string
  icon: any
  title: string
}

export default function Settings () {
  const { admin } = useDataUser()
  const router = useRouter()

  useEffect(() => {
    if (admin === null) {
      return
    }

    if (!admin) {
      router.push('/error')
    }
  }, [admin])

  return (
    <main className='flex flex-col gap-2'>
      <ColorSchema />
    </main>
  )
}
