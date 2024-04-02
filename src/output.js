import _ from 'lodash';

const getLeftIdent = (depth, replacer = ' ', spacesCount = 4) => (
  replacer.repeat((depth * spacesCount) - 2));
const getRightIndent = (depth, replacer = ' ', spacesCount = 4) => (
  replacer.repeat((depth * spacesCount) - spacesCount));

const getString = (data, depth = 1) => {
  if (!_.isPlainObject(data)) return `${data}`;
  const currentValue = Object.entries(data);
  const leftIndent = getLeftIdent(depth);
  const rightIndent = getRightIndent(depth);
  const line = currentValue.map(([key, value]) => `${leftIndent} ${key}: ${getString(value, depth + 1)}`);
  return ['{', ...line, `${rightIndent}}`].join('\n');
};

const getOutput = (tree) => {
  const iter = (currentValue, depth = 1) => {
    const leftIndent = getLeftIdent(depth);
    const rightIndent = getRightIndent(depth);
    const line = currentValue.flatMap((node) => {
      const {
        key, children, state, value1, value2,
      } = node;
      switch (state) {
        case 'nested':
          return `${leftIndent}  ${key}: ${iter(children, depth + 1)}`;
        case 'only in 1':
          return `${leftIndent}- ${key}: ${getString(value1, depth + 1)}`;
        case 'only in 2':
          return `${leftIndent}+ ${key}: ${getString(value2, depth + 1)}`;
        case 'matched':
          return `${leftIndent}  ${key}: ${getString(value1, depth + 1)}`;
        case 'differ':
          return [
            `${leftIndent}- ${key}: ${getString(value1, depth + 1)}`,
            `${leftIndent}+ ${key}: ${getString(value2, depth + 1)}`,
          ];
        default:
          throw new Error(`Unknown type ${state}.`);
      }
    });
    return ['{', ...line, `${rightIndent}}`].join('\n');
  };
  return iter(tree);
};

export default getOutput;
