'use server';

import db from '@/lib/db';
import { createVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/email';

export async function resendVerification(email: string) {
  try {
    // Buscar o usuário no banco de dados pelo e-mail
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: 'Email não encontrado' };
    }

    // Verificar se o e-mail já foi verificado
    if (user.emailVerified) {
      return { success: false, message: 'Email já foi verificado' };
    }

    // Gerar um novo token de verificação e definir a data de expiração (24 horas)
    const verificationToken = createVerificationToken();
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24); // Expira em 24 horas

    // Atualizar o token de verificação e a data de expiração no banco de dados
    await db.user.update({
      where: { email },
      data: {
        emailVerificationToken: verificationToken,
        emailVerificationExpires: verificationExpires,
      },
    });

    // Enviar o e-mail de verificação com o novo token
    await sendVerificationEmail(email, verificationToken);

    return { success: true, message: 'E-mail de verificação reenviado. Verifique sua caixa de entrada.' };
  } catch (error) {
    console.error('Erro ao reenviar a verificação:', error);
    return { success: false, message: 'Erro ao enviar verificação' };
  }
}
