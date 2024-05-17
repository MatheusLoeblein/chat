import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useMenuContext } from "@/context/MenuContext"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { Separator } from "@/components/ui/separator"

export function AccountMenu(){
    const { data } = useSession()
    const { setMenuView } = useMenuContext()
    
    return(
        <div className="w-full flex-coll">

            <div className="flex justify-between p-5 -mb-10">
                <Button onClick={() => setMenuView('chat')} className=" w-5 h-5 p-3" variant={'outline'}>{'<-'}</Button>
                <Button className=" w-5 h-5 p-3" variant={'outline'} > ... </Button>
            </div>

            <div className="space-y-4 ">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Avatar className="w-32 h-32">
                        {/* @ts-ignore */}
                        <AvatarImage className="rounded-full w-32 h-32" src={process.env.BACKEND + data?.user.cover} alt="@shadcn" />
                        <AvatarFallback>
                        <Skeleton className="rounded-full w-32 h-32 bg-gray-300 dark:bg-gray-700 animate-pulse"></Skeleton>  
                        </AvatarFallback>
                    </Avatar>
                
                    {/* @ts-ignore */}
                    <h2 className="text-xl">{data?.user.name}</h2>
                    <h3 className="text-md text-muted-foreground">(matheus)</h3>
                </div>

                <Separator/>
                
            </div>
            
        </div>
    )
}