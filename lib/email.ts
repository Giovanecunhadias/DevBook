import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, token: string) {
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verifique seu e-mail",
        text: `Clique no link para verificar seu e-mail: ${verificationLink}`,
        html: `<p>Clique no link para verificar seu e-mail:</p> <a href="${verificationLink}">${verificationLink}</a>`,
    });
}
