import "./index.scss"

import { Selector, SelectorExpand, SelectorExpandItem } from "@/components/selector"
import { useGraph } from '@/store/use-graph'
import { useEffect, useState } from "react"
import { scopeClass } from '@/utils/style'

const sc = scopeClass("jv-zoom")

const roundFloat = (num: number, p: number) => {
    if (isNaN(num) || isNaN(p)) return 0
    return num.toFixed(p)
}

const formatPercent = (num: number) => {
    if (isNaN(num)) return "0%"
    return roundFloat(num * 100, 2) + "%"
}

const Zoom = () => {

    const zoomFactor = useGraph((state) => state.viewPort?.zoomFactor)
    const setZoomFactor = useGraph((state) => state.setZoomFactor)
    const centerViewPort = useGraph((state) => state.centerViewPort)

    const [zoomFactorTemplate, setZoomFactorTemplate] = useState(zoomFactor ?? 1)

    const zoomFactorTitle = (
        <div className={sc("title")}>{formatPercent(zoomFactorTemplate)}</div>
    )

    useEffect(() => {
        if (!zoomFactor || isNaN(zoomFactor)) return
        setZoomFactorTemplate(zoomFactor)
    }, [zoomFactor])

    const changeZoomFactor = (factor: number) => {
        setZoomFactor(factor)
    }

    return (
        <Selector title={zoomFactorTitle}>
            <SelectorExpand>
                <SelectorExpandItem onClick={() => centerViewPort()}>Center</SelectorExpandItem>
                <SelectorExpandItem onClick={() => changeZoomFactor(0.5)}>50%</SelectorExpandItem>
                <SelectorExpandItem onClick={() => changeZoomFactor(1)}>100%</SelectorExpandItem>
                <SelectorExpandItem onClick={() => changeZoomFactor(2)}>200%</SelectorExpandItem>
            </SelectorExpand>
        </Selector>
    )
}

export default Zoom
