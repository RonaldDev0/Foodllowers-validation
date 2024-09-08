import { Accept, Decline } from '@/components/email-template'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST (req: Request) {
  const { nombre, userEmail, accept, motivo, rol } = await req.json()

  try {
    if (accept) {
      const data = await resend.emails.send({
        from: 'Foodllowers <onboarding@resend.dev>',
        to: [userEmail],
        subject: 'Resultado de la validación de registro con Foodllowers',
        react: Accept({ nombre, rol }),
        text: ''
      })

      return Response.json(data)
    }

    const data = await resend.emails.send({
      from: 'Foodllowers <onboarding@resend.dev>',
      to: [userEmail],
      subject: 'Resultado de la validación de registro con Foodllowers',
      react: Decline({ nombre, motivo, rol }),
      text: ''
    })

    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
