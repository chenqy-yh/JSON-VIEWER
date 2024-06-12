import { ReactNode, useEffect, useRef, useState } from 'react'
import { scopeClass } from '@/utils/style'
import './index.scss'
type SelectorExpandProps = {
    children: ReactNode
}

const sc = scopeClass("selector-expand")

const marginLeft = 10;

const SelectorExpand: React.FC<SelectorExpandProps> = ({ children }: { children: ReactNode }) => {

    const selectorExpandRef = useRef<HTMLUListElement | null>(null)

    const [deltaOffset, setDeltaOffset] = useState(0)

    useEffect(() => {
        const rect = selectorExpandRef.current?.getBoundingClientRect();
        if (!rect) return;
        const newOffset = rect.right - window.innerWidth;
        if (rect.right + marginLeft > window.innerWidth && deltaOffset !== newOffset) {
            setDeltaOffset(newOffset + marginLeft);
        }
    }, []);


    const testStyle = {
        "--left": `${deltaOffset}px`,

    } as React.CSSProperties

    return (
        <ul
            ref={selectorExpandRef}
            className={sc()}
            style={testStyle}
        >
            {children}
        </ul>
    )
}

export default SelectorExpand
