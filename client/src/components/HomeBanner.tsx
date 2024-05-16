import { ModeToggle } from "@/components/ModeToggle";
import { MessageSquareText } from "lucide-react";

export function HomeBanner(){
    return(
        <>
            <div className="fixed top-5 right-5 z-10">
            <ModeToggle/>
            </div>

            <div className="hidden md:flex flex-col justify-between bg-primary-foreground dark:bg-gray-900  w-full h-full items-center overflow-hidden px-16 py-8">
                <h1 className="text-primary text-xl font-bold tracking-tighter self-start flex items-start">
                <span>Chateados</span>
                <MessageSquareText className="w-4 h-4"/>
                </h1>
                <img src="login-folder.svg" alt="login-folder" className="max-w-xl object-cover" />
                <p className="text-sm text-muted-foreground font-medium flex flex-col gap-2 self-start">
                <span>“This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.” </span>
                <span className="text-xs">Sofia Davis</span>
                </p>
            </div>
        </>
    )
}