import Nav from "@/components/ui/Nav";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
  <>
      <Nav/>
      {children}
      </>
  );
}
