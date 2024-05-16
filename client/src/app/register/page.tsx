'use client'
import { PasswordInput } from "@/components/PasswordInput";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormLabel, FormItem,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator";
import { ChevronDownSquare, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod"
import { HomeBanner } from '@/components/HomeBanner'
import Link from 'next/link'
import { api } from "@/services/api/axios";
import axios from "axios";

export default function Register(){

    const router = useRouter()
    const [ isLoading, setIsLoading ] = useState(false)
    
    //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>.]+$/, {
    //message:'senha precisa conter uma letra minúscula, uma letra maiúscula, um caractere especial, e um numero com 8 digitos, exemplo (abcde@1A).'}),
  
    const formSchema = z.object({
      name: z.string().min(6, {
        message: "Nome Precisa ter pelo menos 6 caracteres",
      }),
      username: z.string().min(4, {
        message: "Usuário precisa de pelo menos 4 caracters e não pode conter números.",
      }),
      email: z.string().min(6, {
        message: "Email invalido.",
      }),
      password: z.string().min(6, {
        message: "Senha precisa ter pelo menos 6 caracteres.",
      }),
      password_confim: z.string().min(6, {
        message: "Confirmação de senha precisa ter pelo menos 6 caracteres."
      })
    }).refine((fields) => {
      return fields.password === fields.password_confim
    }, {
      message: 'Senhas não são iguais',
      path: ['password_confim'],
    })
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema)
    })
   
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await axios.post('http://localhost:7454/signup', values)      

        console.log(response)
    }
  
    return(

      <main className="w-full md:h-screen flex bg-background relative">
        <HomeBanner/>
        <section className="flex items-center justify-center bg-background h-full w-full p-4 md:max-w-2xl overflow-y-scroll">
            <Card className="rounded max-w-md " >
              <CardHeader >
                <CardTitle className="text-2xl font-bold tracking-tighter">
                  Cadastrar sua conta
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
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome Completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Seu nome completo" {...field} className="rounded"/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome de Usuário</FormLabel>
                              <FormControl>
                                <Input placeholder="Um nome para identificação" {...field} className="rounded"/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-Mail</FormLabel>
                              <FormControl>
                                <Input placeholder="Seu endereço de e-mail" {...field} className="rounded"/>
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
                                    <PasswordInput field={field} placeholder="Escolha uma senha forte" autoComplete="new-password"/>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="password_confim"
                            render={({ field }) => (
                              
                              <FormItem>
                                <FormLabel htmlFor="password_confim">Confirmação de senha</FormLabel>
                                <FormControl>
                                    <PasswordInput field={field} placeholder="Confirme a senha anterior"/>
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
                            isLoading ? <LoaderCircle  size={22} strokeWidth={1.2} className="animate-spin"/> : 'Enviar'
                          }  
                        </Button>
                        
                        <Separator className="text-xs text-primary relative" >
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-4 bg-background text-center w-max">Ja possui uma conta ?</span>
                        </Separator>

                        <Link href={'/'} ><Button type="button" variant={'secondary'} className="w-full mt-6 flex justify-center items-center rounded">Login</Button></Link>
                      </div>

                  </form>
                </Form>
              </CardContent>
              <CardFooter>

                <p className="text-xs text-muted-foreground text-center">Ao se cadastrar em nossa plataforma você concorda com nossos <strong>Termos de uso</strong> e <strong>Politicas de privacidade.</strong></p>
              </CardFooter>
            </Card>
        </section>

      </main>
    )
}