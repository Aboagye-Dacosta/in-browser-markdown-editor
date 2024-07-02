import db from "../service/sqlConnection";
import { getFileById } from "./getFileById";
import { deleteFile } from "./helpers/deleteFile";
import { FileType } from "./type";


export function deleteFileById(fileId: string, callback: (file: FileType) => void): void {
    getFileById(fileId, (file) => {
        db.run("DELETE FROM markdown where fileId = ?", [fileId], (error: Error) => {
            if (error) {
                return error;
            }
            deleteFile(`${file.fileId}-${file.pathName}`);
            callback(file)
        })
    })
}