import { Request, Response } from "express";
import { getReadFiles } from "../../model/getReadFiles";

export function httpReadFiles(req: Request, res: Response) {
    try {
        getReadFiles((files) => {
            res.status(200).send(files);
        })
    } catch (error) {
        res.status(500).send("Server error")
    }
}