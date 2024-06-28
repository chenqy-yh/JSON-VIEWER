import { useMemo } from "react"
import { scopeClass } from '@/utils/style'

type JvGridProps = {
    width: number
    height: number
    gap?: number | [number, number],
    lineStyle?: React.CSSProperties
}

const sc = scopeClass("jv-grid")

const defaultLineStyle: React.CSSProperties = {
    stroke: "rgba(0,0,0,0.1)",
    strokeWidth: 1
}

const defaultGap = 10

const hitNum = 5;

const Grid: React.FC<JvGridProps> = (props) => {
    const {
        width,
        height,
        gap = defaultGap,
        lineStyle = defaultLineStyle
    } = props;

    const lines = useMemo(() => {
        const colGap = Array.isArray(gap) ? gap[0] : gap
        const rowGap = Array.isArray(gap) ? gap[1] : gap
        const colCount = Math.ceil(width / colGap)
        const rowCount = Math.ceil(height / rowGap)
        const res = []
        // calc row lines
        for (let i = 0; i < colCount; i++) {
            res.push(
                <line key={sc(`line-row-${i}`)} x1={i * rowGap} y1={0} x2={i * rowGap} y2={height} stroke={lineStyle.stroke} strokeWidth={lineStyle.strokeWidth} opacity={i % hitNum === 0 ? 1 : 0.5} />
            )
        }
        for (let i = 0; i < rowCount; i++) {
            res.push(
                <line key={sc(`line-col-${i}`)} x1={0} y1={i * colGap} x2={width} y2={i * colGap} stroke={lineStyle.stroke} strokeWidth={lineStyle.strokeWidth} opacity={i % hitNum === 0 ? 1 : 0.5} />
            )
        }
        return res
    }, [width, height, gap, lineStyle])

    return (
        <svg
            style={{
                position: "absolute",
                top: 0,
                left: 0,
            }}
            width={width}
            height={height}>
            {lines}
        </svg>
    )
}

export default Grid