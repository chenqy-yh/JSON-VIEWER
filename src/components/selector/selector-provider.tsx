import { useState } from "react";
import SelctorContext from './selector-context'

type SelectorProviderProps = {
    children: React.ReactNode
}

const SelectorProvider: React.FC<SelectorProviderProps> = (props) => {
    const { children } = props;

    const [isExpand, setExpand] = useState(false);

    return (
        <SelctorContext.Provider value={{ isExpand: isExpand, setExpand: setExpand }}>
            {children}
        </SelctorContext.Provider>
    )
}

export default SelectorProvider