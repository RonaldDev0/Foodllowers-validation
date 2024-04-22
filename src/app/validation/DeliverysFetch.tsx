'use client'
import { useEffect } from 'react'
import { useSupabase } from '../providers'
import { useSearchParams } from 'next/navigation'

export function DeliveryFetch ({ setDelivery, delivery }: any) {
  const { supabase } = useSupabase()
  const query = useSearchParams().get('q')

  useEffect(() => {
    if (delivery) {
      return
    }

    supabase
      .from('deliverys')
      .select('identification_card, identification_card_front, identification_card_back, license, property_card, bank_account')
      .eq('id', query)
      .then(({ error, data }) => {
        if (error) {
          return
        }
        setDelivery(data[0])
      })
  }, [])
  return null
}
