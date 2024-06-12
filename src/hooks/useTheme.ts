import { useState } from 'react'

type ThemeType = 'light' | 'dark'

const setHtmlTheme = (theme:ThemeType) => {
    document.documentElement.setAttribute('data-theme', theme)
}


export const useTheme = () => {
    const [theme, setTheme] = useState<ThemeType>('light')

    setHtmlTheme(theme)

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return [theme, toggleTheme]
}