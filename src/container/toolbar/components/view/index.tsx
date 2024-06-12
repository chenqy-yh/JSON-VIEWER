import { Selector, SelectorExpand, SelectorExpandItem } from '@/components/selector'
import { MdAutoAwesome } from 'react-icons/md'
import { PiTreeStructure } from 'react-icons/pi'
import { VscSearchFuzzy } from 'react-icons/vsc'
import { RiFocus2Fill } from 'react-icons/ri'


import { useState } from 'react'

import FloatIndicator from '@/components/float-indicator/float-indicator'
import ViewSwitch from '@/components/view-switch/view-switch'
import styles from './index.module.scss'
import { IoIosArrowDown } from "react-icons/io";


type ToolsExpandItem = {
    pre: React.ReactNode,
    content: string,
    suf?: React.ReactNode
}

const title = (
    <div className={styles.viewTitleBox}>
        <span>View</span>
        <IoIosArrowDown />
    </div>
)

const expandItems: ToolsExpandItem[] = [
    {
        pre: <PiTreeStructure />,
        content: 'Rotate Layout',
        suf: (<>
            <MdAutoAwesome />
            <span>Shift D</span>
        </>)
    },
    {
        pre: <VscSearchFuzzy />,
        content: "Collapse Graph",
        suf: (<>
            <MdAutoAwesome />
            <span>Shift C</span>
        </>)
    },
    {
        pre: <RiFocus2Fill />,
        content: "Focus to First Node",
    }
]

export default function Tools() {

    const options = ["Graph", "Tree"]

    const [optVal, setOptVal] = useState<string>(options[0])

    const onOptionChange = (value: string) => {
        setOptVal(value)
    }


    return (
        <Selector title={title}>
            <SelectorExpand>
                <FloatIndicator
                    options={options}
                    value={optVal}
                    onChange={onOptionChange}
                    style={{
                        marginBottom: "0.5rem"
                    }}
                />
                <ViewSwitch
                    value={optVal}
                    style={{
                        width: "200px",
                    }}
                    views={[
                        {
                            value: "Graph",
                            view: expandItems.map(item => (
                                <SelectorExpandItem key={item.content}>
                                    <div className={styles.toolsItem}>
                                        <div className={styles.pre}>{item.pre}</div>
                                        <div className={styles.content}>{item.content}</div>
                                        {item.suf && <div className={styles.suf}>{item.suf}</div>}
                                    </div>
                                </SelectorExpandItem>
                            ))
                        },
                        {
                            value: "Tree",
                            view: <SelectorExpandItem>
                                <div className={styles.toolsItem}>
                                    <div className={styles.content}>for test</div>
                                </div>
                            </SelectorExpandItem>
                        }
                    ]}
                />


            </SelectorExpand>
        </Selector>
    );
} 