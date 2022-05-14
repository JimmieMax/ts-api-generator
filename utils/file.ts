import * as fs from "fs";

export const mkdirIfNotExist = (filePath: string, isSystemRoot = false) => {
  const pathArr = filePath.split("/");
  let checkPath = isSystemRoot ? "" : ".";
  let item: string;
  for (item of pathArr) {
    checkPath += `/${item}`;
    if (!fs.existsSync(checkPath)) {
      fs.mkdirSync(checkPath);
    }
  }
};

export const writeFile = (path: string, content: string) => {
  fs.writeFile(path, content, "utf8", (err) => {
    if (err) {
      console.log("Error writing file! Error: " + err);
    } else {
      console.log(`Write file '${path}' successfully`);
    }
  });
};
