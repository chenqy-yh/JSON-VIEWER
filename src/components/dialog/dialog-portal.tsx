import Dialog from './dialog'
import ReactDOM from 'react-dom'

import { JvDialogProps } from "./types"

const DialogPortal: React.FC<JvDialogProps> = (props) => {
    return ReactDOM.createPortal(
        <Dialog {...props} />,
        document.body
    )
}

export default DialogPortal