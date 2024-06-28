import styles from './index.module.scss'
import File from './components/file'
import View from './components/view'

import Download from './components/download/download'
import User from './components/user/user'
import Setting from './components/setting/setting'
import Zoom from "./components/zoom"

export default function Header() {
    const brand = 'JSON VIEWER'
    return (
        <nav className={styles.header}>
            <div className={styles.leftGroup}>
                <ul className={styles.functionList}>
                    <li className={styles.brand}>{brand}</li>
                    <li><File /></li>
                    <li><View /></li>
                </ul>
            </div>
            <div className={styles.rightGroup}>
                <ul className={styles.functionList}>
                    <li><Zoom /></li>
                    <li><Download /></li>
                    <li><User /></li>
                    <li><Setting /></li>
                </ul>
            </div>

        </nav>
    )
}