import _ from 'lodash';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  return _.sortBy(unionKeys);
};

const getCase = (obj1, obj2, key) => {
  const value1 = obj1[key];
  const value2 = obj2[key];
  let result = 'case_5';
  if (_.has(obj1, key) && !_.has(obj2, key)) {
    result = 'case_1';
  } if (!_.has(obj1, key) && _.has(obj2, key)) {
    result = 'case_2';
  } if (_.isObject(value1) && _.isObject(value2)) {
    result = 'case_3';
  } if (_.isEqual(value1, value2)) {
    result = 'case_4';
  }
  return result;
};

const compare = (data1, data2) => {
  const keys = getSortedKeys(data1, data2);
  const result = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const condition = getCase(data1, data2, key);
    switch (condition) {
      case 'case_1':
        return { key, value1, state: 'only in 1' };
      case 'case_2':
        return { key, value2, state: 'only in 2' };
      case 'case_3':
        return { key, children: compare(value1, value2), state: 'nested' };
      case 'case_4':
        return { key, value1, state: 'matched' };
      case 'case_5':
        return {
          key, value1, value2, state: 'differ',
        };
      default:
        throw new Error(`Unknown case ${condition}.`);
    }
  });
  return result;
};

export default compare;
