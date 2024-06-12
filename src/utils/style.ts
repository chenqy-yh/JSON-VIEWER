export const scopeClass = (prefix: string) => {
    return (...name: string[]) => {
        return [prefix, ...name].filter(Boolean).join('-')
    }
}