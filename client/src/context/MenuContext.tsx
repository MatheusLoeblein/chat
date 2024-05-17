"use client"

import { createContext, useContext, useState } from 'react'

type MenuViewTypes =  'chat' | 'account' | 'contacts'


interface MenuContextProps{
    menuView: MenuViewTypes;
    setMenuView: React.Dispatch<React.SetStateAction<MenuViewTypes>>
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined)


export function MenuContextProvider({ children }:{ children: React.ReactNode }){
    
    const [menuView, setMenuView] = useState<MenuViewTypes>('chat')

    return(
        <MenuContext.Provider value={{menuView, setMenuView}}>
            {children}
        </MenuContext.Provider>
    )
}

export const useMenuContext = () => useContext(MenuContext) as MenuContextProps 