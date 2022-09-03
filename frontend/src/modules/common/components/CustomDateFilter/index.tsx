import styles from './CustomDateFilter.module.scss';
import Dropdown from '../Dropdown';
import TextInput from '../TextInput';
import { MouseEvent, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from 'react-datepicker';
import { ICustomDateFilter } from './ICustomDateFilterProps';
import { getShortDate } from '../../../../helpers/utils';
import type { DateRange } from './DateRange';
import CrossIcon from '../../icons/CrossIcon';

const CustomDateFilter: React.FC<ICustomDateFilter> = ({ onSubmit }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [errors, setErrors] = useState({ startDate: false, endDate: false });

    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start ? start : '');
        setEndDate(end ? end : '');
    };

    const onSubmitBtnClick = () => {
        if (endDate === null) {
            setErrors({ ...errors, endDate: true });
            return false;
        } else {
            const date: DateRange = {
                start: getShortDate(startDate.toString()),
                end: getShortDate(endDate.toString()),
            };
            onSubmit(date);
            return true;
        }
    };

    const handleClearFilter = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const date: DateRange = {
            start: '',
            end: '',
        };
        onSubmit(date);
        setStartDate(new Date());
        setEndDate(null);
    };

    return (
        <Dropdown className={`relative ${styles.root}`}>
            <Dropdown.Menu>
                {({ toggle, open }) => (
                    <div onClick={() => toggle(!open)}>
                        <button className=" h-9 px-4 gap-1.5 flex justify-between items-center bg-white rounded-full shadow-sm">
                            <img alt="calender" src="static/assets/icons/calendar.svg" />
                            <p className="text-sm font-medium text-dh-green-700">Date Filter</p>
                            {startDate && endDate ? (
                                <div onClick={handleClearFilter}>
                                    <CrossIcon className="text-dh-green-700 h-6 w-6" />
                                </div>
                            ) : null}
                        </button>
                    </div>
                )}
            </Dropdown.Menu>
            <Dropdown.Item>
                {({ toggle, open }) => (
                    <div className={`absolute z-50 bg-white right-0 rounded ${styles.dropdown}`}>
                        <div className={`w-full `}>
                            <div className="w-full flex justify-between gap-2 p-5">
                                <div>
                                    <TextInput.Label
                                        className="text-sm text-dh-gray-600 font-medium"
                                        labelText="Start Date"
                                    />
                                    <TextInput
                                        readOnly
                                        rootClassName="!h-10"
                                        inputClassName="!text-sm"
                                        error={errors['startDate']}
                                        name="startDate"
                                        value={getShortDate(startDate.toString())}
                                    />
                                </div>
                                <div>
                                    <TextInput.Label
                                        className="text-sm text-dh-gray-600 font-medium"
                                        labelText="End Date"
                                    />
                                    <TextInput
                                        readOnly
                                        rootClassName="!h-10"
                                        inputClassName="!text-sm"
                                        error={errors['endDate']}
                                        name="endDate"
                                        value={getShortDate(endDate ? endDate?.toString() : '')}
                                    />
                                </div>
                            </div>

                            <DatePicker
                                selected={startDate}
                                onChange={onChange}
                                startDate={startDate}
                                endDate={endDate}
                                // excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
                                selectsRange={true}
                                // selectsDisabledDaysInRange={true}
                                inline
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-4 h-12 border-t py-3.5 px-5">
                            <button className="text-dh-gray-600 font-semibold" onClick={() => toggle(!open)}>
                                Cancel
                            </button>
                            <button
                                className="text-dh-green-700 font-semibold"
                                onClick={() => {
                                    const isValid = onSubmitBtnClick();
                                    if (isValid) toggle(!open);
                                }}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </Dropdown.Item>
        </Dropdown>
    );
};

export default CustomDateFilter;
