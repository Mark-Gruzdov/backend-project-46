import _ from 'lodash';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  return _.sortBy(unionKeys);
};

const conditions = (obj1, obj2, keys) => (
  keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { key, value1, state: 'only in 1' };
    } if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { key, value2, state: 'only in 2' };
    } if (_.isEqual(value1, value2)) {
      return { key, value1, state: 'matched' };
    }
    return {
      key, value1, value2, state: 'differ',
    };
  })
);

const compare = (data1, data2) => {
  const keys = getSortedKeys(data1, data2);
  const result = conditions(data1, data2, keys);
  return result;
};

export default compare;
