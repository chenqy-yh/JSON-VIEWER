import DialogPortal from './dialog-portal'

import { useCallback, useEffect, useState } from 'react'
import { dialog } from './directive'
import { JvDialogAfterOpen, JvDialogBeforeOpen, JvDialogMeta } from './types'
import { noop, sc, nextTick } from './utils'

const DialogManager: React.FC = () => {

    const [show, setShow] = useState(false)

    const [dialogProps, setDialogProps] = useState<JvDialogMeta>()

    const execBeforeOpen = useCallback((beforeOpen?: JvDialogBeforeOpen) => {
        const confirmOpen = beforeOpen?.();
        if (typeof confirmOpen !== 'boolean') {
            return true
        }
        return confirmOpen
    }, []);

    const execAfterOpen = useCallback((afterOpen?: JvDialogAfterOpen) => {
        afterOpen?.();
    }, []);

    useEffect(() => {
        dialog.on = (dialogProps) => {
            setDialogProps(dialogProps)
            const confirmOpen = execBeforeOpen(dialogProps.beforeOpen)
            if (!confirmOpen) return
            setShow(true)
            nextTick(() => {
                execAfterOpen(dialogProps.afterOpen)
            })
        }
        return () => {
            dialog.on = noop
        }
    }, [dialogProps])

    const handleClose = useCallback(() => {
        setShow(false)
    }, [dialogProps])

    return (
        <div className={sc("manager")}>
            <DialogPortal
                {...dialogProps}
                show={show}
                onClose={handleClose}
            />
        </div>
    )
}

export default DialogManager
