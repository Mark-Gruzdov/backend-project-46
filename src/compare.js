import _ from 'lodash';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  return _.sortBy(unionKeys);
};

const compare = (data1, data2) => {
const keys = getSortedKeys(data1, data2);
const conditions = keys.map((key) => {
  const value1 = data1[key];
  const value2 = data2[key];
  if (_.has(data1, key) && !_.has(data2, key)) {
    return { key, value1, state: 'only in 1' };
  } else if (!_.has(data1, key) && _.has(data2, key)) {
    return { key, value2, state: 'only in 2' };
  } else if (_.isEqual(value1, value2)) {
    return { key, value1, state: 'matched' };
  } else {  
    return { key, value1, value2, state: 'differ' };
  }
  });
  return conditions;
};

  export default compare;