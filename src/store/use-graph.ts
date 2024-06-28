import { ViewPort } from 'react-zoomable-ui'
import { create } from 'zustand'

type InitGraphState = {
    viewPort: ViewPort | null
}

type GraphActions = {
    setViewPort: (viewPort: ViewPort) => void
    setZoomFactor: (zoomFactor: number) => void
    centerViewPort: () => void
}

type GraphStore = InitGraphState & GraphActions

const initState: InitGraphState = {
    viewPort: null
}

export const useGraph = create<GraphStore>((set, get) => ({
    ...initState,
    setViewPort: (viewPort) => set({ viewPort }),
    setZoomFactor: (zoomFactor) => {
        const viewPort = get().viewPort
        viewPort && viewPort.camera.recenter(viewPort.centerX, viewPort.centerY, zoomFactor)
    },
    centerViewPort: () => {
        const el = document.querySelector(".jv-json-view-canvas") as HTMLElement
        if (!el) return
        const viewPort = get().viewPort
        viewPort && viewPort.updateContainerSize()
        viewPort?.camera.centerFitElementIntoView(el)
        console.log("center");
    }
}))

