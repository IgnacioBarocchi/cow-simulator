import "tailwindcss/tailwind.css";

import Navbar from "./../components/Navbar";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div className="w-full min-h-screen">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
