import Link from "next/link"; 
import Image from "next/image";
import {User} from "lucide-react"


export default function Home() {
  const links = ["Home", "About", "Contact", "Products"];
  return (
    <>
    {/*Nav bar */}
    <div className="sticky font-bold bg-white w-full text-blue-500 p-4 flex">
      <div className="flex items-start justify-start w-full">
        <div className="flex gap-2 items-center w-full">
          <img src="/logo2.png"  className="w-12 h-12" alt="" />
          <p className="text-5xl">Dev Book</p>
        </div>
        
        
      </div>
      <div className="flex items-center gap-2 justify-center  w-full text-lg">
        {links.map((link) => (
          <Link href={`/${link.toLowerCase()}`} key={link}  >{link}</Link>
        ))}
      </div>
      <div className="flex justify-end gap-2 w-full">
        <Link href="/login" className="w-fit bg-blue-500 p-2 rounded-xl flex items-center text-white justify-center"><User/>Login</Link>
        <Link  href="/register" className="w-38 bg-blue-500 p-2 rounded-xl flex items-center text-white justify-center"><User/> Cadastre-se</Link>
      </div>
     
    </div>
    {/*FINAL DA NAV*/}
    
    <div className="">

    </div>
    </>
  );
}
