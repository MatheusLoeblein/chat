import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from "next-auth/react"
import { useMenuContext } from "@/context/MenuContext"


export function Account(){
    const { data } = useSession()
    const { setMenuView } = useMenuContext()

    return(
        <Tooltip>
            <TooltipTrigger asChild>

                    <Button
                    variant="ghost"
                    size="icon"
                    className="mt-auto rounded flex justify-center items-center"
                    aria-label="Account"
                    onClick={() => setMenuView('account')}
                    >
                    <Avatar className="w-8 h-8">
                        {/* @ts-ignore */}
                        <AvatarImage className="rounded-full w-8 h-8" src={process.env.BACKEND + data?.user.cover} alt="@shadcn" />
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
    )
}