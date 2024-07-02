import { Request, Response } from "express";
import { deleteFileById } from "../../model/deleteFileById";

export function httpDeleteFile(req: Request, res: Response) {
  // const { fileId, pathName }: { fileId: string; pathName: string } = req.body;
  const fileId = req.params.fileId;

  try {
    if (fileId) {
      deleteFileById(fileId, (file) => {
        return res.status(201).json(file);
      });
    } else {
      res.status(400).send("Bad Request");
    }
  } catch (error) {
    return res.status(500).send("internal sever error");
  }
}
