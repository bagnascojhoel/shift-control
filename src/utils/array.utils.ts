function replace(source: Array<any>, index: number, newItem: any): Array<any> {
  return source.splice(index, 1, newItem);
}

export const ArrayUtils = {
  replace,
};
