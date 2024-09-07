'use client'
import Link from 'next/link'
import { useDataUser } from '@/store'
import { Avatar, Card, CardHeader } from '@nextui-org/react'
import { Home, Settings } from 'lucide-react'

export function NavBarr () {
  const { user } = useDataUser()

  if (!user) {
    return null
  }

  return (
    <nav className='w-full flex justify-around items-center mb-5 mt-5'>
      <Card className='w-96'>
        <CardHeader className='flex justify-around'>
          <Link href='/'>
            <Home size={28} />
          </Link>
          <Link href='/settings'>
            <Settings size={28} />
          </Link>
          <Link href='/profile'>
            <Avatar
              size='md'
              src={user.user_metadata.avatar_url}
            />
          </Link>
        </CardHeader>
      </Card>
    </nav>
  )
}
