import express from "express";
import { httpCreateFile } from "./controller/httpCreateFile";
import { httpDeleteFile } from "./controller/httpDeleteFile";
import { httpDownloadFile } from "./controller/httpDownloadFile";
import { httpReadFiles } from "./controller/httpReadFiles";
import { httpUpdateFile } from "./controller/httpUpdateFile";

export const AppRouter = express.Router()


AppRouter.get("/", httpReadFiles);
AppRouter.get("/download/:fileId", httpDownloadFile);
AppRouter.post("/", httpCreateFile);
AppRouter.delete("/:fileId", httpDeleteFile);
AppRouter.put("/:fileId", httpUpdateFile);




