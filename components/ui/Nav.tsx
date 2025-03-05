"use client";

import { ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "@/public/logo.png";
import Form from "next/form";
import logoutAction from "@/src/app/(auth)/(logout)/logoutAction";
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const links = ["Articles", "Products"];
  const languages = ["javascript", "java", "python", "ruby", "c++", "c#", ""];

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/session");
        if (res.ok) {
          const sessionData = await res.json();
          setSession(sessionData);
        }
      } catch (error) {
        console.error("Erro ao buscar sessão:", error);
      }
    }
    fetchSession();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav>
      <div className="sticky gap-2 bg-white h-24 font-bold text-blue-400 flex justify-center w-full items-center">
        <div className="absolute left-2 flex items-center text-blue-500 font-bold text-xl">
          <img src={logo.src} alt="logo" className="w-24 h-24" />
          Dev Book
        </div>
        {links.map((link) => (
          <Link
            key={link}
            href={`/${link === "Articles" ? "home/articles" : link.toLowerCase()}`}
          >
            {link}
          </Link>
        ))}
        {/* DROPDOWN */}
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Menu {!open && <ChevronDown size={18} />} {open && <ChevronDown size={18} className="rotate-180" />}
          </button>

          {open && (
            <div className="bg-white rounded-md absolute top-12 p-4">
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col"
              >
                {languages.map((lang) => (
                  <Link key={lang} href={lang.toLowerCase()}>
                    {lang}
                  </Link>
                ))}
              </motion.ul>
            </div>
          )}
        </div>
        <div className="flex gap-2 absolute right-2">
          {!session && (
            <>
              <Link href="/login">
                <button className="flex items-center rounded-3xl bg-blue-500 text-white p-2 hover:cursor-pointer hover:opacity-90">
                  <User size={18} />
                  Login
                </button>
              </Link>
              <Link href="/register ">
                <button className="flex items-center rounded-3xl bg-blue-500 text-white p-2 hover:cursor-pointer hover:opacity-90">
                  <User size={18} />
                  Cadastre-se
                </button>
              </Link>
            </>
          )}
          {session && (
            <>
              <Link href="/profile">
                <button className="flex items-center rounded-3xl bg-blue-500 text-white p-2 hover:cursor-pointer hover:opacity-90">
                  <User size={18} />
                  Perfil
                </button>
              </Link>
              <Form action={logoutAction}>
              <button className="flex items-center rounded-3xl bg-blue-500 text-white p-2 hover:cursor-pointer hover:opacity-90">
                  <User size={18} />
                  Sair
                </button>
              </Form>
                
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
