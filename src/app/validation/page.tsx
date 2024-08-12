'use client'
import { useState, Suspense } from 'react'
import { DeliveryFetch } from './DeliverysFetch'
import { ImgSection } from './ImgSection'
import { TextSection } from './TextSection'
import { DeclineButton } from './DeclineButton'
import { AceptButton } from './AceptButton'

export default function Validation () {
  const [delivery, setDelivery] = useState<any>(null)

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <DeliveryFetch
          setDelivery={setDelivery}
        />
      </Suspense>
      {delivery && (
        <main className='h-full flex flex-col gap-24 justify-center items-center'>
          <div className='grid grid-cols-3 gap-4'>
            <ImgSection
              title='Foto del rostro'
              img={delivery.user_picture}
            />
            <TextSection
              title='Número de cedula de documento'
              p={delivery.identification_card}
            />
            <ImgSection
              title='Cedula: frente'
              img={delivery.identification_card_front}
            />
            <ImgSection
              title='Cedula: atras'
              img={delivery.identification_card_back}
            />
            <ImgSection
              title='Licencia de conducir'
              img={delivery.license}
            />
            <ImgSection
              title='Foto de la placa del vehículo'
              img={delivery.license_plate_photo}
            />
            <ImgSection
              title='Targeta de propiedad'
              img={delivery.property_card}
            />
            <ImgSection
              title='Foto del bolso del delivery'
              img={delivery.bag_picture}
            />
            <TextSection
              title='Cuenta bancaria'
              p={delivery.bank_account.bank}
              p2={delivery.bank_account.bankNumber}
            />
          </div>
          <div className='flex w-full justify-around'>
            <DeclineButton delivery={delivery} />
            <AceptButton delivery={delivery} />
          </div>
        </main>
      )}
    </>
  )
}
