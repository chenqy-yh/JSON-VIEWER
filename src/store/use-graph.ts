import { ViewPort } from 'react-zoomable-ui'
import { create } from 'zustand'

type InitGraphState = {
    viewPort: ViewPort | null
}

type GraphActions = {
    setViewPort: (viewPort: ViewPort) => void
    setZoomFactor: (zoomFactor: number) => void
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
    }
}))

