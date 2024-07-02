import db from "../service/sqlConnection";
import { FileType } from "./type";


export function getFileById(fileId: string, callback: (file: FileType) => void) {
    const query = "SELECT * FROM markdown where fileId=?";
    db.get(query, [fileId], (error: Error, row: FileType) => {

        if (error) {
            return error;
        }
        
        callback(row);
    })
}