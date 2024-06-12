import styles from './index.module.scss'
import { ReactNode } from 'react'

export default function GlassContainer({ children }: { children: ReactNode }) {
    return (
        <div className={styles.glassBox}>{children}</div>
    )
}