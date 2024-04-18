import { Suspense } from 'react'
import { CodeAuthRedirection } from '@/components'

export default function Home () {
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <CodeAuthRedirection />
      </Suspense>
      <p>protected route</p>
    </main>
  )
}
