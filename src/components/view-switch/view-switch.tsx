import { ReactNode } from "react"
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { scopeClass } from '@/utils/style'
import classNames from "classnames"
import "./index.scss"

type ViewOptionValue = string | number

type ViewOption<T = ViewOptionValue> = {
    view: ReactNode,
    value: T
}

type ViewSwitchProps<T = ViewOptionValue> = {
    views: ViewOption<T>[],
    value: T,
    transitionDuration?: number,
    style?: React.CSSProperties
}


const sc = scopeClass("jv-view-switch")

const defaultTransitionDuration = 300

const toMs = (duration?: number) => `${isNaN(duration ?? NaN) ? defaultTransitionDuration : duration}ms`

const viewSwitch: React.FC<ViewSwitchProps> = (props) => {
    const {
        views,
        value,
        transitionDuration,
        style
    } = props

    const matchedView = views.find((viewOption) => viewOption.value === value)?.view

    const divProps = {
        style: {
            ...style,
            "--jv-view-switch-fade-duration": toMs(transitionDuration),
        }
    } as React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

    return (
        <SwitchTransition>
            <CSSTransition
                key={value}
                classNames={classNames(sc("fade"))}
                addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false)
                }}
            >
                <div {...divProps}>
                    {matchedView}
                </div>
            </CSSTransition>
        </SwitchTransition>
    )
}

export default viewSwitch