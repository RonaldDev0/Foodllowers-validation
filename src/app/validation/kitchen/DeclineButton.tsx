'use client'
import { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'
import { useSupabase } from '@/app/providers'
import { useRouter } from 'next/navigation'
import { useDataApp } from '@/store'

interface IProps {
  kitchen: {
    id: string
    name: string
    email: string
  }
}

export function DeclineButton ({ kitchen }: IProps) {
  const { supabase } = useSupabase()
  const router = useRouter()
  const { setStore } = useDataApp()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [input, setInput] = useState('')
  const [error, setError] = useState<null | string>(null)

  const handleChange = ({ target: { value } }: any) => {
    setError(null)
    setInput(value)
  }

  const onSubmit = () => {
    if (input.length < 5) {
      setError('completa este campo')
      return
    }

    supabase
      .from('kitchens')
      .update({ register_step: 'data_collection' })
      .eq('id', kitchen.id)
      .select('id')
      .then(({ error }) => {
        if (error) return

        fetch('/api/send_email', {
          cache: 'no-store',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: kitchen.email,
            accept: false,
            motivo: input,
            rol: 'kitchen'
          })
        })

        supabase
          .from('kitchens')
          .select('id, phone_number, chamber_of_commerce, health, bank_account, email')
          .eq('register_complete', false)
          .eq('register_step', 'data_validation')
          .then(({ error, data }) => {
            if (error) return
            setStore('deliveryPending', data)
            router.push('/')
          })
      })
  }

  return (
    <>
      <Button
        color='danger'
        variant='flat'
        className='w-96 font-bold text-lg'
        onPress={onOpen}
      >
        Rechazar
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                <div className='w-full flex justify-center'>
                  Rechazar
                </div>
              </ModalHeader>
              <ModalBody>
                <p>Estas seguro de rechazar a esta cocina?</p>
                <Input
                  label='Por que?'
                  value={input}
                  isInvalid={!!error}
                  errorMessage={error}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <div className='flex flex-col w-full'>
                  <Button
                    color='danger'
                    variant='flat'
                    className='font-semibold'
                    onPress={onSubmit}
                  >
                    Rechazar
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
