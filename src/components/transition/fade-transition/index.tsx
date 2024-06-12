import { ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import { scopeClass } from '@/utils/style'
import './index.scss'

type TransitionDuration = "ssm" | "sm" | "md" | "lg" | "xl"

type TimeOutObjectKeys = "enter" | "exit"

type TimeOut = TransitionDuration | {
    [k in TimeOutObjectKeys]: TransitionDuration
}

const sc = scopeClass('jv-fade-transition')

const TimeOutMap = {
    ssm: 100,
    sm: 250,
    md: 500,
    lg: 1000,
    xl: 2000
}

const getClassNames = (timeout: TimeOut) => {
    const res = {
        enter: sc(typeof timeout === 'string' ? timeout : timeout.enter, 'enter'),
        exit: sc(typeof timeout === 'string' ? timeout : timeout.exit, 'exit'),
        enterActive: sc(typeof timeout === 'string' ? timeout : timeout.enter, 'enter-active'),
        exitActive: sc(typeof timeout === 'string' ? timeout : timeout.exit, 'exit-active')
    }
    return res
}

export default function FadeTransition({ show = false, children, timeout = "sm" }: {
    show: boolean, children: ReactNode, timeout?: TimeOut
}) {

    const _timeout = typeof timeout === "string" ? TimeOutMap[timeout] : {
        enter: TimeOutMap[timeout.enter],
        exit: TimeOutMap[timeout.exit]
    }

    return (
        <CSSTransition
            in={show}
            classNames={getClassNames(timeout)}
            timeout={_timeout}
            unmountOnExit
        >
            {children}
        </CSSTransition>
    )
}