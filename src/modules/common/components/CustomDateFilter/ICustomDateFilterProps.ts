import type { DateRange } from './DateRange';
export interface ICustomDateFilter {
    onSubmit: (date: DateRange) => void;
}
