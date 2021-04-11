function isNullOrUndefined(any: any) {
  return Object.is(any, null) || Object.is(any, undefined); 
}

export const TypeCheckingUtils = {
  isNullOrUndefined,
}