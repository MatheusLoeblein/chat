import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function MyMessage(){
    return(
        <div className="flex gap-6 items-start py-3 self-end ">
            <div className="bg-primary w-max px-2 py-1 rounded-lg relative shadow-lg mt-5 break-all max-w-96 md:max-w-sm lg:max-w-xl">
                <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet"  className="-rotate-90 scale-[2] absolute -right-[13px] top-[1.4px] text-primary"  version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
                <p className="text-white ">Testado</p> 
            </div>

            <Avatar className="min-w-10">
                <AvatarImage className="rounded-full w-10 h-10" src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>
                <Skeleton className="rounded-full w-10 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse"></Skeleton>  
                </AvatarFallback>
            </Avatar>

        </div>
    )
}