function replaceItem(source: Array<any>, index: number, newItem: any): Array<any> {
  const firstHalf = source.slice(0, index);
  const secondHalf = source.slice(index + 1, source.length);

  return firstHalf.concat(newItem, secondHalf);
}

export const ArrayUtils = {
  replaceItem,
};
