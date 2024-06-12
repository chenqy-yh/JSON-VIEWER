import { useState, ReactNode, useEffect, useRef } from 'react'

export default function Bubble({ children }: { children: ReactNode }) {

    const [bubbleSize, setBubbleSize] = useState({ w: 0, h: 0 });

    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (contentRef.current) {
            const bounding = contentRef.current.getBoundingClientRect();
            setBubbleSize({ w: bounding.width, h: bounding.height });
        }
    }, [contentRef])

    return (
        <svg width={bubbleSize.w} height={bubbleSize.h} style={{
            border: '1px solid black',
        }}>
            <foreignObject x="0" y="0" width={bubbleSize.w} height={bubbleSize.h}>
                <div ref={contentRef}>
                    {children}
                </div>
            </foreignObject>
        </svg>
    )
}