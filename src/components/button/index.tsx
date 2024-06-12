import React, { useEffect, useRef, useState } from "react";
import { scopeClass } from '@/utils/style'
import './index.scss'

const sc = scopeClass("jv-button-circle")

export default function JvButton({ children }: { children: string | React.ReactNode }) {

    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const [theme, setTheme] = useState('light')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [buttonRef, theme])

    const handleToggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <button
            ref={buttonRef}
            className={sc()}
            onClick={handleToggleTheme}>{children}</button>
    )
}
