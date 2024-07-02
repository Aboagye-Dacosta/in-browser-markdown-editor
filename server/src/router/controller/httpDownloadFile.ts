import { Request, Response } from "express";
import path from "path";
import { downloadFile } from "../../model/downloadFile";

export function httpDownloadFile(req: Request, res: Response) {
    const fileId = req.params.fileId;

    try {
        if (fileId) {
            downloadFile(fileId, (file) => {
                const fileName = `${fileId}-${file.pathName}`;
                const filePath = path.join(__dirname, "..", "..", "..", "public", "files", fileName);
                res.download(filePath);
                // if (!fs.existsSync(filePath)) {
                //     res.status(404).send("file not found");
                //     return;
                // }

                // const fileSize = fs.statSync(filePath).size;
                // res.setHeader("Content-Disposition", `attachment;filename=${fileName}`);
                // res.setHeader("content-type", "application/octet-stream");
                // res.setHeader("Content-Length", fileSize);
                // fs.createReadStream(filePath).pipe(res);
            })
        } else {
            res.status(401).send("bad request");

        }
    } catch (error) {
        res.status(500).send("internal server error");
    }

}