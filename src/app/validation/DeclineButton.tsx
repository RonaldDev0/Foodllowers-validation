'use client'
import { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'

export function DeclineButton () {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [input, setInput] = useState('')
  const [error, setError] = useState<null | string>(null)

  const handleChange = ({ target: { value } }: any) => {
    setError(null)
    setInput(value)
  }

  function onSubmit (onClose: Function) {
    if (input.length < 5) {
      setError('completa este campo')
      return
    }
    onClose()
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
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                <div className='w-full flex justify-center'>
                  Rechazar
                </div>
              </ModalHeader>
              <ModalBody>
                <p>Estas seguro de rechazar a este delivery?</p>
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
                    onPress={() => onSubmit(onClose)}
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
