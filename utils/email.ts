'use server'

import nodemailer from 'nodemailer'
import htmlBaseTemplate from './template/standard-email'
import Mail from 'nodemailer/lib/mailer'

export interface IEmail {
  name: string
  email: string
  phone: string
  message: string
}

export const sendEmail = async ({ name, email, phone, message }: IEmail) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_YAHOO_EMAIL,
      pass: process.env.NEXT_YAHOO_PASSWORD
    }
  })

  const htmlTemplate = htmlBaseTemplate
    .replaceAll('{{name}}', name)
    .replaceAll('{{phone}}', phone)
    .replaceAll('{{email}}', email)
    .replaceAll('{{message}}', message)

  const mailOptions: Mail.Options = {
    from: '"Dra. Priscila Francisco - Contato Website" <mateus_vinicius_da_silva@rocketmail.com>',
    to: process.env.NEXT_YAHOO_DOCTOR_EMAIL,
    cc: email,
    subject: 'Novo e-mail de contato/dúvida via website',
    html: htmlTemplate
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email enviado:', info.messageId)

    return {
      error: false
    }
  } catch (error) {
    console.error('Erro ao enviar o email:', error)
    return {
      error: true
    }
  }
}
