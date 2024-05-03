'use client'
import { useEffect, useState } from "react";
import { socket } from '@/services/websocket/socket'

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function Chat() {
  const [status, setStatus] = useState(socket.connected)
  const [events, setEvents] = useState<any[]>([])
  const [value, setValue] = useState<string>('')

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

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('event', onEvents)
    }

  }, [])

  function handleConnect(){
    socket.connect()
    
  }
  function handleDisconnect(){
    socket.disconnect()
  }

  function handleEmitEvent(){
    socket.emit('event', value, () =>{
      setValue('')
    })
    
  }

  return (
    <section className="flex justify-center items-center h-screen flex-col gap-10">
          <div className="bg-white border border-gray-300 rounded-md shadow-md p-4 flex flex-col gap-4 text-black w-max">
            <span>Status: {status ? 'Conectado' : 'Desconectado'}</span>
            <button 
            className={`${!status ? 'bg-emerald-600' : 'bg-red-500'} text-white px-3 py-1 rounded-md`}
            onClick={!status ? handleConnect : handleDisconnect}
            >{!status ? 'Conectar' : 'Desconectar'}</button>
          </div>

          <div className="bg-white border border-gray-300 rounded-md shadow-md p-4 flex flex-col gap-4 text-black w-max">
              <div className="flex flex-col gap-2 p-3 border border-gray-300 rounded-md text-xs items-center">
                <h1 className="text-center text-base text-blue-400 border-b border-gray-300 px-3">Eventos</h1>
                {
                  events && events.length > 0 ? events.map((event, index) => {
                    return(
                      <span key={index}>
                        {event}
                      </span>
                    )
                  })

                  :
                  <span>
                    Nenhum evento adicionado
                  </span>
                }
              </div>
                <Link href="/teste">
                  <Avatar>
                    <AvatarImage className="rounded-full w-10" src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>
                      <Skeleton className="rounded-full w-10 h-10 bg-pink-500"></Skeleton>  
                    </AvatarFallback>
                  </Avatar>
                </Link>


            <input type="text" className="border border-gray-300 rounded-md"
            onChange={(e) => setValue(e.target.value)}
            />

            <Button 
            disabled={!status}
            onClick={handleEmitEvent}>
              Enviar
            </Button>

          </div>
    </section>
  );
}
