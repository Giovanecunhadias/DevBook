'use server';
import db from "@/lib/db";
import { hashSync } from 'bcryptjs';
import { createVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/email';

export default async function registerAction(formData: FormData) {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries) as {
        name: string,
        email: string,
        password: string,
        phone: string, 
    };
    
    console.log(data);

    if (!data.name || !data.email || !data.password) {
        return {
            error: 'Preencha todos os campos',
            success: false,
        };
    }

    // Verificar se o usuário já existe
    const existingUser = await db.user.findFirst({
        where: {
            OR: [
                { email: data.email },
                { phone: data.phone && data.phone.length > 0 ? data.phone : undefined }
            ]
        }
    });

    if (existingUser) {
        return {
            message: 'Este usuário já existe',
            success: false,
        };
    }

    try {
        // Criar token de verificação
        const verificationToken = createVerificationToken(); // Implementado em lib/token.ts
        const verificationExpires = new Date();
        verificationExpires.setHours(verificationExpires.getHours() + 24); // Expira em 24 horas

        // Criar o usuário no banco de dados
        const newUser = await db.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashSync(data.password, 8),
                phone: data.phone,
                emailVerified: false, // Começa como falso até a verificação
                emailVerificationToken: verificationToken,
                emailVerificationExpires: verificationExpires,
            }
        });

        // Enviar e-mail de verificação com o token
        await sendVerificationEmail(data.email, verificationToken);

        return {
            message: 'Registro concluído! Por favor, verifique seu e-mail para confirmar sua conta',
            success: true,
        };
    } catch (error) {
        console.error('Erro durante o registro:', error);
        return {
            error: 'Ocorreu um erro durante o registro. Por favor, tente novamente.',
            success: false,
        };
    }
}
