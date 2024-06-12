import { scopeClass } from '@/utils/style'

export const transitionDuration = 300

export const noop = () => { }

export const sc = scopeClass("jv-dialog")

export const defaultStyle = {
    width: "30rem",
    height: "16rem",
} as React.CSSProperties

type Fn = (...args: unknown[]) => unknown

export const nextTick = (fn: Fn) => {
    if (typeof Promise !== 'undefined') {
        return Promise.resolve().then(fn)
    } else if (typeof MutationObserver !== 'undefined') {
        const textNode = document.createTextNode('1')
        const observer = new MutationObserver(fn)
        observer.observe(textNode, { characterData: true })
        textNode.data = '2'
    } else {
        setTimeout(fn, 0)
    }
}