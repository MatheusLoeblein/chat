import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Book, Bot, Code2, LifeBuoy, Settings2, SquareTerminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Account } from "../Account/MenuButton"
import { signOut } from "next-auth/react"
import { MessageSquareText, BookUser  } from 'lucide-react';
import { useMenuContext } from "@/context/MenuContext"

export function Menu(){
    const { menuView, setMenuView } = useMenuContext()

    return(
        <aside className="fixed inset-y left-0 z-20 flex h-full flex-col border-r">
            <nav className="grid gap-1 p-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded ${ menuView == 'chat' && 'bg-muted'}`}
                        aria-label="Chats"
                        onClick={() => setMenuView('chat')}
                    >
                        <MessageSquareText className="size-5" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Chats
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded ${ menuView == 'contacts' && 'bg-muted'}`}
                        aria-label="Contacts"
                        onClick={() => setMenuView('contacts')}
                    >
                        <BookUser className="size-5" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Contacts
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
                        onClick={() => {
                            signOut({
                                redirect: true,    
                                callbackUrl: '/'
                            })
                        }}
                        variant="ghost"
                        size="icon"
                        className="mt-auto rounded"
                        aria-label="Help"
                    >
                        <LifeBuoy className="size-5" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                    Logout
                    </TooltipContent>
                </Tooltip>

                <Account/>
            </nav>
      </aside>
    )
}