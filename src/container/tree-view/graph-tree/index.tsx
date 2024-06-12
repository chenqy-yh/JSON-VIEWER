import { useGraph } from '@/store/use-graph';
import { scopeClass } from '@/utils/style';
import { debounce } from 'lodash';
import { Space, ViewPort } from 'react-zoomable-ui';
import { Canvas } from 'reaflow';
import "./index.scss";

type JsonViewProps = {
    size: { width: number, height: number }
}


const sc = scopeClass("jv-json-view")

const toPX = (num: number) => `${isNaN(num) ? 0 : num}px`


const GraphView: React.FC<JsonViewProps> = (props) => {


    const setViewPort = useGraph((state) => state.setViewPort)

    const nodes = [
        {
            id: '1',
            text: 'Node 1',
        },
        {
            id: '2',
            text: 'Node 2',
        },
        {
            id: '3',
            text: 'Node 3',
        },
    ]

    const edges = [
        {
            id: '1-2',
            from: '1',
            to: '2',
        },
        {
            id: '1-3',
            from: '1',
            to: '3',
        },
    ]


    const debounceOnUpdated = debounce((viewPort: ViewPort) => {
        setViewPort(viewPort)
    }, 300)

    // return <div className={sc("box")}>{content}</div>
    return (
        <div
            style={{
                width: toPX(props.size.width),
                height: toPX(props.size.height),
                border: "1px solid red",
            }}
        >
            <Space
                onUpdated={(v) => debounceOnUpdated(v)}
                onCreate={(v) => {
                    setViewPort(v)
                }}>
                <Canvas
                    width={props.size.width}
                    height={props.size.height}
                    nodes={nodes}
                    edges={edges}
                    className={sc("canvas")}
                    fit={true}
                    zoomable={true}
                />
            </Space>
        </div>
    )
}

export default GraphView;