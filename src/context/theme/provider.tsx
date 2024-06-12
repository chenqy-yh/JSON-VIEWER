import { useEffect, useState } from 'react'
import { ThemeType } from './type'
import { ThemeContext, defaultTheme } from './context'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {

    const [theme, setTheme] = useState<ThemeType>(defaultTheme)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}