import { createContext } from "react";



export const UserContext = createContext({})

export function UserContextProvider({children}) {
    return (
        <UserContextProvider value={User,setUser}>
            {children}
        </UserContextProvider>
    )
}