'use client'
import { useState, Suspense } from 'react'
import { KitchenFetch } from './KitchenFetch'
import { ImgSection } from '../ImgSection'
import { TextSection } from '../TextSection'
import { DeclineButton } from './DeclineButton'
import { AceptButton } from './AceptButton'

export default function Kitchen () {
  const [kitchen, setKitchen] = useState<any>(null)

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <KitchenFetch
          setKitchen={setKitchen}
        />
      </Suspense>
      {kitchen && (
        <main className='h-full flex flex-col gap-24 justify-center items-center'>
          <div className='grid grid-cols-3 gap-4'>
            <TextSection
              title='Número de celular'
              p={kitchen.phone_number}
            />
            <ImgSection
              title='Camara de comercio'
              img={kitchen.chamber_of_commerce}
              bucket='kitchens'
            />
            <ImgSection
              title='Sanidad'
              img={kitchen.health}
              bucket='kitchens'
            />
            <TextSection
              title='Cuenta bancaria'
              p={kitchen.bank_account.bank}
              p2={kitchen.bank_account.bankNumber}
            />
            <TextSection
              title='Email'
              p={kitchen.email}
            />
          </div>
          <div className='flex w-full justify-around'>
            <DeclineButton kitchen={kitchen} />
            <AceptButton kitchen={kitchen} />
          </div>
        </main>
      )}
    </>
  )
}
