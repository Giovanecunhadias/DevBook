import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import logoutAction from '../(auth)/(logout)/logoutAction';

export default async function Home() {
    const session = await auth();

    if (!session?.user?.email) {
        // Caso o usuário não tenha sessão ou e-mail, redireciona
        redirect('/login');
        return null;
    }

    // Puxa o e-mail do usuário da sessão
    const email = session.user.email;

    // Consulta o banco de dados para verificar se o email está verificado
    const user = await db.user.findUnique({
        where: { email },
        select: { emailVerified: true }, // Verifica apenas o campo emailVerified
    });

    // Se o usuário não existir ou não tiver o campo emailVerified
    if (!user) {
        return { success: false, message: 'Usuário não encontrado' };
    }

    const emailVerified = user.emailVerified === true;
    if(!emailVerified){
        redirect('/login')
    }
    // Se o email não estiver verificado, exibe o botão de logout
    return (
        <div>
            {!emailVerified ? (
                <button onClick={logoutAction}>Seu email não está verificado. Clique aqui para sair.</button>
            ) : (
                <h1>Bem-vindo, seu e-mail está verificado!</h1>
            )}
        </div>
    );
}
