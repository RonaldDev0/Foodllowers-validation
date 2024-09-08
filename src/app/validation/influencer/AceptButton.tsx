'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { useSupabase } from '@/app/providers'
import { useRouter } from 'next/navigation'
import { useDataApp } from '@/store'

interface IProps {
  influencer: {
    id: string
    full_name: string
    email: string
  }
}

export function AceptButton ({ influencer }: IProps) {
  const { supabase } = useSupabase()
  const router = useRouter()
  const { setStore } = useDataApp()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const onSubmit = () => {
    supabase
      .from('influencers')
      .update({ register_step: 'finished' })
      .eq('id', influencer.id)
      .select('id')
      .then(({ error }) => {
        if (error) return

        fetch('/api/send_email', {
          cache: 'no-store',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: influencer.full_name,
            userEmail: influencer.email,
            accept: true,
            rol: 'influencer'
          })
        })

        supabase
          .from('influencers')
          .select('id, bank_account, full_name, email, social_networks')
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
                <p>Estas seguro de aceptar a este influencer?</p>
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
