'use client'
import { useEffect } from 'react'
import { useSupabase } from '@/app/providers'
import { useSearchParams, usePathname } from 'next/navigation'
import { useDataUser } from '@/store'

export function InfluencerFetch ({ setInfluencer }: { setInfluencer: any }) {
  const { admin } = useDataUser()
  const { supabase } = useSupabase()
  const query = useSearchParams().get('q')
  const path = usePathname()

  useEffect(() => {
    if (!admin) return

    supabase
      .from('influencers')
      .select('id, bank_account, full_name, email, social_networks')
      .eq('id', query)
      .then(({ error, data }) => {
        if (error) return
        setInfluencer(data[0])
      })
  }, [admin, path])
  return null
}
