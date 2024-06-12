import DialogToolBar from "./dialog-toolbar"
import DialogMask from "./dialog-mask"

import { useMergedState } from "rc-util"
import { JvDialogBeforeClose, JvDialogProps } from "./types"
import { sc, defaultStyle, transitionDuration } from './utils'
import { CSSTransition } from 'react-transition-group'
import { useCallback, useMemo } from "react"

const Dialog: React.FC<JvDialogProps> = (props) => {
    const {
        children,
        style,
        show,
        mousePos,
        useHeader = true,
        title, mask = true,
        maskClosable = true,
        onClose,
        beforeClose,
        afterClose,
    } = props

    const [mergeVal, setMergeVal] = useMergedState(false, {
        value: show,
        defaultValue: false
    })

    const containerStyle = useMemo(() => ({
        ...style,
        transformOrigin: mousePos ? `${mousePos.x}px ${mousePos.y}px` : "center"
    }), [style, mousePos])

    const boxStyle = useMemo(() => ({
        ...defaultStyle,
    }), [])

    const handleBeforeClose = useCallback((beforeClose?: JvDialogBeforeClose) => {
        const confirmClose = beforeClose?.();
        return typeof confirmClose === 'boolean' ? confirmClose : true
    }, [])

    const handleClose = useCallback(() => {
        const confirmClose = handleBeforeClose(beforeClose)
        if (!confirmClose) return
        setMergeVal(false)
        onClose()
        afterClose?.()
    }, [beforeClose, onClose, afterClose])

    const handleContaienrClick = useCallback(() => {
        maskClosable && handleClose()
    }, [maskClosable, handleClose])

    const handleBoxClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
    }, [])

    return (
        <>
            <CSSTransition in={mergeVal} classNames={sc("zoom")} timeout={transitionDuration} unmountOnExit>
                <div className={sc("container")} style={containerStyle}
                    onClick={handleContaienrClick}>
                    <div className={sc("box")} style={boxStyle} onClick={handleBoxClick}>
                        <DialogToolBar useHeader={useHeader} title={title} onClose={handleClose} />
                        <div className={sc("content")}>
                            {children}
                        </div>
                    </div>
                </div>
            </CSSTransition>
            <DialogMask mask={mask} maskShow={mergeVal} maskClosable={maskClosable} onClose={handleClose} />
        </>
    )
}

export default Dialog