'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSupabase } from '../providers'

export default function Validation () {
  const { supabase } = useSupabase()
  const query = useSearchParams().get('q')
  const [delivery, setDelivery] = useState<any>(null)

  useEffect(() => {
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
  }, [])

  return (
    <main>
      <h1>{JSON.stringify(delivery, null, 2)}</h1>
    </main>
  )
}
