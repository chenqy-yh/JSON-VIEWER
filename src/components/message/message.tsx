import { ReactNode, useEffect, useState } from "react"
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { v4 as uuid } from 'uuid'
import message, { sc, type MessageTypeKey } from './index'

import "./index.scss"
import classNames from "classnames"


type CreateMessageOptions = {
    type: MessageTypeKey,
    content: string | ReactNode,
    duration: number
}

type MessageItemMeta = {
    id: string,
} & CreateMessageOptions

type MessageItemProps = MessageItemMeta & {
    destoryMessage: () => void
}

type MessageContainerProps = {
    messageList: MessageItemMeta[],
    setMessageList: (cb: (list: MessageItemMeta[]) => MessageItemMeta[]) => void
}

const defaultTransitionDuration = 300

const MessageManager = () => {
    const [messageList, setMessageList] = useState<MessageItemMeta[]>([])

    const createMessage = (options: CreateMessageOptions) => {
        return {
            id: uuid(),
            content: options.content,
            type: options.type,
            duration: options.duration
        } as MessageItemMeta
    }

    useEffect(() => {
        const messageTypeKeys = ["success", "error", "warning", "info"] as MessageTypeKey[]
        messageTypeKeys.forEach((key) => {
            message[key] = (content: string | ReactNode, duration: number) => {
                const messageItem = createMessage({
                    type: key,
                    content,
                    duration
                })
                setMessageList((list: MessageItemMeta[]) => [...list, messageItem])
            }
        })
    }, [])

    return (
        <MessageContainer messageList={messageList} setMessageList={setMessageList} />
    )
}

const MessageContainer: React.FC<MessageContainerProps> = (props) => {

    const { messageList, setMessageList } = props;

    const destoryMessage = (id: string) => {
        setMessageList((list) => list.filter((msg) => msg.id !== id))
    }

    return (
        <div className={sc("container")}>
            <TransitionGroup className={sc("list")}>
                {
                    messageList.map((item) => {
                        return (
                            <CSSTransition
                                key={item.id}
                                timeout={defaultTransitionDuration}
                                classNames={sc("item")}
                            >
                                <MessageItem {...item} destoryMessage={() => destoryMessage(item.id)} />
                            </CSSTransition>
                        )
                    })
                }
            </TransitionGroup>

        </div>
    )
}


const MessageItem: React.FC<MessageItemProps> = (props) => {
    const {
        type,
        content,
        duration,
        destoryMessage
    } = props

    useEffect(() => {
        const timer = setTimeout(destoryMessage, duration)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    const messageItemProps = {
        className: classNames(sc("item"), sc(`item-${type}`)),
    }

    return (
        <div {...messageItemProps} >{content}</div>
    )
}

// export default message
export default MessageManager