import { FaRegCircleUser } from "react-icons/fa6";
import CircleButton from "@/components/button/circle-button";
import styles from './index.module.scss'
import { Selector, SelectorExpand, SelectorExpandItem } from "@/components/selector";
import { FaSignInAlt } from "react-icons/fa";


const User = () => {
    const title = (
        <CircleButton>
            <FaRegCircleUser className={styles.icon} />
        </CircleButton>
    )
    const expand = (
        <SelectorExpand>
            <>
                <SelectorExpandItem>
                    <div className={styles.expandList}>
                        <FaSignInAlt />
                        <span>Sign in </span>
                    </div>
                </SelectorExpandItem>
            </>
        </SelectorExpand>
    );
    return (
        <Selector title={title}>
            {expand}
        </Selector>
    )
}

export default User