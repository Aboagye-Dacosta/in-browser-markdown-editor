import { Request, Response } from "express";
import { FileType } from "../../model/type";
import { updateFileById } from "../../model/updateFileById";

export function httpUpdateFile(req: Request, res: Response) {
    const fId: string = req.params.fileId;
    const { fileId, pathName, content, createdAt }: FileType = req.body;
    try {
        if (fileId === fId && pathName && content) {

            updateFileById({ fileId, pathName, content, createdAt });
            return res.status(202).send("file update successful");
        } else {
            return res.status(400).send("file update successful");
        }
    } catch (error) {
        return res.status(500).send("internal server error");
    }
}
