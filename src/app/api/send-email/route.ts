import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Todos os campos são obrigatórios' },
      { status: 400 }
    )
  }

  try {
    // Configurar o transporter do Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou outro serviço de e-mail
      auth: {
        user: process.env.EMAIL_USER, // Seu e-mail
        pass: process.env.EMAIL_PASS, // Sua senha ou App Password
      },
    })

    // Configurar o conteúdo do e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'marcos_paulo.rodrigues@hotmail.com', // Substitua pelo e-mail de destino
      subject: 'Ajuda - Formulário de Contato RU - UFCAT',
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
      replyTo: email,
    }

    // Enviar o e-mail
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erro ao enviar e-mail' },
      { status: 500 }
    )
  }
}
