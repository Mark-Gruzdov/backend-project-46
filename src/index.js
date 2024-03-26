import process from 'process';
import path from 'path';
import YAML from 'yaml';
import { readFileSync } from 'fs';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileType = (filepath) => path.extname(filepath);
const getFileData = (filepath) => readFileSync(getFilePath(filepath));
const parse = (fileData, ext) => {
  console.log(`fileData >>> ${fileData}`);
  console.log(`ext >>> ${ext}`);
    switch (ext) {
      case '.json':
        return JSON.parse(fileData);
      case '.yml':
        return YAML.parse(fileData);
      default:
        throw new Error(`Unknown format ${ext}!`);
    }
};
export  { getFilePath, getFileType, getFileData, parse };