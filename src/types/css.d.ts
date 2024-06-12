declare module '*.module.(scss|css)' {
    const classes: { [key: string]: string }
    export default classes
}