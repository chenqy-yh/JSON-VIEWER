import CSSMotion from 'rc-motion'
import { CSSProperties, useLayoutEffect, useState } from 'react'
import { FloatIndicatorValue } from './float-indicator'
import { scopeClass } from '@/utils/style'
import "./index.scss"
import classNames from 'classnames'

type MotionThumbProps = {
    value: FloatIndicatorValue,
    container: React.RefObject<HTMLDivElement>
    duration?: number
    getActiveIndex: (value: FloatIndicatorValue) => number
    onMotionStart: () => void
    onMotionEnd: () => void
}

type ThumbStyle =
    | null
    | {
        width: string
        left: string
    }

const sc = scopeClass("jv-float-indicator")

const hasValue = (val: unknown) => val !== undefined && val !== null

const thumbCls = sc("thumb")

const optionCls = sc("option")

const fullAttr = (attr: string) => `--${thumbCls}-${attr}`

const toPx = (val: number) => {
    return hasValue(val) ? `${val}px` : undefined
}

const defaultDuration = 300

const toMs = (duration?: number) => `${isNaN(duration ?? NaN) ? defaultDuration : duration}ms`

const calcElementStyle = (el: HTMLElement) => {
    return {
        width: toPx(el.offsetWidth),
        left: toPx(el.offsetLeft)
    } as ThumbStyle
}

const MotionThumb: React.FC<MotionThumbProps> = (props) => {

    const {
        value,
        container,
        duration,
        getActiveIndex,
        onMotionStart,
        onMotionEnd
    } = props

    const [preVal, setPreVal] = useState(value)

    const findElement = (value: FloatIndicatorValue) => {
        return container.current?.querySelectorAll(`.${optionCls}`)?.[getActiveIndex(value)]
    }

    const [preStyle, setPreStyle] = useState<ThumbStyle>(null)
    const [nextStyle, setNextStyle] = useState<ThumbStyle>(null)

    useLayoutEffect(() => {
        if (preVal === value) return
        const preEle = findElement(preVal)
        const nextEle = findElement(value)

        const preStyle = calcElementStyle(preEle as HTMLElement)
        const nextStyle = calcElementStyle(nextEle as HTMLElement)

        setPreVal(value)
        setPreStyle(preStyle)
        setNextStyle(nextStyle)

        if (preStyle && nextStyle) {
            onMotionStart()
        }
    }, [value])


    if (!preStyle || !nextStyle) return null

    const onAppearStart = () => {
        return {
            width: `var(--jv-float-indicator-thumb-start-width)`,
            left: `var(--jv-float-indicator-thumb-start-left)`
        } as CSSProperties
    }

    const onAppearActive = () => {
        return {
            width: `var(--jv-float-indicator-thumb-next-width)`,
            left: `var(--jv-float-indicator-thumb-next-left)`
        }
    }

    const onVisibleChanged = () => {
        setPreStyle(null)
        setNextStyle(null)
        onMotionEnd()
    }

    return (
        <CSSMotion
            motionName={sc("thumb-motion")}
            onAppearStart={onAppearStart}
            onAppearActive={onAppearActive}
            onVisibleChanged={onVisibleChanged}
        >
            {({ className: motionClassName, style: motionStyle }) => {
                const mergedStyle = {
                    ...motionStyle,
                    [fullAttr("start-width")]: preStyle.width,
                    [fullAttr("start-left")]: preStyle.left,
                    [fullAttr("next-width")]: nextStyle.width,
                    [fullAttr("next-left")]: nextStyle.left,
                    [fullAttr("duration")]: toMs(duration)
                } as CSSProperties

                const props = {
                    className: classNames(thumbCls, motionClassName),
                    style: mergedStyle
                }

                return (<div {...props} ></div>)
            }}
        </CSSMotion>
    )
}

export default MotionThumb