import CircleButton from "../button/circle-button"

import { MdOutlineClose } from "react-icons/md"
import { JvDialogHeaderProps } from "./types"
import { sc } from './utils'

const DialogToolBar: React.FC<JvDialogHeaderProps> = (props) => {
    const { useHeader = true, title, onClose } = props

    return useHeader ? (
        <div className={sc("toolbar")}>
            <div className={sc("toolbar-title")}>{title}</div>
            <div className={sc("toolbar-btn-group")}>
                <CircleButton hover={false} onClick={() => onClose?.()}>
                    <MdOutlineClose></MdOutlineClose>
                </CircleButton>
            </div>
        </div>
    ) : null
}

export default DialogToolBar