'use server';

import db from '@/lib/db';

export async function verifyEmail(token: string, email: string) {
  try {
    // Buscar o usuário no banco pelo e-mail
    const user = await db.user.findUnique({
      where: { email },
      select: { emailVerificationToken: true, emailVerificationExpires: true },
    });

    // Verificar se o usuário existe e se o token é válido
    if (!user || user.emailVerificationToken !== token) {
      return { success: false, message: 'Link inválido ou expirado' };
    }

    // Verificar se o token expirou
    if (user.emailVerificationExpires && new Date() > user.emailVerificationExpires) {
      return { success: false, message: 'Token expirado' };
    }

    // Atualizar o status do e-mail verificado e remover o token do banco
    await db.user.update({
      where: { email },
      data: { emailVerified: true, emailVerificationToken: null, emailVerificationExpires: null },
    });

    return { success: true, message: 'E-mail verificado com sucesso' };
  } catch (error) {
    console.error('Erro ao verificar e-mail:', error);
    return { success: false, message: 'Erro ao verificar e-mail' };
  }
}
