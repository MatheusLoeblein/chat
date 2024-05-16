import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function OtherMessage(){
    return(
        <div className="flex gap-6 items-start py-3 self-start">
            <Avatar className="min-w-10">
                <AvatarImage className="rounded-full w-10 h-10" src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>
                    <Skeleton className="rounded-full w-10 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse"></Skeleton>  
                </AvatarFallback>
            </Avatar>

        
        <div className="flex flex-col gap-2 mt-5">
            <div className="bg-gray-600 w-max px-2 py-1 rounded-lg relative shadow-lg break-all w-max-3xl md:max-w-sm xl:max-w-xl">
                <svg viewBox="0 0 8 13" height="13" width="8"  preserveAspectRatio="xMidYMid meet" className="rotate-90 scale-[2] absolute -left-[13px] top-[1.4px] text-gray-600" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
                <p className=" text-white">Testado</p> 
            </div>

            <div className="bg-gray-600 w-max px-2 py-1 rounded-lg relative shadow-lg break-all w-max-3xl md:max-w-sm xl:max-w-xl">
                <p className=" text-white">Mais texto pode se inserido aqui</p> 
            </div>

            <div className="bg-gray-600 w-max px-2 py-1 rounded-lg relative shadow-lg break-all w-max-3xl md:max-w-sm xl:max-w-xl">
                <p className=" text-white">Mais texto pode se inserido aqui</p> 
            </div>

            <div className="bg-gray-600 w-max px-2 py-1 rounded-lg relative shadow-lg break-all w-max-3xl md:max-w-sm xl:max-w-xl">
                <p className=" text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt ex tempora distinctio magnam fugiat officia ratione sequi nulla debitis, reprehenderit excepturi suscipit pariatur libero! Voluptas omnis nihil voluptatum nemo natus!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ad cupiditate illum ratione dolorum veniam aut aperiam earum illo fugit provident tempore error repudiandae doloremque fuga, sint corrupti nisi. Veritatis.</p> 
            </div>
            </div>
        </div>
    )
}