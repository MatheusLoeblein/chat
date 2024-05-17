import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { EllipsisVertical, SearchIcon, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function RoomsList(){
    return(
        <>
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

            <div className="space-x-2 ">
              <Button variant={"default"} className="rounded text-xs h-6 px-2">
                Tudo
              </Button>
              <Button variant="outline" className="rounded text-xs h-6 px-2">
                Não lidas
              </Button>
              <Button variant="outline" className="rounded text-xs h-6 px-2">
                Grupos
              </Button>
            </div>

          </div>

          <div className="w-full pr-1">

            <div className="flex gap-4 px-4 py-3 hover:bg-muted cursor-pointer transition-all duration-300">
              <Avatar className="w-12 h-12">
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
                <div className="flex flex-col justify-between items-center">
                  <span className="text-xs text-muted-foreground">Ontem</span>
                  <Menubar className="rounded w-0 h-0 border-none shadow-none p-0 flex justify-center items-center bg-none mb-2">
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
        </>
    )
}