import { getFileById } from "./getFileById";
import { FileType } from "./type";


export function downloadFile(fileId: string, callback: (file: FileType) => void) {
    getFileById(fileId, (file) => {
        callback(file);
    })
}