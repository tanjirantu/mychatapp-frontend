import type from './type';

export default (value: any) => type(value) === '[object Undefined]';
