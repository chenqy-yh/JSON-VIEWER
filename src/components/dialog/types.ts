export type JvDialogHeaderProps = {
    useHeader: boolean,
    title?: string | React.ReactNode
    onClose?: () => void
}

export type JvDialogMaskProps = {
    mask: boolean
    maskShow: boolean
    maskClosable: boolean
    onClose: () => void
}

// export type CoreOptions = {
//     useHeader?: boolean,
//     title: string | ReactNode,
//     content: string | ReactNode,
//     mask?: boolean,
//     maskClosable?: boolean,
//     mousePos?: { x: number, y: number },
//     onClose?: () => void
// }

export type DialogCore = {
    open: (options: JvDialogMeta) => void,
    on: (dialogProps: JvDialogMeta) => void
}

export type JvDialogBeforeOpen = () => boolean

export type JvDialogAfterOpen = () => void

export type JvDialogBeforeClose = () => boolean

export type JvDialogAfterClose = () => void

export type JvDialogMeta = {
    children?: React.ReactNode | string
    style?: React.CSSProperties
    mousePos?: { x: number, y: number }
    // header
    useHeader?: boolean,
    title?: string | React.ReactNode
    // mask
    mask?: boolean
    maskClosable?: boolean
    beforeClose?: JvDialogBeforeOpen
    afterClose?: JvDialogAfterOpen
    beforeOpen?: JvDialogBeforeClose
    afterOpen?: JvDialogAfterClose
}

export type JvDialogProps = {
    show: boolean
    onClose: () => void
} & JvDialogMeta
