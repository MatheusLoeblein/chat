import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "@/styles/globals.css";
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemesProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { QueryClientProvider } from "@/components/QueryClientProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Chateados",
  description: "Chat boladão",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <SessionProvider session={session}>
            <QueryClientProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange>
                  <TooltipProvider>
                    {children}
                  </TooltipProvider>
                  <Toaster position="top-center" richColors/>  
                </ThemeProvider>
            </QueryClientProvider>
          </SessionProvider>
        </body>
    </html>
  );
}
