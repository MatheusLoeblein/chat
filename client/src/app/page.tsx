'use client'
import { PasswordInput } from "@/components/PasswordInput";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormLabel, FormItem,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod"
import { HomeBanner } from "@/components/HomeBanner";
import Link from 'next/link'



export default function Login(){

    const router = useRouter()
    const [ isLoading, setIsLoading ] = useState(false)
    
    //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>.]+$/, {
    //message:'senha precisa conter uma letra minúscula, uma letra maiúscula, um caractere especial, e um numero com 8 digitos, exemplo (abcde@1A).'}),
  
    const formSchema = z.object({
      username: z.string().min(4, {
        message: "usuário é requerido.",
      }),
      password: z.string().min(6, {
        message: "senha é requerida",
      })
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    })
   
    async function onSubmit(values: z.infer<typeof formSchema>) {
      const {username, password} = values
  
      setIsLoading(true)
  
      const response = await signIn('credentials', {
        redirect: false,
        username,
        password
      })
  
  
      if(response){
        if(response.error ){
  
          setIsLoading(false)
  
          if(response.status === 401){
            toast.error('Sistema', {
              description: 'Usuário ou senha invalidos.'
            })
          }
        }
  
        if(response.ok){
          router.push('/chat')
        }
      }
    }
  
    return(

      <main className="w-full h-screen flex bg-background relative">

        <HomeBanner/>
        <section className="flex items-center justify-center bg-background h-full w-full p-4 md:max-w-2xl">
                <Card className="rounded max-w-md " >
                  <CardHeader >
                    <CardTitle className="text-2xl font-bold tracking-tighter">
                      Entre com sua conta
                    </CardTitle>
                    <CardDescription>
                      Utilize seu usuário e senha para entrar.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10"> 
                          <div className="space-y-4">
                            <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Usuário</FormLabel>
                                <FormControl>
                                  <Input placeholder="Digite seu usuário" {...field} className="rounded"/>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor="password">Senha</FormLabel>
                                <FormControl>
                                    <PasswordInput field={field} placeholder="Digite sua senha"/>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="text-xs mb-6">
                            <span className="text-primary hover:underline transition-all duration-300 ease-in-out cursor-pointer">Recuperar senha?</span>
                          </div>
                          </div>


                          <div className="space-y-4">
                            <Button type="submit" className="w-full mt-6 flex justify-center items-center rounded">
                              {
                                isLoading ? <LoaderCircle  size={22} strokeWidth={1.2} className="animate-spin"/> : 'Entrar'
                              }  
                            </Button>
                            
                            <Separator className="text-xs text-primary relative" >
                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 bg-background text-center w-max">Ainda não possui uma conta ?</span>
                            </Separator>

                            <Link href={'/register'} ><Button type="button" variant={'secondary'} className="w-full mt-6 flex justify-center items-center rounded">Cadastrar</Button></Link>
                          </div>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-muted-foreground text-center">Ao efetuar login em nossa plataforma você concorda com nossos <strong>Termos de uso</strong> e <strong>Politicas de privacidade.</strong></p>
                  </CardFooter>
                </Card>
        </section>
      </main>

    )
}