import express from "express";
import helmet from "helmet"
//@ts-expect-error package is available
import cors from 'cors';
import path from "path";
import { AppRouter } from "./router/router";

const app = express();

app.use(cors({ origin: "*" }))
app.use(helmet())
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/files", AppRouter);

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
});

export default app;