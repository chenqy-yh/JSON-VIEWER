import { useMergedState } from 'rc-util'
import { FaCheck } from "react-icons/fa6";
import { scopeClass } from '@/utils/style'
import "./index.scss"
import classNames from 'classnames';

type CheckBoxProps = {
    children: string | React.ReactNode,
    checked?: boolean
    defaultChecked?: boolean
    onChange?: (value: boolean) => void
}

const sc = scopeClass("jv-check-box")

const CheckBox: React.FC<CheckBoxProps> = (props) => {

    const {
        children,
        checked,
        defaultChecked,
        onChange
    } = props

    const [mergeChecked, setMergeChecked] = useMergedState(defaultChecked ?? false, {
        defaultValue: defaultChecked,
        value: checked,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMergeChecked(e.target.checked)
        onChange?.(e.target.checked)
    }

    return (
        <label className={sc('label')}>
            <input className={sc('input')} checked={mergeChecked} onChange={handleChange} type="checkbox" />
            <div className={classNames(sc('icon'), {
                checked: mergeChecked
            })}>
                <FaCheck />
            </div>
            {typeof children === "string" ?
                (
                    <p className='desc' title={children}>{children}</p>
                ) :
                children
            }
        </label>
    )
}

export default CheckBox