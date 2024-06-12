import { scopeClass } from '@/utils/style'

import './index.scss'
import classNames from 'classnames';

type CircleButtonProps = {
    children: React.ReactNode
    style?: React.CSSProperties
    hover?: boolean
    onClick?: (e: React.MouseEvent) => void
}

const sc = scopeClass("jv-circle-button")

const CircleButton: React.FC<CircleButtonProps> = (props) => {

    const { children, style, hover = true, onClick } = props;

    const divProps = {
        style: style,
        className: classNames(sc("box"), {
            withHover: hover
        }),
        onClick: onClick
    }

    return (
        <div {...divProps}>
            {children}
        </div>
    )
}

export default CircleButton