import { createContext } from "react";

export type SelectorContextType = {
    isExpand: boolean
    setExpand: (isExpand: boolean) => void
}

const SelectorContext = createContext<SelectorContextType>({
    isExpand: false,
    setExpand: () => { }
});

export { SelectorContext }