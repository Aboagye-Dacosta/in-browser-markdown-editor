import 'dotenv/config'
import http from "http";
import app from "./src/app";

const PORT = process.env.PORT 

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT} ...`);
})