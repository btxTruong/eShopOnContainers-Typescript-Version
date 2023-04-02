import { isBoolean, isNull, isString, isUndefined } from 'lodash';

export const asNumber = (
  val: any,
  defaultValue?: number,
  throwOnError = false
): number | undefined => {
  const n = isString(val) ? Number(val) : NaN;
  if (Number.isNaN(n)) {
    if (defaultValue) return defaultValue;
    if (throwOnError) throw new Error('Can not convert to number');
    return undefined;
  }
  return n;
};

export function asString(
  val: any,
  defaultValue?: string,
  throwOnError = false
): string | undefined {
  if (!isString(val)) {
    if (defaultValue) return defaultValue;
    if (throwOnError) throw new Error('Value is not string');
    return undefined;
  }
  return val;
}

export function asBoolean(val: any, defaultValue?: boolean, throwOnError = false) {
  if (isBoolean(val)) return val;
  if (['true', 't'].some((t) => t === val)) return true;
  if (['false', 'f'].some((t) => t === val)) return false;
  if (defaultValue) return defaultValue;
  if (throwOnError) throw new Error('Can not convert to boolean');
  return undefined;
}

export function isDefined(val: any) {
  return !isNull(val) && !isUndefined(val);
}

export function asDefined(val: any, defaultValue?: any, throwOnError = false) {
  if (isDefined(val)) return val;
  if (defaultValue) return defaultValue;
  if (throwOnError) throw new Error('Input is undefined');
  return undefined;
}
