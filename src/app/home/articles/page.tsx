import db from "@/lib/db";
import {User} from "lucide-react"
export default async  function articles(){
    
    const  posts =  await db.posts.findMany({
        include:{
            user: {
                select:{
                    name:true
                },
            },
        },
    });
    
    return(
        <div className="flex w-full justify-center items-center text-black p-4">
            <div className="flex flex-col gap-2">
              
                    {posts.map((post) => (
                        <div className="flex flex-col rounded-md w-[40vw] p-2 bg-white " key={post.id} >
                            <div className="flex  gap-1 items-center justify-start w-full"><User size={40}/>{post.user?.name ||'Anonymous'}</div>
                            <div className="flex flex-col gap-4">
                                <h1 className="text-xl font-bold">{post.title}</h1>
                                <p>{post.content}</p>
                                
                            </div>
                            
                            
                        </div>
                    ))}
              
            </div>
        </div>
        
    )
}