'use client'
import { PasswordInput } from "@/components/PasswordInput";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormLabel, FormItem,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@radix-ui/react-dropdown-menu";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MessageSquareText } from 'lucide-react';

import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod"

import { ModeToggle } from "@/components/ModeToggle";

export default function Login() {

  const router = useRouter()
  const [ isLoading, setIsLoading ] = useState(false)

  const formSchema = z.object({
    username: z.string().min(4, {
      message: "usuário é requerido.",
    }),
    password: z.string().min(8, {
      message: "senha é requerida",
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>.]+$/, {
      message:'senha precisa conter uma letra minúscula, uma letra maiúscula, um caractere especial, e um numero com 8 digitos, exemplo (abcde@1A).'}),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    const {username, password} = values

    if(username === 'demo' && password === 'abcde@1A'){

      setIsLoading(true)
      const time = setTimeout(() => {
        router.push('/chat')
        setIsLoading(false)
        clearInterval(time)

        const time2 = setTimeout(() => {
          toast.success('Autenticação',{
            description: 'Login efetuado com sucesso'
          })
          clearInterval(time2)
        }, 1000)

      }, 3000)
      
    }
    else{
      toast.error('Erro ao efetuar login',{
        description: 'usuário ou senha invalidos.'
      })
    }
  }


  return (
    <main className="w-full h-screen flex bg-background relative">
      <div className="fixed top-5 right-5 z-10">
            <ModeToggle/>
      </div>

      <div className="hidden md:flex flex-col justify-between bg-primary-foreground dark:bg-gray-900  w-full h-full items-center overflow-hidden px-16 py-8">
        <h1 className="text-primary text-xl font-bold tracking-tighter self-start flex items-start">
           <span>Chateados</span>
           <MessageSquareText className="w-4 h-4"/>
        </h1>
        <img src="login-folder.svg" alt="login-folder" className="max-w-xl object-cover" />
        <p className="text-sm text-muted-foreground font-medium flex flex-col gap-2 self-start">
          <span>“This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.” </span>
          <span className="text-xs">Sofia Davis</span>
        </p>
      </div>

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
                            <PasswordInput field={field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <div className="text-xs mb-6">
                    <span className="text-primary hover:underline transition-all duration-300 ease-in-out cursor-pointer">Recuperar senha?</span>
                  </div>
                  </div>

                <Button type="submit" className="w-full mt-6 flex justify-center items-center rounded">
                  {
                    isLoading ? <LoaderCircle  size={22} strokeWidth={1.2} className="animate-spin"/> : 'Entrar'
                  }  
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Separator className="border-blue-400"/>
            <p className="text-xs text-muted-foreground text-center">Ao efetuar login em nossa plataforma você concorda com nossos <strong>Termos de uso</strong> e <strong>Politicas de privacidade.</strong></p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}