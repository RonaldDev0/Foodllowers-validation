import { Providers } from './providers'
import { NavBarr } from '@/components'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Foodllowers-validation',
  description: 'This is the validation for foodllowers workers'
}

export default function RootLayout ({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' className='dark'>
      <body className='h-screen flex flex-col items-center absolute top-0 z-[-2] w-screen dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
        <Providers>
          <NavBarr />
          {children}
        </Providers>
      </body>
    </html>
  )
}
