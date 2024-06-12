import React, { ReactNode, useContext } from "react"
import { scopeClass } from '@/utils/style'
import './index.scss'
import selectorContext from './selector-context'

type SelectorExpandItemProps = {
    children: ReactNode
    onClick?: (e: React.MouseEvent) => void
}

const sc = scopeClass("selector-expand-item")

const SelectorExpandItem: React.FC<SelectorExpandItemProps> = (props) => {
    const {
        children,
        onClick
    } = props

    const { setExpand } = useContext(selectorContext)

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            onClick(e)
        }
        setExpand(false)
    }

    return (
        <li className={sc()} onClick={handleClick}>{children}</li>
    )
}

export default SelectorExpandItem