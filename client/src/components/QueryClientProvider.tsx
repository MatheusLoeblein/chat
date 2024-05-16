"use client"
import { QueryClient, QueryClientProvider as QueryProvider } from '@tanstack/react-query'

export function QueryClientProvider({children}:{ children: React.ReactNode }){
    const queryClient = new QueryClient()
    
    return(
        <QueryProvider client={queryClient}>
            {children}
        </QueryProvider>  
    )
}