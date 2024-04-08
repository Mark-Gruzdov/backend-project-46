import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const files = [['file1.json', 'file2.json'], ['file1.yml', 'file2.yml']];

const getFilePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);

test.each(files)('check comparing "stylish" files', (file1, file2) => {
  const filepath1 = getFilePath(file1);
  const filepath2 = getFilePath(file2);
  const result = readFileSync(getFilePath('stylish_result.txt'), 'utf-8');
  expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(result);
});

test.each(files)('check comparing "plain" files', (file1, file2) => {
  const filepath1 = getFilePath(file1);
  const filepath2 = getFilePath(file2);
  const result = readFileSync(getFilePath('plain_result.txt'), 'utf-8');
  expect(gendiff(filepath1, filepath2, 'plain')).toEqual(result);
});

test.each(files)('check comparing "JSON" files', (file1, file2) => {
  const filepath1 = getFilePath(file1);
  const filepath2 = getFilePath(file2);
  const result = readFileSync(getFilePath('json_result.txt'), 'utf-8');
  expect(gendiff(filepath1, filepath2, 'json')).toEqual(result);
});
