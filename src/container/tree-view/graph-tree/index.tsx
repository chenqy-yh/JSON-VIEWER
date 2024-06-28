import GridSvg from "@/components/grid";
import styled from "@emotion/styled";
import "./index.scss";

import { useGraph } from '@/store/use-graph';
import { useJson } from "@/store/use-json";
import { scopeClass } from '@/utils/style';
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { Space, ViewPort } from 'react-zoomable-ui';
import { Canvas, CanvasPosition, CanvasRef, EdgeData, NodeData } from 'reaflow';
import { parser } from "./utils/parser";

type GraphViewProps = {
    size: { width: number, height: number }
}

const sc = scopeClass("jv-json-view")

const StyledWrapper = styled.div`
    height:100%;
`

const GraphView: React.FC<GraphViewProps> = (props) => {
    const { size } = props;

    const viewPort = useGraph((state) => state.viewPort)
    const setViewPort = useGraph((state) => state.setViewPort)
    const [paneWidth, setPaneWidth] = useState(2000)
    const [paneHeight, setPaneHeight] = useState(2000)
    const canvasRef = useRef<CanvasRef>(null)

    const content = useJson((state) => state.content)

    const [nodes, setNodes] = useState<NodeData[]>([])
    const [edges, setEdges] = useState<EdgeData[]>([])

    useEffect(() => {
        const parserRes = parser(content)
        if (!parserRes) return;
        const { nodes, edges } = parserRes;

        setNodes(nodes)
        setEdges(edges)
    }, [content])

    const debouncedOnUpdated = debounce((viewPort: ViewPort) => {
        setViewPort(viewPort)
    }, 300)


    useEffect(() => {
        if (
            !canvasRef.current
            || !canvasRef.current.layout.width
            || !canvasRef.current.layout.height
        ) return;
        console.log(canvasRef.current.layout.width, canvasRef.current.layout.height)
        setPaneWidth(canvasRef.current.layout.width + 50)
        setPaneHeight(canvasRef.current.layout.height + 50)
    }, [canvasRef, size])

    useEffect(() => {
        if (!viewPort) return
        viewPort.updateContainerSize()
        viewPort.camera.centerFitAreaIntoView({
            top: 0,
            left: 0,
            width: paneWidth,
            height: paneHeight
        })
    }, [viewPort, paneWidth, paneHeight])

    return (
        <StyledWrapper>
            <GridSvg width={size.width} height={size.height} />
            <Space
                onUpdated={debouncedOnUpdated}
                onCreate={setViewPort}>
                <Canvas
                    ref={canvasRef}
                    nodes={nodes}
                    edges={edges}
                    width={paneWidth}
                    height={paneHeight}
                    maxWidth={paneWidth}
                    maxHeight={paneHeight}
                    pannable={false}
                    defaultPosition={CanvasPosition.CENTER}
                    className={sc("canvas")}
                    direction="RIGHT"
                    readonly
                // node={(nodeProps) => <CustomNode {...nodeProps} />}
                />

            </Space>
        </StyledWrapper>
    )
}

export default GraphView;