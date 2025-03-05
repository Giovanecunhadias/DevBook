import db from "@/lib/db";

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
            <div className="flex flex-col">
                <div className="rounded-md p-2 bg-white ">
                <h1  className="font-bold">Articles</h1>
                </div>
                {posts.map((post) => (
                    <div className="rounded-md p-2 bg-white " key={post.id} >{post.user?.name ||''}{post.title}</div>
                ))}
                
            </div>
        </div>
        
    )
}