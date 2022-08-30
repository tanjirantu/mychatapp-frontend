import isArray from './isArray';
import isNull from './isNull';
import isUndefined from './isUndefined';

export default (value: any) => (isNull(value) || isUndefined(value) || (isArray(value) && value.length === 0));
