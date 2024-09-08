'use client'
import { useState, Suspense } from 'react'
import { DeliveryFetch } from './DeliveryFetch'
import { ImgSection } from '../ImgSection'
import { TextSection } from '../TextSection'
import { DeclineButton } from './DeclineButton'
import { AceptButton } from './AceptButton'

export default function Delivery () {
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
              bucket='deliverys'
            />
            <TextSection
              title='Número de cedula de documento'
              p={delivery.identification_card}
            />
            <ImgSection
              title='Cedula: frente'
              img={delivery.identification_card_front}
              bucket='deliverys'
            />
            <ImgSection
              title='Cedula: atras'
              img={delivery.identification_card_back}
              bucket='deliverys'
            />
            <ImgSection
              title='Licencia de conducir'
              img={delivery.license}
              bucket='deliverys'
            />
            <ImgSection
              title='Foto de la placa del vehículo'
              img={delivery.license_plate_photo}
              bucket='deliverys'
            />
            <ImgSection
              title='Targeta de propiedad'
              img={delivery.property_card}
              bucket='deliverys'
            />
            <ImgSection
              title='Foto del bolso del delivery'
              img={delivery.bag_picture}
              bucket='deliverys'
            />
            <TextSection
              title='Cuenta bancaria'
              p=''
              object={delivery.bank_account}
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
