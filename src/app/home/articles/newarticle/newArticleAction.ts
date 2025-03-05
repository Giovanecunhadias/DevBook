'use server'

import db from "@/lib/db";
import {auth} from '@/auth';
import {redirect} from 'next/navigation';


export default async function newArticleAction(_prevState: any, formData: FormData) {
    const  session = await auth ();
    if (!session || !session.user || !session.user.email) {
        return{
            error: 'Usuário não logado',
            succcess: false,
        };
    }

    //get Id user
    const user = await db.user.findUnique({
        where:{
            email: session.user.email,
        },
        select:{
            id: true,
        }
    })
    if(!user){
        return{
            error: 'Usuário não cadastrado',
            success: false,
        }
    }
    const entries = Array.from(formData.entries())
    const data = Object.fromEntries(entries) as{
        title: string,
        content: string,
    };

    if(!data.title || !data.content){
        return{
            error: 'Preencha todos os campos',
            success: false,
        };
    }

    //Create post relation user

    await db.posts.create({
        data:{
            title: data.title,
            content: data.content,
            userId: user.id
        }
    })

    return redirect('/home/articles');
    
    
}

