'use client'
import Image from 'next/image'
import { Button, Card, CardHeader, CardBody } from '@nextui-org/react'
import { useSupabase } from '../providers'

export default function Login () {
  const { supabase } = useSupabase()

  const Login = async () => await supabase
    .auth
    .signInWithOAuth(
      {
        provider: 'google'
      }
    )

  return (
    <main className='h-screen flex flex-col justify-center items-center'>
      <Image
        src='/img/LogName.png'
        alt='Google'
        width='450'
        height='450'
        className='fixed
        [@media(max-width:800px)]:top-32
        [@media(min-width:800px)]:top-60'
      />
      <Card className='p-10 [@media(max-width:800px)]:p-2'>
        <CardHeader className='justify-center text-2xl'>
          Iniciar sesión
        </CardHeader>
        <CardBody className='justify-center items-center flex flex-col gap-6'>
          <Button
            onPress={Login}
            className='flex justify-center items-center gap-2 w-80 py-6 text-lg bg-zinc-950'
          >
            <Image
              src='/icons/google.svg'
              alt='Google'
              width='35'
              height='45'
            />
            <p>
              Continuar con Google
            </p>
          </Button>
        </CardBody>
      </Card>
    </main>
  )
}
