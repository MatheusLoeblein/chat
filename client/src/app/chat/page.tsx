'use client'
import { useEffect, useState } from "react";
import { socket } from '@/services/websocket/socket'

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

import {
  CornerDownLeft,
  Mic,
  Paperclip,
  SearchIcon,
  Settings,
  Settings2,

} from "lucide-react"

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
import { useSession } from "next-auth/react";

import { MyMessage } from "@/components/Message/MyMessage";
import { OtherMessage } from "@/components/Message/OtherMessage";
import { Menu } from "@/components/Menu";
import { RoomsList } from "@/components/RoomsList";


export default function Chat() {
  const [status, setStatus] = useState(socket.connected)
  const [events, setEvents] = useState<any[]>([])
  const [value, setValue] = useState<string>('')

  const {data} = useSession()

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

          <Menu/>
          <div className="flex flex-col">
            <main className="flex flex-1 overflow-auto">
              
              <RoomsList/>

              <div className="relative flex flex-col bg-muted/100 grow  rounded-none border-l border-gray-200 dark:border-muted lg:w-[calc(100vw-22.5rem-118px)]">

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

                    <MyMessage/>

                    <OtherMessage/>

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
