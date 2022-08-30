import type from './type';

export default (value: any) => (value === null && type(value) === '[object Null]');
