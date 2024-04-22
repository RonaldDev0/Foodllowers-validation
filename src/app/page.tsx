'use client'
import { Suspense, useEffect } from 'react'
import { CodeAuthRedirection, CardValidation } from '@/components'
import { useDataApp } from '@/store'
import { useSupabase } from '@/app/providers'

export default function Home () {
  const { supabase } = useSupabase()
  const { deliveryPending, setStore } = useDataApp()


  useEffect(() => {
    if (deliveryPending) {
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
  }, [])

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
