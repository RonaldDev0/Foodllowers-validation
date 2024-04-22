'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSupabase } from '../providers'
import { useDataUser } from '@/store'

export default function Validation () {
  const { supabase } = useSupabase()
  const query = useSearchParams().get('q')
  const [delivery, setDelivery] = useState<any>(null)
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

  useEffect(() => {
    if (!admin) {
      return
    }

    supabase
      .from('deliverys')
      .select()
      .eq('id', query)
      .then(({ error, data }) => {
        if (error) {
          return
        }
        setDelivery(data[0])
      })
  }, [admin])

  return (
    <main>
      <h1>{JSON.stringify(delivery, null, 2)}</h1>
    </main>
  )
}
