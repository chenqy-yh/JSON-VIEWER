import { useRef, useState } from 'react';
import { scopeClass } from '@/utils/style'
import './index.scss';
import MotionThumb from './motionThumb';
import classNames from 'classnames';

export type FloatIndicatorValue = string | number

export type FloatIndicatorOption<ValueType = FloatIndicatorValue> = {
    label: string
    value: ValueType
}

type FloatIndicatorOptions<T = FloatIndicatorValue> = (
    | T
    | FloatIndicatorOption<T>
)[];

export type InternalOptionProps<ValueType = FloatIndicatorValue> = {
    value: ValueType
    label: string
    active: boolean
    title: string
    checked: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>, value: ValueType) => void
}


export const prefixcls = "jv-float-indicator"

const sc = scopeClass("jv-float-indicator")

const InternalOption: React.FC<InternalOptionProps> = (props) => {
    const {
        title,
        label,
        value,
        checked,
        onChange
    } = props

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event, value)
    }

    return (
        <label className={classNames(sc("option"), { active: checked })}>
            <input type="radio" className={sc("radio")} checked={checked} onChange={handleChange} />
            <div title={title} className={sc("radio-title")}>{label}</div>
        </label>
    )
}

export interface FloatIndicatorProps<ValueType = FloatIndicatorValue>
    extends Omit<
        React.HTMLProps<HTMLDivElement>,
        'defaultValue' | 'value' | 'onChange'
    > {
    options: FloatIndicatorOptions<ValueType>;
    defaultValue?: ValueType;
    value?: ValueType;
    onChange?: (value: ValueType) => void;
    disabled?: boolean;
    prefixCls?: string;
    direction?: 'ltr' | 'rtl';
    motionName?: string;
    duration?: number;
    style?: React.CSSProperties;
}

const FloatIndicator: React.FC<FloatIndicatorProps> = (props) => {

    const {
        duration,
        options,
        value,
        style,
        onChange
    } = props

    const [rawValue, setRawValue] = useState(value)

    const [showThumb, setShowThumb] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: FloatIndicatorValue) => {
        if (!event.target.checked) return
        setRawValue(value)
        onChange?.(value)
    }

    const getActiveIndex = (value: FloatIndicatorValue) => {
        return options.findIndex((opt) => opt === value)
    }

    const onMotionStart = () => {
        setShowThumb(true)
    }

    const onMotionEnd = () => {
        setShowThumb(false)
    }

    const warpperProps = {
        className: classNames(sc("wrapper")),
        style: style
    }

    return (
        <div {...warpperProps}>
            <div className={sc("box")} ref={containerRef}>
                <MotionThumb
                    value={rawValue!}
                    container={containerRef}
                    duration={duration}
                    getActiveIndex={getActiveIndex}
                    onMotionStart={onMotionStart}
                    onMotionEnd={onMotionEnd}
                />
                {
                    options.map((opt, idx) => {
                        const value = typeof opt === 'string' || typeof opt === 'number' ? opt : opt.value
                        const label = typeof opt === 'string' || typeof opt === 'number' ? opt : opt.label
                        const internalOptionProps = {
                            value: value,
                            label: label,
                            title: label,
                            checked: (rawValue === value) && !showThumb,
                            onChange: handleChange
                        } as InternalOptionProps

                        return (<InternalOption
                            key={idx}
                            {...internalOptionProps}
                        />)
                    })
                }

            </div>
        </div>

    )
}

const TypedFloatIndicator = FloatIndicator as <ValueType>(
    props: FloatIndicatorProps<ValueType>
) => ReturnType<typeof FloatIndicator>

export default TypedFloatIndicator