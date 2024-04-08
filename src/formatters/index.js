import getStylishOutput from './stylish.js';
import getPlainOutut from './plain.js';

const getOutput = (data, format) => {
  switch (format) {
    case 'stylish':
      return getStylishOutput(data);
    case 'plain':
      return getPlainOutut(data);
    default:
      throw new Error(`Unknown ${format}.`);
  }
};

export default getOutput;
