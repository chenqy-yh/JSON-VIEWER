import { FadeTranstion } from '@/components/transition';
import { scopeClass } from '@/utils/style';
import { ReactElement, ReactNode, useContext, useEffect, useRef } from "react";
import './index.scss';
import {default as selectorContext } from './selector-context';
import SelectorExpand from './selector-expand';
import SelectorTitle from "./selector-title";
import SelectorProvider from './selector-provider';

type SelectorProps = {
    title: string | ReactNode,
    children?: ReactElement<typeof SelectorExpand>
}

const sc = scopeClass("selector-container")


const Selector: React.FC<SelectorProps> = ({ title, children }) => {

    const { isExpand: isListExpand, setExpand: setListExpend } = useContext(selectorContext)

    // const [isListExpand, setListExpend] = useState(false)
    const selectorRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    const handleClickOutside = (e: MouseEvent) => {
        if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
            setListExpend(false)
        }
    }

    const handleToggleListExpend = () => {
        setListExpend(!isListExpand)

    }

    return (
        <SelectorProvider>
            <div ref={selectorRef} className={sc()}>
                <SelectorTitle handleToggleListExpend={handleToggleListExpend}>
                    {title}
                </SelectorTitle>
                {children &&
                    <FadeTranstion show={isListExpand}>
                        {children}
                    </FadeTranstion>
                }

            </div >
        </SelectorProvider>
    )
}

export default Selector