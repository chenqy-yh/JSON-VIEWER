import DialogManager from "./dialog-manager";
import "./index.scss";

import { scopeClass } from "@/utils/style";
import { createRoot, Root } from "react-dom/client";
import { DialogCore, JvDialogMeta } from "./types";

const sc = scopeClass("jv-dialog");

let dialogRoot: Root | null = null;

const getOrCreateDialogContainer = () => {
    let dialogContainer = document.querySelector(`#${sc("dialog-container")}`);
    if (!dialogContainer) {
        dialogContainer = document.createElement("div");
        dialogContainer.id = sc("dialog-container");
        document.body.appendChild(dialogContainer);
    }
    return dialogContainer;

}
const createDialogRoot = () => {
    const dialogContainer = getOrCreateDialogContainer();
    dialogRoot = createRoot(dialogContainer);
    dialogRoot.render(<DialogManager />)
}

const dialog: DialogCore = {
    open: (options: JvDialogMeta) => {
        if (!dialogRoot) {
            createDialogRoot();
        }
        Promise.resolve().then(() => {
            dialog.on(options)
        })
    },
    on: () => { },
}

const createDialog = (options: JvDialogMeta) => {
    dialog.open(options)
}

export { dialog };

export default createDialog;