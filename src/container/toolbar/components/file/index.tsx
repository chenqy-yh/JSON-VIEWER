import { Selector, SelectorExpand, SelectorExpandItem } from '@/components/selector'
import { IoIosArrowDown } from "react-icons/io";
import styles from './index.module.scss'

export default function FileMenu() {
    const title = (
        <div className={styles.fileTitleBox}>
            <span>File</span>
            <IoIosArrowDown />
        </div>
    )
    const expand = (
        <SelectorExpand>
            <>
                <SelectorExpandItem>Import</SelectorExpandItem>
                <SelectorExpandItem>Export</SelectorExpandItem>
            </>
        </SelectorExpand>
    )
    return (
        <Selector title={title} >
            {expand}
        </Selector >
    )
}