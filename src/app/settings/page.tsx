import { ColorSchema } from './ColorSchema'

export interface ISetting {
  path: string
  icon: any
  title: string
}

export default function Settings () {
  return (
    <main className='flex flex-col gap-2'>
      <ColorSchema />
    </main>
  )
}
