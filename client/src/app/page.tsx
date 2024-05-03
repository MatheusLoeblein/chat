'use client'
import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormLabel, FormItem,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod"


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
        toast.success('Autenticação',{
          description: 'Login efetuado com sucesso'
        })
        router.push('/chat')

        setIsLoading(false)
        clearInterval(time)
      }, 3000)
      
    }
    else{
      toast.error('Erro ao efetuar login',{
        description: 'usuário ou senha invalidos.'
      })
    }
  }


  return (
    <section className="flex justify-center items-center bg-slate-200 h-screen">

      <div className="p-5 border border-gray-200 rounded-md bg-white shadow-md space-y-12">
          <div>
            <h1 className="text-2xl font-medium text-center text-blue-500">Chat</h1>
            <h2 className="text-lg font-medium text-center">Autorização</h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-3 w-80">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="seu usuário" {...field} />
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                        <PasswordInput field={field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pb-12 text-xs">
                <span className="text-blue-400 hover:underline transition-all duration-300 ease-in-out cursor-pointer">Recuperar senha?</span>
              </div>

              <Button type="submit" className="w-full flex justify-center items-center">
                {
                  isLoading ? <LoaderCircle  size={22} strokeWidth={1.2} className="animate-spin"/> : 'Entrar'
                }  
              </Button>
            </form>
          </Form>

      </div>
         
    </section>
  );
}