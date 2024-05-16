import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Book, Bot, Code2, LifeBuoy, Settings2, SquareTerminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Account } from "../Account"

export function Menu(){
    return(
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

                <Account/>
            </nav>
      </aside>
    )
}