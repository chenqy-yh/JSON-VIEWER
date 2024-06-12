import { Selector, SelectorExpand, SelectorExpandItem } from "@/components/selector"
import { useGraph } from '@/store/use-graph'
import { useEffect, useState } from "react"
import { ViewPort } from "react-zoomable-ui"

const roundFloat = (num: number, p: number) => {
    if (isNaN(num) || isNaN(p)) return 0
    return num.toFixed(p)
}

const formatPercent = (num: number) => {
    if (isNaN(num)) return "0%"
    return roundFloat(num * 100, 2) + "%"
}

const Zoom = () => {

    const viewPort = useGraph((state) => state.viewPort)
    const zoomFactor = useGraph((state) => state.viewPort?.zoomFactor)
    const setViewPort = useGraph((state) => state.setViewPort)
    const setZoomFactor = useGraph((state) => state.setZoomFactor)

    const [zoomFactorTemplate, setZoomFactorTemplate] = useState(zoomFactor ?? 1)

    useEffect(() => {
        if (!zoomFactor || isNaN(zoomFactor)) return
        setZoomFactorTemplate(zoomFactor)
    }, [zoomFactor])

    const changeZoomFactor = (factor: number) => {
        setZoomFactor(factor)
        const nextViewPort = { ...viewPort };
        nextViewPort.zoomFactor = factor;
        setViewPort(nextViewPort as unknown as ViewPort)

    }

    return (
        <Selector title={formatPercent(zoomFactorTemplate)}>
            <SelectorExpand>
                <SelectorExpandItem onClick={() => changeZoomFactor(0.5)}>50%</SelectorExpandItem>
                <SelectorExpandItem onClick={() => changeZoomFactor(1)}>100%</SelectorExpandItem>
                <SelectorExpandItem onClick={() => changeZoomFactor(2)}>200%</SelectorExpandItem>
            </SelectorExpand>

        </Selector>
        // <Selector title={viewPort?.zoomFactor}></Selector>

    )
}

export default Zoom
