import db from "../service/sqlConnection";
import { FileType } from "./type";

export function getReadFiles(callback: (files: FileType[]) => void): void {
    db.all("Select * from markdown", (err: Error, files: FileType[]) => {
        if (err) {
            return err
        }

        callback(files as FileType[]);
    })
}