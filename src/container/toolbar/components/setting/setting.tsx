import { IoSettingsSharp } from "react-icons/io5";
import { Selector, SelectorExpand } from "@/components/selector";

import CircleButton from "@/components/button/circle-button";
import styles from './index.module.scss'
import CheckBox from "@/components/check-box";

const Setting = () => {
    const title = (
        <CircleButton>
            <IoSettingsSharp className={styles.icon} />
        </CircleButton>
    );

    const expand = (
        <SelectorExpand>
            <>
                <CheckBox>Rulers</CheckBox>
                <CheckBox>Trackpad Gestures</CheckBox>
                <CheckBox>Item Count</CheckBox>
                <CheckBox>Image Link Preview</CheckBox>
                <CheckBox>Show Expand/Collapse</CheckBox>
                <CheckBox>Dark Mode</CheckBox>
            </>
        </SelectorExpand>
    )

    return (
        <Selector title={title}>
            {expand}
        </Selector>
    )
}

export default Setting