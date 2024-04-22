'use client'
import { useSupabase } from '../providers'
import { useDataUser } from '@/store'
import { Button, Card, CardBody } from '@nextui-org/react'
import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Profile () {
  const { supabase } = useSupabase()
  const { user, admin, setStore } = useDataUser()
  const router = useRouter()

  const logout = () => {
    supabase.auth.signOut()
      .then(() => setStore('user', null))
  }

  useEffect(() => {
    if (admin === null) {
      return
    }

    if (!admin) {
      router.push('/error')
    }
  }, [admin])

  if (!user) {
    return null
  }

  return (
    <main>
      <Card>
        <CardBody className='p-4'>
          <div className='mb-6 grid place-content-center'>
            <Image
              src={user.user_metadata.avatar_url}
              width='200'
              height='0'
              alt='avatar'
              className='rounded-full border-4 border-blue-700 p-1'
              priority
            />
            <p className='mt-4'>@{user.user_metadata.full_name}</p>
            <p className='opacity-60'>{user.user_metadata.email}</p>
          </div>
          <Button
            onClick={logout}
            color='danger'
            variant='flat'
          >
            <LogOut />
            Logout
          </Button>
        </CardBody>
      </Card>
    </main>
  )
}
