'use client'
import { useEffect, useState } from "react";
import { socket } from '@/services/websocket/socket'

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  SearchIcon,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ModeToggle } from "@/components/ModeToggle";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"

import { EllipsisVertical, ChevronDown } from 'lucide-react';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";

export default function Chat() {
  const [status, setStatus] = useState(socket.connected)
  const [events, setEvents] = useState<any[]>([])
  const [value, setValue] = useState<string>('')

  

  const formSchema = z.object({
    message: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })


  const { message } = form.watch()

  useEffect(() => {
    function onConnect(){
      setStatus(true)
    }
    function onDisconnect(){
      setStatus(false)
    }

    function onEvents(value:any){
      console.log('EVENT ->', value)
      setEvents(previous => [...previous, value])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('event', onEvents)

    socket.connect()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('event', onEvents)
      socket.disconnect()
    }

  }, [])

  function handleConnect(){
    socket.connect()
    
  }
  function handleDisconnect(){
    socket.disconnect()
  }

  function handleEmitEvent(value){
    console.log(value)

    socket.emit('event', value, () =>{
      setValue('')
    })
    
  }

  return (  
      <div className="grid h-screen w-full pl-[56px]">
        <aside className="fixed inset-y left-0 z-20 flex h-full flex-col border-r">
          <nav className="grid gap-1 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded bg-muted"
                  aria-label="Playground"
                >
                  <SquareTerminal className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Playground
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded"
                  aria-label="Models"
                >
                  <Bot className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Models
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded"
                  aria-label="API"
                >
                  <Code2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                API
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded"
                  aria-label="Documentation"
                >
                  <Book className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Documentation
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded"
                  aria-label="Settings"
                >
                  <Settings2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto grid gap-1 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded"
                  aria-label="Help"
                >
                  <LifeBuoy className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Help
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded"
                  aria-label="Account"
                >
                  <Avatar className="min-w-8">
                    <AvatarImage className="rounded-full w-8 h-8" src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>
                      <Skeleton className="rounded-full w-8 h-8 bg-gray-300 dark:bg-gray-700 animate-pulse"></Skeleton>  
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col">
          <main className="grid flex-1 overflow-auto md:grid-cols-[2fr,4fr] lg:grid-cols-[2fr,3fr,3fr]">
            
            <div
              className="relative hidden flex-col items-start md:flex" x-chunk="dashboard-03-chunk-0"
            >

              <div className="w-full px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-6 ">
                  <h1 className="text-2xl font-bold tracking-tighter ">Chats</h1>
                  <Button variant='ghost' className="p-1 px-3 rounded">
                    <EllipsisVertical size={20}/>  
                  </Button>  
                </div>

                <div className="mb-2 relative">
                  <Input className="w-full rounded pl-12" placeholder='Pesquisar'/>
                  <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-4" size={17}/>
                </div>


                <div className="space-x-2">
                  <Button variant={"default"} className="rounded">
                    Tudo
                  </Button>
                  <Button variant="outline" className="rounded">
                    Não lidas
                  </Button>
                  <Button variant="outline" className="rounded">
                    Grupos
                  </Button>
                </div>

              </div>


              <div className="w-full pr-1">

                <div className="flex gap-4 px-4 py-3 hover:bg-muted cursor-pointer transition-all duration-300">
                  <Avatar className="min-w-12">
                    <AvatarImage className="rounded-full w-12 h-12" src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>
                      <Skeleton className="rounded-full w-12 h-12 bg-gray-300 dark:bg-gray-700 animate-pulse"></Skeleton>  
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex justify-between w-full">
                    <div className="space-y-1">
                      <h2>Matheus Eduardo Loeblein</h2>
                      <p className="text-sm text-muted-foreground">Fala meu mano como ta ai?</p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <span className="text-xs text-muted-foreground">Ontem</span>
                      <Menubar className="rounded w-0 h-0 border-none shadow-none p-1 flex justify-center items-center">
                        <MenubarMenu>
                          <MenubarTrigger className="rounded w-5 h-5 border-none p-0">
                            <ChevronDown />

                          </MenubarTrigger>
                          <MenubarContent className="rounded">
                            <MenubarItem className="rounded cursor-pointer">
                              Arquivar conversa
                            </MenubarItem>
                            <MenubarItem className="rounded cursor-pointer">
                              Desativar notificações 
                            </MenubarItem >
                            <MenubarItem className="rounded cursor-pointer">
                              Fixar conversa
                            </MenubarItem >
                            <MenubarItem disabled className="rounded">Sair do grupo</MenubarItem>
                          </MenubarContent>
                        </MenubarMenu>
                      </Menubar>

                    </div>
                  </div>
                  
                </div>

              </div>



            </div>

            <div className="relative flex flex-col bg-muted/100  lg:col-span-2 rounded-none border-l border-gray-200 dark:border-muted">
              {/* <Badge variant="outline" className="absolute right-3 top-3">
                Output
              </Badge> */}

              <header className="z-10 top-0 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                <div>
                  <div className="flex gap-3">
                    <Avatar className="min-w-8">
                      <AvatarImage className="rounded-full w-8 h-8" src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>
                        <Skeleton className="rounded-full w-8 h-8 bg-gray-300 dark:bg-gray-700 animate-pulse"></Skeleton>  
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-sm">Matheus Eduardo Loeblein</h2>
                      <p className="text-xs text-muted-foreground">visto por último hoje às 12:45</p>
                    </div>
                  </div>
                </div>
              {/* <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Settings className="size-4" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[80vh]">
                  <DrawerHeader>
                    <DrawerTitle>Configuration</DrawerTitle>
                    <DrawerDescription>
                      Configure the settings for the model and messages.
                    </DrawerDescription>
                  </DrawerHeader>
                  <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                    <fieldset className="grid gap-6 rounded border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Settings
                      </legend>
                      <div className="grid gap-3">
                        <Label htmlFor="model">Model</Label>
                        <Select>
                          <SelectTrigger
                            id="model"
                            className="items-start [&_[data-description]]:hidden"
                          >
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="genesis">
                              <div className="flex items-start gap-3 text-muted-foreground">
                                <Rabbit className="size-5" />
                                <div className="grid gap-0.5">
                                  <p>
                                    Neural{" "}
                                    <span className="font-medium text-foreground">
                                      Genesis
                                    </span>
                                  </p>
                                  <p className="text-xs" data-description>
                                    Our fastest model for general use cases.
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="explorer">
                              <div className="flex items-start gap-3 text-muted-foreground">
                                <Bird className="size-5" />
                                <div className="grid gap-0.5">
                                  <p>
                                    Neural{" "}
                                    <span className="font-medium text-foreground">
                                      Explorer
                                    </span>
                                  </p>
                                  <p className="text-xs" data-description>
                                    Performance and speed for efficiency.
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="quantum">
                              <div className="flex items-start gap-3 text-muted-foreground">
                                <Turtle className="size-5" />
                                <div className="grid gap-0.5">
                                  <p>
                                    Neural{" "}
                                    <span className="font-medium text-foreground">
                                      Quantum
                                    </span>
                                  </p>
                                  <p className="text-xs" data-description>
                                    The most powerful model for complex
                                    computations.
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="temperature">Temperature</Label>
                        <Input id="temperature" type="number" placeholder="0.4" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="top-p">Top P</Label>
                        <Input id="top-p" type="number" placeholder="0.7" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="top-k">Top K</Label>
                        <Input id="top-k" type="number" placeholder="0.0" />
                      </div>
                    </fieldset>
                    <fieldset className="grid gap-6 rounded border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Messages
                      </legend>
                      <div className="grid gap-3">
                        <Label htmlFor="role">Role</Label>
                        <Select defaultValue="system">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="assistant">Assistant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" placeholder="You are a..." />
                      </div>
                    </fieldset>
                  </form>
                </DrawerContent>
              </Drawer> */}

              <div className="ml-auto flex gap-2 items-center">
                <ModeToggle/>
              </div>

              </header>

              <div className="flex-1" />
              <div className="overflow-y-scroll flex flex-col px-6 max-h-[calc(100vh-200px)]">
                {/* Message owner*/}
                <div className="flex gap-6 items-start py-3 self-end ">
                  <div className="bg-primary w-max px-2 py-1 rounded-lg relative shadow-lg mt-5 break-all max-w-96 md:max-w-sm lg:max-w-xl">
                    <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet"  className="-rotate-90 scale-[2] absolute -right-[13px] top-[1.4px] text-primary"  version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
                    <p className="text-white ">Testado</p> 
                  </div>

                  <Avatar className="min-w-10">
                      <AvatarImage className="rounded-full w-10 h-10" src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>
                        <Skeleton className="rounded-full w-10 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse"></Skeleton>  
                      </AvatarFallback>
                    </Avatar>

                </div>

                {/* Message other*/}
                <div className="flex gap-6 items-start py-3 self-start">
                    <Avatar className="min-w-10">
                      <AvatarImage className="rounded-full w-10 h-10" src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>
                        <Skeleton className="rounded-full w-10 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse"></Skeleton>  
                      </AvatarFallback>
                    </Avatar>

                  
                  <div className="flex flex-col gap-2 mt-5">
                      <div className="bg-gray-600 w-max px-2 py-1 rounded-lg relative shadow-lg break-all max-w-96 md:max-w-sm lg:max-w-xl">
                        <svg viewBox="0 0 8 13" height="13" width="8"  preserveAspectRatio="xMidYMid meet" className="rotate-90 scale-[2] absolute -left-[13px] top-[1.4px] text-gray-600" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
                        <p className=" text-white">Testado</p> 
                      </div>

                      <div className="bg-gray-600 w-max px-2 py-1 rounded-lg relative shadow-lg break-all max-w-96 md:max-w-sm lg:max-w-xl">
                        <p className=" text-white">Mais texto pode se inserido aqui</p> 
                      </div>

                      <div className="bg-gray-600 w-max px-2 py-1 rounded-lg relative shadow-lg break-all max-w-96 md:max-w-sm lg:max-w-xl">
                        <p className=" text-white">Mais texto pode se inserido aqui</p> 
                      </div>

                      <div className="bg-gray-600 w-max px-2 py-1 rounded-lg relative shadow-lg break-all max-w-96 md:max-w-sm lg:max-w-xl">
                        <p className=" text-white">
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt ex tempora distinctio magnam fugiat officia ratione sequi nulla debitis, reprehenderit excepturi suscipit pariatur libero! Voluptas omnis nihil voluptatum nemo natus!
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ad cupiditate illum ratione dolorum veniam aut aperiam earum illo fugit provident tempore error repudiandae doloremque fuga, sint corrupti nisi. Veritatis.</p> 
                      </div>
                    </div>
                </div>

                {/* Message owner*/}
                <div className="flex gap-6 items-start py-3 self-end ">
                  <div className="bg-primary w-max px-2 py-1 rounded-lg relative shadow-lg mt-5 break-all max-w-96 md:max-w-sm lg:max-w-xl">
                    <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet"  className="-rotate-90 scale-[2] absolute -right-[13px] top-[1.4px] text-primary"  version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
                    <p className="text-white ">Testado</p> 
                  </div>

                  <Avatar className="min-w-10">
                      <AvatarImage className="rounded-full w-10 h-10" src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>
                        <Skeleton className="rounded-full w-10 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse"></Skeleton>  
                      </AvatarFallback>
                    </Avatar>

                </div>

                {/* Message other*/}
                <div className="flex gap-6 items-start py-3 self-start">
                    <Avatar className="min-w-10">
                      <AvatarImage className="rounded-full w-10 h-10" src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>
                        <Skeleton className="rounded-full w-10 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse"></Skeleton>  
                      </AvatarFallback>
                    </Avatar>

                  
                  <div className="flex flex-col gap-2 mt-5">
                      <div className="bg-gray-600 w-max px-2 py-1 rounded-lg relative shadow-lg break-all max-w-96 md:max-w-sm lg:max-w-xl">
                        <svg viewBox="0 0 8 13" height="13" width="8"  preserveAspectRatio="xMidYMid meet" className="rotate-90 scale-[2] absolute -left-[13px] top-[1.4px] text-gray-600" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
                        <p className=" text-white">Testado</p> 
                      </div>

                      <div className="bg-gray-600 w-max px-2 py-1 rounded-lg relative shadow-lg break-all max-w-96 md:max-w-sm lg:max-w-xl">
                        <p className=" text-white">Mais texto pode se inserido aqui</p> 
                      </div>

                      <div className="bg-gray-600 w-max px-2 py-1 rounded-lg relative shadow-lg break-all max-w-96 md:max-w-sm lg:max-w-xl">
                        <p className=" text-white">Mais texto pode se inserido aqui</p> 
                      </div>

                      <div className="bg-gray-600 w-max px-2 py-1 rounded-lg relative shadow-lg break-all max-w-96 md:max-w-sm lg:max-w-xl">
                        <p className=" text-white">
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt ex tempora distinctio magnam fugiat officia ratione sequi nulla debitis, reprehenderit excepturi suscipit pariatur libero! Voluptas omnis nihil voluptatum nemo natus!
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ad cupiditate illum ratione dolorum veniam aut aperiam earum illo fugit provident tempore error repudiandae doloremque fuga, sint corrupti nisi. Veritatis.</p> 
                      </div>
                    </div>
                </div>

                

                {events && events.length > 0 ? events.map((event, index) => {
                  return(
                    <span key={index}>
                      {JSON.stringify(event)}
                    </span>
                  )
                })
                :
                <span>

                </span>}

              </div>

            <div className="p-2 border-t bg-background">

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleEmitEvent)} 
                  className=" relative overflow-hidden rounded border focus-within:ring-1 focus-within:ring-ring " x-chunk="dashboard-03-chunk-1"
                >
                  <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="message" className="sr-only" >Message</FormLabel>
                          <FormControl>
                              <Textarea
                              {...field}
                              id="message"
                              placeholder="Escreve uma messagem aqui..."
                              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                              />
                          </FormControl>
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    />

                  <div className="flex items-center p-3 pt-0">
                  
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" type="button">
                            <Paperclip className="size-4" />
                            <span className="sr-only">Attach file</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Attach File</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" type="button">
                            <Mic className="size-4" />
                            <span className="sr-only">Use Microphone</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Use Microphone</TooltipContent>
                      </Tooltip>

                    <Button type="submit" size="sm" className="ml-auto gap-1.5 rounded">
                      Enviar menssagem
                      <CornerDownLeft className="size-3.5" />
                    </Button>

                  </div>
                </form>
              </Form>

            </div>


            </div>
          </main>
        </div>
    </div>
  
  );
}
