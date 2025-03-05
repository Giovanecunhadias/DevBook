"use client";
import newArticleAction from "./newArticleAction";
import Form  from "next/form";
import { useActionState } from "react";



export default function PostForm() {

    const [state, formAction, isPending] = useActionState(newArticleAction, null);

    return(
        <>
        {state?.success === false &&(
            <p className="text-red-500">{state?.error}</p>
        )}
        <Form action={formAction} className="flex flex-col font-bold border-indigo-700 gap-[0.2rem]">


            <label htmlFor="title">Título:</label>
            <input name="title" id="title" type="text"  required/>

            <label htmlFor="content">Conteúdo:</label>
            <input name="content" id="content" type="text" required />

            <button  disabled={isPending } type="submit" className="w-full bg-blue-500 p-1 rounded-lg flex items-center justify-center">Criar</button>
        </Form>
        </>
    )

}