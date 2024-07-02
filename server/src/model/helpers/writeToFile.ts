import fs from "fs";
import path from "path";


export function writeToFile(fileName: string, content: string) {

    const folderPath = path.join(__dirname, "..", "..", "..", "public", "files", fileName);
    fs.writeFile(folderPath, content, (err) => {
        if (err) {
            return err;
        }

    });
}