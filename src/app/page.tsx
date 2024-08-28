'use client'
import { Suspense, useEffect } from 'react'
import { CodeAuthRedirection } from '@/components'
import { DeliveryCardValidation, KitchenCardValidation } from '@/components/CardValidation'
import { useDataApp } from '@/store'
import { useSupabase } from '@/app/providers'
import { Tabs, Tab } from '@nextui-org/react'

export default function Home () {
  const { supabase } = useSupabase()
  const { deliveryPending, kitchenPending, setStore } = useDataApp()

  useEffect(() => {
    if (!deliveryPending) {
      supabase
        .from('deliverys')
        .select('id, identification_card_front, name, email')
        .eq('register_complete', false)
        .eq('register_step', 'data_validation')
        .then(({ error, data }) => {
          if (error) return
          setStore('deliveryPending', data)
        })
    }

    if (!kitchenPending) {
      supabase
        .from('kitchens')
        .select('id, email')
        .eq('register_complete', false)
        .eq('register_step', 'data_validation')
        .then(({ error, data }) => {
          if (error) return
          setStore('kitchenPending', data)
        })
    }

    // if (!influencerPending) {
    //   supabase
    //     .from('influencers')
    //     .select('id, name, email')
    //     .eq('register_complete', false)
    //     .eq('register_step', 'data_validation')
    //     .then(({ error, data }) => {
    //       if (error) return
    //       setStore('influencerPending', data)
    //     })
    // }
  }, [])

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <CodeAuthRedirection />
      </Suspense>
      <main className='flex flex-col gap-6 w-96 items-center'>
        <Tabs aria-label='tabs' color='secondary' defaultSelectedKey='deliverys'>
          <Tab key='deliverys' title='Deliverys'>
            {deliveryPending?.map(delivery => (
              <DeliveryCardValidation
                key={delivery.id}
                delivery={delivery}
              />
            ))}
          </Tab>
          <Tab key='kitchens' title='Kitchens'>
            {kitchenPending?.map(kitchen => (
              <KitchenCardValidation
                key={kitchen.id}
                kitchen={kitchen}
              />
            ))}
          </Tab>
          <Tab key='influencers' title='Influencers'>
            <p>Influencers</p>
          </Tab>
        </Tabs>
      </main>
    </>
  )
}
