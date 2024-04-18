'use client'
import { useSupabase } from '../providers'
import { useEffect } from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { ShieldBan } from 'lucide-react'
import { useDataUser } from '@/store'
import { useRouter } from 'next/navigation'

export default function Error () {
  const { supabase } = useSupabase()
  const { admin, setStore } = useDataUser()
  const router = useRouter()

  const logout = () => {
    supabase.auth.signOut()
      .then(() => setStore('user', null))
  }

  useEffect(() => {
    if (admin) {
      router.push('/')
    }
  }, [admin])

  return (
    <main className='fixed z-50 w-full h-screen top-0 left-0 flex flex-col justify-center gap-20 items-center backdrop-blur-md'>
      <Card className='w-96'>
        <CardHeader>
          <div className='w-full flex flex-col gap-2 items-center justify-center mt-4'>
            <ShieldBan size={60} />
            <p className='font-semibold text-xl'>
              Error
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <div className='px-4 flex flex-col gap-5'>
            <p>Estimado usuario,</p>
            <p>Lamentamos informarte que el acceso a esta aplicación está restringido únicamente a los administradores. Como usuario general, no tienes los permisos necesarios para acceder a esta aplicación.</p>
            <p>Agradecemos tu comprensión y te pedimos disculpas por cualquier inconveniente que esto pueda causar. Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nosotros.</p>
            <p>Atentamente,</p>
            <p>El equipo de soporte</p>
          </div>
        </CardBody>
      </Card>
      <div className='w-96 flex justify-center'>
        <p className='text-purple-700 text-lg font-semibold cursor-pointer' onClick={logout}>
          Cerrar sesión
        </p>
      </div>
    </main>
  )
}
