import { FC } from 'react'

interface EmailTemplateProps {
  nombre: string
}

export const Accept: FC<Readonly<EmailTemplateProps>> = ({
  nombre
}) => (
  <div>
    <h1>Estimado/a, {nombre}</h1>
    <p>Nos comunicamos contigo para informarte el resultado de la validación de tus datos para trabajar como delivery en Foodllowers-deliverys.</p>
    <p>Tu registro ha sido aprobado</p>
    <p>¡Felicitaciones! Tus datos han sido validados y ya puedes comenzar a trabajar como delivery en Foodllowers-deliverys.</p>
    <p>Ya puedes iniciar sesión en la app con tu usuario y contraseña.</p>
    <p>Agradecemos tu interés en trabajar con nosotros.</p>
    <p>Atentamente,</p>
    <p>El equipo de Foodllowers</p>
  </div>
)
