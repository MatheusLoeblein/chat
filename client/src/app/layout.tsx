import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "../styles/globals.css";
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemesProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat boladão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              {children}
            </TooltipProvider>
            <Toaster position="top-center" richColors/>  
          </ThemeProvider>
        </body>
    </html>
  );
}
