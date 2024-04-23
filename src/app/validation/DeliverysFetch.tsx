'use client'
import { useEffect } from 'react'
import { useSupabase } from '../providers'
import { useSearchParams, usePathname } from 'next/navigation'
import { useDataUser } from '@/store'

export function DeliveryFetch ({ setDelivery }: any) {
  const { admin } = useDataUser()
  const { supabase } = useSupabase()
  const query = useSearchParams().get('q')
  const path = usePathname()

  useEffect(() => {
    if (!admin) {
      return
    }

    supabase
      .from('deliverys')
      .select('id, identification_card, identification_card_front, identification_card_back, license, property_card, bank_account, name, email')
      .eq('id', query)
      .then(({ error, data }) => {
        if (error) {
          return
        }
        setDelivery(data[0])
      })
  }, [admin, path])
  return null
}
