import { createContext, useContext } from "react"
import { ThemeType, ToggleTheme } from "./type"

export const defaultTheme = 'light'

export const ThemeContext = createContext<{ theme: ThemeType, toggleTheme: ToggleTheme }>({ theme: defaultTheme, toggleTheme: () => { } })

export const useTheme = () => {
    return useContext(ThemeContext)
}