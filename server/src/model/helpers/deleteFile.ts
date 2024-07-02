
import fs from "fs"; 
import path from "path";
export function deleteFile(fileName: string) {
    const filePath = path.join(__dirname, "..", "..", "..", "public", "files", fileName);
    fs.unlink(filePath, (err) => {
        if (err) {
            return err;
        };
    });
}