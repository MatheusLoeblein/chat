import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form"
import { Input } from "@/components/ui/input";

export function PasswordInput({ field, placeholder, autoComplete = 'on' }:{ field: any , placeholder: string, autoComplete?: string}){
    const [isView, setIsView] = useState(false);
  
    const toggleVisibility = () => {
      setIsView((prevIsView) => !prevIsView);
    };
  
    return(
      <div className="relative">
        <Input placeholder={placeholder} {...field} type={isView ? "text" : "password"} className="pr-10 rounded" id={field.name} autoComplete={autoComplete}/>
  
        <button type='button' className="absolute top-1/2 -translate-y-1/2 right-3 font-thin text-gray-500" onClick={toggleVisibility} >
          {isView ? <EyeOff strokeWidth={1.2} size={17}/> : <Eye strokeWidth={1.2} size={17}/>}
        </button>
        
      </div>
    )
  }