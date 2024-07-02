import db from "../service/sqlConnection";
import { writeToFile } from "./helpers/writeToFile";
import { FileType } from "./type";

export function updateFileById(file: FileType) {

    writeToFile(`${file.fileId}-${file.pathName}`, file.content);
    const query = "UPDATE markdown SET content = ? WHERE fileId = ?";
    db.run(query, [file.content, file.fileId]);


}