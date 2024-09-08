'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
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

export function AceptButton ({ kitchen }: IProps) {
  const { supabase } = useSupabase()
  const router = useRouter()
  const { setStore } = useDataApp()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const onSubmit = () => {
    supabase
      .from('kitchens')
      .update({ register_step: 'finished', register_complete: true })
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
            accept: true,
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

            setStore('kitchenPending', data)
            router.push('/')
          })
      })
  }

  return (
    <>
      <Button
        color='secondary'
        className='w-96 font-bold text-lg'
        onPress={onOpen}
      >
        Aceptar
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
                  Aceptar
                </div>
              </ModalHeader>
              <ModalBody>
                <p>Estas seguro de aceptar a esta cocina?</p>
              </ModalBody>
              <ModalFooter>
                <div className='flex flex-col w-full'>
                  <Button
                    color='secondary'
                    className='font-semibold'
                    onPress={onSubmit}
                  >
                    Aceptar
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
