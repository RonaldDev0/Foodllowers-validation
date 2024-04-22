'use client'
import { Suspense, useEffect } from 'react'
import { CodeAuthRedirection, CardValidation } from '@/components'
import { useDataApp, useDataUser } from '@/store'
import { useSupabase } from '@/app/providers'
import { useRouter } from 'next/navigation'

export default function Home () {
  const { supabase } = useSupabase()
  const { deliveryPending, setStore } = useDataApp()
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
    if (deliveryPending || !admin) {
      return
    }

    supabase
      .from('deliverys')
      .select('id, identification_card_front')
      .eq('register_complete', false)
      .eq('register_step', 'data_validation')
      .then(({ error, data }) => {
        if (error) {
          return
        }
        setStore('deliveryPending', data)
      })
  }, [admin])

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <CodeAuthRedirection />
      </Suspense>
      <main>
        {deliveryPending?.map(delivery => (
          <CardValidation
            key={delivery.id}
            delivery={delivery}
          />
        ))}
      </main>
    </>
  )
}
