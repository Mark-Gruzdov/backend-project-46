import _ from 'lodash';

const getLeftIdent = (depth, replacer = ' ', spacesCount = 4) => (
  replacer.repeat((depth * spacesCount) - 2));
const getRightIndent = (depth, replacer = ' ', spacesCount = 4) => (
  replacer.repeat((depth * spacesCount) - spacesCount));

const getString = (data, depth = 1) => {
  if (!_.isPlainObject(data)) return `${data}`;
  const currentValue = Object.entries(data);
  const line = currentValue.map(([key, value]) => `${getLeftIdent(depth)} ${key}: ${getString(value, depth + 1)}`);
  return ['{', ...line, `${getRightIndent(depth)}}`].join('\n');
};

const getOutput = (tree) => {
  const iter = (currentValue, depth = 1) => {
    const line = currentValue.flatMap((node) => {
      const {
        key, children, state, value1, value2,
      } = node;
      switch (state) {
        case 'nested':
          return `${getLeftIdent(depth)}  ${key}: ${iter(children, depth + 1)}`;
        case 'removed':
          return `${getLeftIdent(depth)}- ${key}: ${getString(value1, depth + 1)}`;
        case 'added':
          return `${getLeftIdent(depth)}+ ${key}: ${getString(value2, depth + 1)}`;
        case 'matched':
          return `${getLeftIdent(depth)}  ${key}: ${getString(value1, depth + 1)}`;
        case 'updated':
          return [
            `${getLeftIdent(depth)}- ${key}: ${getString(value1, depth + 1)}`,
            `${getLeftIdent(depth)}+ ${key}: ${getString(value2, depth + 1)}`];
        default:
          throw new Error(`Unknown type ${state}.`);
      }
    });
    return ['{', ...line, `${getRightIndent(depth)}}`].join('\n');
  };
  return iter(tree);
};

export default getOutput;
