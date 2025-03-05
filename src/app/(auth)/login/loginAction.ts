'use server'

import { auth, signIn } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error";

interface ErrorMessage {
    e: string,
}

export default async function loginAction( formData: FormData) {
    const session = await auth ();
    const emailVerified = session?.user?.emailVerified;
    try{await signIn('credentials', {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        redirect: true,
        redirectTo: '/home',
    }
    )
        return{success: true};
    }catch(e: unknown){
        if(isRedirectError(e)){
            throw e
        }
        if ((e as { type: string } ).type === 'CredentialsSignin') {
            return { success: false, message: 'Suas crendencias incorretas' };
        }
        
       return{success: false, message: 'Ocorreu um erro'}
    }
}                                               