import { Accept, Decline } from '@/components/email-template'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST (req: Request) {
  const { nombre, userEmail, accept, motivo } = await req.json()

  try {
    if (accept) {
      const data = await resend.emails.send({
        from: 'Foodllowers-Deliverys <onboarding@resend.dev>',
        to: [userEmail],
        subject: 'Resultado de la validación de registro para Delivery',
        react: Accept({ nombre }),
        text: ''
      })

      return Response.json(data)
    }

    const data = await resend.emails.send({
      from: 'Foodllowers-Deliverys <onboarding@resend.dev>',
      to: [userEmail],
      subject: 'Resultado de la validación de registro para Delivery',
      react: Decline({ nombre, motivo }),
      text: ''
    })

    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
