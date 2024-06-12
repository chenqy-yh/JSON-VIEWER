import { FadeTranstion } from "../transition"
import { JvDialogMaskProps } from "./types"
import { sc } from './utils'

const DialogMask: React.FC<JvDialogMaskProps> = (props) => {
    const {
        mask,
        maskShow,
        maskClosable = true,
        onClose } = props
    if (!mask) return null

    const handleClick = () => maskClosable && onClose()

    return (
        <FadeTranstion show={maskShow}>
            <div className={sc("mask")}
                onClick={handleClick}
            ></div>
        </FadeTranstion>

    )
}

export default DialogMask