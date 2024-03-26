#!/usr/bin/env node

import { getFilePath, getFileType, getFileData, parse } from '../src/index.js';
import { Command } from 'commander';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts().format;
    const filePath1 = getFilePath(filepath1);
    const filePath2 = getFilePath(filepath2);
    const fileType1 = getFileType(filePath1);
    const fileType2 = getFileType(filePath2);
    const fileData1 = getFileData(filePath1);
    const fileData2 = getFileData(filePath2);
    const result = [parse(fileData1, fileType1), parse(fileData2, fileType2)];   
    console.log(result);
  });

  program.parse();