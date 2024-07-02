import { Request, Response } from "express";
import { getCreateFile } from "../../model/getCreateFile";
import { FileType } from "../../model/type";

export function httpCreateFile(req: Request, res: Response) {
    const { fileId, pathName, content, createdAt } = req.body as FileType;

    try {
        if (fileId && pathName) {
            getCreateFile({ fileId, pathName, content, createdAt });
            res.status(201).json({ message: " file created successfully" });
        } else {

            res.status(400).send("bad request");
        }
    } catch (error) {
        res.status(500).send("internal server error");
    }
}
