import _ from 'lodash';

const getString = (data, depth = 1) => {
  if (!_.isPlainObject(data)) return `${data}`;
  const currentValue = Object.entries(data);
  const line = currentValue.map(([key, value]) => `    ${key}: ${getString(value, depth + 1)}`);
  return ['{', ...line, '}'].join('\n');
};

const getOutput = (tree) => {
  const iter = (currentValue, depth = 1) => {
    const line = currentValue.flatMap((node) => {
      const {
        key, state, value1, value2,
      } = node;
      switch (state) {
        case 'only in 1':
          return `  - ${key}: ${getString(value1, depth + 1)}`;
        case 'only in 2':
          return `  + ${key}: ${getString(value2, depth + 1)}`;
        case 'matched':
          return `    ${key}: ${getString(value1, depth + 1)}`;
        case 'differ':
          return [
            `  - ${key}: ${getString(value1, depth + 1)}`,
            `  + ${key}: ${getString(value2, depth + 1)}`,
          ];
        default:
          throw new Error(`Unknown type ${state}.`);
      }
    });
    return ['{', ...line, '}'].join('\n');
  };
  return iter(tree);
};

export default getOutput;
