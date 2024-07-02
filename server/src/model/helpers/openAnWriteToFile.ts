import fs from "fs";
import path from "path";

export function openAndWriteToFile(fileName: string, content: string) {

    const filePath = path.join(__dirname, "..", "..", "..", "public", "files", fileName);

    fs.open(filePath, 'wx', (err, fd) => {
        if (err) {
            if (err) {
                return err
            }
        }
        fs.writeFileSync(filePath, content);
        fs.close(fd, (err) => {
            if (err) {
                return err
            }
        });

    })
}
