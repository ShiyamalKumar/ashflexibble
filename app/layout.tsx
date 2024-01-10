import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Context from "@/context/context"

export const metadata = {
  title: "Flexibble",
  description: "Showcase and discover remarkable developer projects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
     
        <Navbar />
        <main>
        <Context>
          {children}
          </Context>
        </main>
        <Footer />
       
      </body>
    </html>
  );
}
