import _ from 'lodash';

function cloneDeep<T>(aObject: T): T {
  return _.cloneDeep(aObject);
}

export const ObjectUtils = {
  cloneDeep,
};