import "./globals.css";
import ReactQueryProvider from "@/providers/ReactProvidersQuery";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/providers/theme-provider";
import { DataProvider } from "@/context/datacontext";
import Header from "@/components/Header";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <DataProvider>
        <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
          <ReactQueryProvider>
        
            <Toaster />
              <body className={` flex flex-col w-full items-center `}>
              <main className="max-w-[1440px] w-[90%]  flex flex-col">
                <Header />

                  {children}

              </main>
              </body>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />

          </ReactQueryProvider>
      </ThemeProvider>
      
    </DataProvider>
          
      
        

  </html>
  );
}
