import _ from 'lodash';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  return _.sortBy(unionKeys);
};

const compare = (data1, data2) => {
  const keys = getSortedKeys(data1, data2);
  const getCompareData = (obj1, obj2, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    let result = {
      key, value1, value2, state: 'differ',
    };
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      result = { key, value1, state: 'only in 1' };
    } if (!_.has(obj1, key) && _.has(obj2, key)) {
      result = { key, value2, state: 'only in 2' };
    } if (_.isObject(value1) && _.isObject(value2)) {
      result = { key, children: compare(value1, value2), state: 'nested' };
    } if (_.isEqual(value1, value2)) {
      result = { key, value1, state: 'matched' };
    }
    return result;
  };
  const result = keys.map((key) => getCompareData(data1, data2, key));
  return result;
};

export default compare;
