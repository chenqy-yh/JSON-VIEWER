import { LuDownload } from "react-icons/lu";
import CircleButton from '@/components/button/circle-button'
import styles from "./index.module.scss"

const Download = () => {
    return (
        <CircleButton>
            <LuDownload className={styles.icon} />
        </CircleButton>
    )
}

export default Download