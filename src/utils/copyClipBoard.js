import { message } from "antd";

export const clickToCopyClipBoard = (id) => {
    const textField = document.createElement('textarea');
    textField.innerText = id;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    document.body.removeChild(textField);
    message.success("Copied To Clipboard")
}