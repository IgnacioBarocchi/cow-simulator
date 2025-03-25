import "./globals.css";

import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="fixed top-0 left-0 right-0 bg-black p-4 shadow-md z-50">
          <nav>
            <Link href="/" className="text-xl font-bold">
              Artículos
            </Link>
          </nav>
        </header>
        <main className="pt-16">
          <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto p-8">
            {children}
          </article>
        </main>
        <footer className="bg-black p-4 text-center">
          <p>creado por ignacio barocchi, pero estoy buscando co-creadores</p>
        </footer>
      </body>
    </html>
  );
}
