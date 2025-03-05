'use client'

import { useActionState } from "react";
import Form from "next/form";
import loginAction from "./loginAction";
import { AlertCircle } from "lucide-react";

export default function LoginForm() {
    const styleInput = 'p-1 rounded-md bg-white text-black focus:outline-none font-normal w-full';
    
    const wrappedLoginAction = async (state: any, formData: FormData) => {
        const result = await loginAction(formData);
        return { error: result.message, success: result.success, message: result.message };
    };

    const [state, formAction, isPending] = useActionState(wrappedLoginAction, null);

    return (
        <Form 
            action={formAction} 
            className="flex flex-col bg-blue-500 rounded-md p-6 font-bold border-indigo-700 gap-3 max-w-md w-full"
        >
            {state?.success === false && (
                <div className="flex items-center gap-2 bg-red-100 text-red-700 p-3 rounded-md">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">{state?.message}</p>
                </div>
            )}

            <div className="space-y-1">
                <label htmlFor="email" className="text-sm">Email:</label>
                <input 
                    name="email" 
                    id="email" 
                    className={styleInput} 
                    type="email" 
                    required 
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="password" className="text-sm">Senha:</label>
                <input 
                    name="password" 
                    id="password" 
                    className={styleInput} 
                    type="password" 
                    required 
                />
            </div>

            <button 
                type="submit" 
                className="w-full bg-blue-900 p-2 rounded-lg flex items-center justify-center mt-2 hover:bg-blue-800 transition-colors"
                disabled={isPending}
            >
                {isPending ? 'Entrando...' : 'Entrar'}
            </button>
        </Form>
    );
}