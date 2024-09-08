'use client'
import { useState, Suspense } from 'react'
import { InfluencerFetch } from './InfluencerFetch'
import { TextSection } from '../TextSection'
import { DeclineButton } from './DeclineButton'
import { AceptButton } from './AceptButton'

export default function Influencer () {
  const [influencer, setInfluencer] = useState<any>(null)

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <InfluencerFetch
          setInfluencer={setInfluencer}
        />
      </Suspense>
      {influencer && (
        <main className='h-full flex flex-col gap-24 justify-center items-center'>
          <div className='grid grid-cols-3 gap-4'>
            <TextSection
              title='Nombre'
              p={influencer.full_name}
            />
            <TextSection
              title='Email'
              p={influencer.email}
            />
            <TextSection
              title='Social networks'
              p=''
              objectSocialNetworks={influencer.social_networks}
            />
            <TextSection
              title='Cuenta bancaria'
              p=''
              object={influencer.bank_account}
            />
          </div>
          <div className='flex w-full justify-around'>
            <DeclineButton influencer={influencer} />
            <AceptButton influencer={influencer} />
          </div>
        </main>
      )}
    </>
  )
}
