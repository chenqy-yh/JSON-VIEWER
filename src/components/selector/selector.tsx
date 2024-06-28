import { FadeTranstion } from '@/components/transition';
import { scopeClass } from '@/utils/style';
import { ReactElement, ReactNode, useContext, useEffect, useRef } from "react";
import './index.scss';
import { SelectorContext } from './selector-context';
import SelectorExpand from './selector-expand';
import SelectorTitle from "./selector-title";
import SelectorProvider from './selector-provider';

type SelectorProps = {
    title: string | ReactNode,
    children?: ReactElement<typeof SelectorExpand>
}

const sc = scopeClass("selector")

const SelectorWrapper: React.FC<SelectorProps> = (props) => {
    return (
        <SelectorProvider>
            <Selector {...props} />
        </SelectorProvider>
    )
}

const Selector: React.FC<SelectorProps> = ({ title, children }) => {

    const { isExpand, setExpand } = useContext(SelectorContext)

    const selectorRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    const handleClickOutside = (e: MouseEvent) => {
        if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
            setExpand(false)
        }
    }

    const handleToggleListExpend = () => {
        setExpand(!isExpand)

    }

    return (
        <div ref={selectorRef} className={sc("container")}>
            <SelectorTitle handleToggleListExpend={handleToggleListExpend}>
                {title}
            </SelectorTitle>
            {children &&
                <FadeTranstion show={isExpand}>
                    {children}
                </FadeTranstion>
            }
        </div >
    )
}

export default SelectorWrapper