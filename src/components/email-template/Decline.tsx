import { FC } from 'react'

interface EmailTemplateProps {
  nombre: string,
  motivo: string
}

export const Decline: FC<Readonly<EmailTemplateProps>> = ({
  nombre,
  motivo
}) => (
  <div>
    <h1>Estimado/a, {nombre}</h1>
    <p>Nos comunicamos contigo para informarte el resultado de la validación de tus datos para trabajar como delivery en Foodllowers-deliverys.</p>
    <p>Tu registro ha sido rechazado</p>
    <p>Lamentamos informarte que tu registro no ha sido aprobado en esta ocasión.</p>
    <p>{motivo}</p>
    <p>Puedes volver a enviar tu solicitud de registro, asegurándote de completar todos los campos correctamente y proporcionar información veraz.</p>
    <p>Agradecemos tu interés en trabajar con nosotros.</p>
    <p>Atentamente,</p>
    <p>El equipo de Foodllowers</p>
  </div>
)
