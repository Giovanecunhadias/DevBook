import Nav from "@/components/ui/Nav";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import logoutAction from '../(auth)/(logout)/logoutAction';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
  
  return (
    
  <>
      <Nav/>
      {children}
      </>
  );
}
