
import db from "../service/sqlConnection";
import { openAndWriteToFile } from "./helpers/openAnWriteToFile";
import { FileType } from "./type";




export function getCreateFile({ fileId, pathName, content, createdAt }: FileType) {

    openAndWriteToFile(`${fileId}-${pathName}`, content);
    const stmt = db.prepare("INSERT INTO markdown (pathName,fileId,content,createdAt) VALUES (?,?,?,?)", (_: unknown, error: Error) => {
        if (error) {
            throw new Error("could not create file");
        }
    })
    stmt.run(pathName, fileId, content, createdAt)
}