import _ from 'lodash';

const getValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  return _.isObject(value) ? '[complex value]' : String(value);
};

const getCurrentPath = (path, key) => {
  const result = path === '' ? `${key}` : `${path}.${key}`;
  return result;
};

const getPlainOutput = (data) => {
  const iter = (value, path) => {
    const result = value.flatMap((node) => {
      const {
        key, children, type, value1, value2,
      } = node;
      const currentPath = getCurrentPath(path, key);
      switch (type) {
        case 'nested':
          return iter(children, currentPath);
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'added':
          return `Property '${currentPath}' was added with value: ${getValue(value2)}`;
        case 'updated':
          return `Property '${currentPath}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
        case 'matched':
          return [];
        default:
          throw new Error(`Unknown type: ${type}.`);
      }
    });
    return [...result].join('\n');
  };
  return iter(data, '');
};

export default getPlainOutput;
