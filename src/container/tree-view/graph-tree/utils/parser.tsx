// import { NodeData, EdgeData } from "reaflow"

// type Primitive = string | number | boolean | null | undefined

// const isPrimitive = (value: unknown): value is Primitive => {
//     return ["string", "number", "boolean", "null", "undefined"].includes(typeof value);
// }

// const keyComparator = (a: unknown, b: unknown) => {
//     if (isPrimitive(a) && !isPrimitive(b)) return -1;
//     return 0;
// }

// const isEmpty = (str: string) => {
//     if (str === undefined || str === null || str === "") {
//         return true;
//     }
//     return false;
// }

// const isJson = (str: string) => {
//     try {
//         JSON.parse(str);
//     } catch (e) {
//         return false;
//     }
//     return true;
// }

// const isArray = (value: unknown): value is any[] => {
//     return Array.isArray(value)
// }

// const isObject = (value: unknown): value is object => {
//     if (typeof value !== "object" || value === null) return false;
//     if (isArray(value)) return false;
//     return true
// }


// // {
// //     "squadName": "Super hero squad",
// //     "homeTown": "Metro City",
// //     "formed": 2016,
// //     "secretBase": "Super tower",
// //     "active": true,
// //     "members": [
// //       {
// //         "name": "Molecule Man",
// //         "age": 29,
// //         "secretIdentity": "Dan Jukes",
// //         "powers": [
// //           "Radiation resistance",
// //           "Turning tiny",
// //           "Radiation blast"
// //         ]
// //       },
// //       {
// //         "name": "Madame Uppercut",
// //         "age": 39,
// //         "secretIdentity": "Jane Wilson",
// //         "powers": [
// //           "Million tonne punch",
// //           "Damage resistance",
// //           "Superhuman reflexes"
// //         ]
// //       },
// //       {
// //         "name": "Eternal Flame",
// //         "age": 1000000,
// //         "secretIdentity": "Unknown"
// //       }
// //     ]
// //   }



// export const parser = (jsonStr: string): { nodes: NodeData[], edges: EdgeData[] } | undefined => {
//     if (isEmpty(jsonStr) || !isJson(jsonStr)) return;
//     const json = JSON.parse(jsonStr);
//     let node_id = 0;
//     let edge_id = 0;
//     const nodes: NodeData[] = [];
//     const edges: EdgeData[] = [];

//     const travel = (json: Record<string, unknown>): NodeData => {
//         const curNode: NodeData = {
//             id: `${++node_id}`,
//             text: "",
//         }
//         nodes.push(curNode)

//         if (isPrimitive(json)) {
//             curNode.text = json.toString();
//             return curNode;
//         }

//         Object.keys(json).sort((a, b) => keyComparator(json[a], json[b])).forEach(k => {
//             if (isPrimitive(json[k])) {
//                 curNode.text += `${k}: ${json[k]}\n`
//             } else if (isObject(json[k])) {
//                 const childNode: NodeData = {
//                     id: `${++node_id}`,
//                     text: k,
//                 }
//                 const edge: EdgeData = {
//                     id: `${++edge_id}`,
//                     from: curNode.id,
//                     to: childNode.id,
//                 }
//                 const nextNode = travel(json[k] as Record<string, unknown>);
//                 const nextEdge: EdgeData = {
//                     id: `${++edge_id}`,
//                     from: childNode.id,
//                     to: nextNode.id,
//                 }
//                 nodes.push(childNode)
//                 edges.push(edge, nextEdge)
//             } else if (isArray(json[k])) {
//                 const childNode: NodeData = {
//                     id: `${++node_id}`,
//                     text: k,
//                 }
//                 const edge: EdgeData = {
//                     id: `${++edge_id}`,
//                     from: curNode.id,
//                     to: childNode.id,
//                 }
//                 Array.from(json[k] as unknown[]).forEach(it => {
//                     const nextNode = travel(it as Record<string, unknown>);
//                     const nextEdge: EdgeData = {
//                         id: `${++edge_id}`,
//                         from: childNode.id,
//                         to: nextNode.id,
//                     }
//                     edges.push(nextEdge)
//                 })
//                 nodes.push(childNode)
//                 curNode.text && edges.push(edge)
//             }
//         })
//         return curNode;
//     }
//     travel(json)
//     return { nodes, edges }
// }

import { NodeData, EdgeData } from "reaflow";

const isEmpty = (str: string): boolean => !str || str.trim().length === 0;
const isJson = (str: string): boolean => {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
};
const isPrimitive = (val: unknown): boolean => val === null || (typeof val !== 'object' && typeof val !== 'function');
const isObject = (val: unknown): val is Record<string, unknown> => typeof val === 'object' && val !== null && !Array.isArray(val);
const isArray = (val: unknown): val is Array<unknown> => Array.isArray(val);
const keyComparator = (a: unknown, b: unknown): number => (a as string).localeCompare(b as string);

export const parser = (jsonStr: string): { nodes: NodeData[], edges: EdgeData[] } | undefined => {
    if (isEmpty(jsonStr) || !isJson(jsonStr)) return;
    const json = JSON.parse(jsonStr);
    return generateGraph(json);
}

const generateGraph = (json: Record<string, unknown>): { nodes: NodeData[], edges: EdgeData[] } => {
    let node_id = 0;
    let edge_id = 0;
    const nodes: NodeData[] = [];
    const edges: EdgeData[] = [];

    const createNode = (text: string): NodeData => {
        const node = { id: `${++node_id}`, text };
        nodes.push(node);
        return node;
    };

    const createEdge = (from: string, to: string): EdgeData => {
        const edge = { id: `${++edge_id}`, from, to };
        edges.push(edge);
        return edge;
    };

    const nodeIsEmpty = (node: NodeData): boolean => !node.text || node.text.trim().length === 0;

    const travel = (obj: Record<string, unknown>): NodeData => {
        const curNode = createNode("");

        if (isPrimitive(obj)) {
            curNode.text = obj.toString();
            return curNode;
        }

        Object.keys(obj).sort((a, b) => keyComparator(a, b)).forEach(k => {
            const value = obj[k];
            if (isPrimitive(value)) {
                curNode.text += `${k}: ${value}\n`;
            } else if (isObject(value)) {
                const childNode = createNode(k);
                createEdge(curNode.id, childNode.id);
                const nextNode = travel(value);
                createEdge(childNode.id, nextNode.id);
            } else if (isArray(value)) {
                const childNode = createNode(k);
                if (curNode.text) createEdge(curNode.id, childNode.id);
                (value as unknown[]).forEach(item => {
                    if (isObject(item)) {
                        const nextNode = travel(item);
                        createEdge(childNode.id, nextNode.id);
                    }
                });
            }
        });

        return curNode;
    };

    travel(json);
    return { nodes, edges };
};
