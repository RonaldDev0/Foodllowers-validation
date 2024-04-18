'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function CodeAuthRedirection () {
  const router = useRouter()
  const loginCode = useSearchParams().get('code')

  useEffect(() => {
    if (loginCode) {
      setTimeout(() => router.push('/'), 200)
    }
  }, [])
  return null
}
