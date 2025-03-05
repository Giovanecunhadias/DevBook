import Nav from "@/components/ui/Nav";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={` antialiased`}
      >
        <Nav></Nav>
        {children}
      </body>
    </html>
  );
}
