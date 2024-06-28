import { Node, NodeProps } from "reaflow";

const CustomNode: React.FC<NodeProps> = (props) => {
    return (
        <Node {...props} label={null as any}>
            {/* {event => {
                // const { height, node, width, x, y, edges, nodes } = event;
                console.log(event);
                return (
                    <foreignObject height={80} width={event.width} x={0} y={0}>
                        <div>
                            <div>hh</div>
                            <div>xx</div>
                        </div>
                    </foreignObject>
                )
            }} */}
        </Node >
    )
}

export default CustomNode;