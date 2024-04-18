'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home () {
  const router = useRouter()
  const loginCode = useSearchParams().get('code')

  useEffect(() => {
    if (loginCode) {
      setTimeout(() => router.push('/'), 200)
    }
  }, [])

  return (
    <main>
      <p>protected route</p>
    </main>
  )
}
