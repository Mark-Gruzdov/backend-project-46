import YAML from 'yaml';

const parse = (fileData, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(fileData);
    case '.yml':
      return YAML.parse(fileData);
    case '.yaml':
      return YAML.parse(fileData);
    default:
      throw new Error(`Unknown format ${ext}!`);
  }
};

export default parse;
