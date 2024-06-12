import { ReactNode } from "react";
import MessageManager from "./message";
import { scopeClass } from "@/utils/style";
import ReactDOM from "react-dom/client";

export type MessageTypeKey = "success" | "error" | "warning" | "info"

type CreateOptions = {
    type: MessageTypeKey,
    content: string | ReactNode,
    duration?: number
}

type BaseMessageCore = {
    open: (options: CreateOptions) => void
}

type MessageCoreCb = {
    [key in MessageTypeKey]: (content: string | ReactNode, duration: number) => void
}

type MessageCore = BaseMessageCore & MessageCoreCb

export const sc = scopeClass("jv-message")

const MSG_CONTAINER_ID = sc("outer-container")

let messageContainerRoot: ReactDOM.Root | null = null;

const noop = () => { }

const defaultDuration = 2000


const getOrCreateMessageContainer = () => {
    let messageContainer = document.querySelector(`#${MSG_CONTAINER_ID}`);
    if (!messageContainer) {
        messageContainer = document.createElement("div");
        messageContainer.id = MSG_CONTAINER_ID;
        document.body.appendChild(messageContainer);
    }
    return messageContainer;
}

const createMessageContainerRoot = () => {
    const messageContainer = getOrCreateMessageContainer();
    messageContainerRoot = ReactDOM.createRoot(messageContainer);
    messageContainerRoot.render(<MessageManager />)
}


const nextTick = (cb: () => void) => {
    Promise.resolve().then(cb)
}


const message: MessageCore = {
    open: ({ type = "info", content, duration = defaultDuration }) => {
        if (!messageContainerRoot) {
            createMessageContainerRoot();
            nextTick(() => {
                message[type](content, duration)
            })
        } else {
            message[type](content, duration)
        }
    },
    success: noop,
    error: noop,
    warning: noop,
    info: noop
}

export default message
