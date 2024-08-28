'use client'
import { useEffect } from 'react'
import { useSupabase } from '@/app/providers'
import { useSearchParams, usePathname } from 'next/navigation'
import { useDataUser } from '@/store'

export function KitchenFetch ({ setKitchen }: any) {
  const { admin } = useDataUser()
  const { supabase } = useSupabase()
  const query = useSearchParams().get('q')
  const path = usePathname()

  useEffect(() => {
    if (!admin) {
      return
    }

    supabase
      .from('kitchens')
      .select('id, phone_number, chamber_of_commerce, health, bank_account, email')
      .eq('id', query)
      .then(({ error, data }) => {
        if (error) return
        setKitchen(data[0])
      })
  }, [admin, path])
  return null
}
