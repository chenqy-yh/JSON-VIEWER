import React, { ReactNode } from "react"
import { scopeClass } from '@/utils/style'
import './index.scss'

type SelectorTitleProps = {
    children: string | ReactNode,
    handleToggleListExpend: () => void
}

const sc = scopeClass("selector")

// const downArrowClass = 'ri-arrow-down-s-line'

const SelectorTitle: React.FC<SelectorTitleProps> = ({ children, handleToggleListExpend }) => {
    return (
        <div className={sc()} onClick={handleToggleListExpend}>
            {children}
        </div>
    )
}

export default SelectorTitle