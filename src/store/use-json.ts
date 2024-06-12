import { create } from 'zustand'

type InitJsonState = {
    content: string
    isValidate: boolean
}

type JsonActions = {
    setContent: (code: string) => void
    setValidate: (isValidate: boolean) => void
}

type JsonStore = InitJsonState & JsonActions

const initState: InitJsonState = {
    content: '',
    isValidate: true,
}

export const useJson = create<JsonStore>((set) => ({
    ...initState,
    setContent: (content) => set({ content }),
    setValidate: (isValidate) => set({ isValidate }),
}))