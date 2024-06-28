import { useState } from "react";
import {SelectorContext} from './selector-context'

type SelectorProviderProps = {
    children: React.ReactNode
}

const SelectorProvider: React.FC<SelectorProviderProps> = (props) => {
    const { children } = props;

    const [isExpand, setExpand] = useState(false);

    return (
        <SelectorContext.Provider value={{ isExpand, setExpand }}>
            {children}
        </SelectorContext.Provider>
    )
}

export default SelectorProvider