"use client";
import newArticleAction from "./newArticleAction";
import Form  from "next/form";
import { useActionState } from "react";



export default function PostForm() {

    const [state, formAction, isPending] = useActionState(newArticleAction, null);
    const inputStyle = 'bg-gray-500/30 text-white p-2 rounded-md focus:outline-none';
    return(
        <>
        {state?.success === false &&(
            <p className="text-red-500">{state?.error}</p>
        )}
        <div className="pt-8"></div>
        <div className="flex w-full justify-center ">
            <Form action={formAction} className="flex bg-white w-[40vw] rounded-md flex-col font-bold border-indigo-700 gap-[0.2rem] p-4 text-black">
                <label htmlFor="title">Título:</label>
                <input className={inputStyle} name="title" id="title" type="text"  required/>

                <label htmlFor="content">Conteúdo:</label>
                <textarea name="content" className={inputStyle} id="content" required></textarea>

                <button  disabled={isPending } type="submit" className="w-full bg-blue-500 p-1 rounded-lg flex items-center text-white justify-center">Criar</button>
            </Form>
        </div>
        
        </>
    )

}