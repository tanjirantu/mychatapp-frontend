import FilterIcon from '../../icons/FilterIcon';
import styles from './CheckboxFilter.module.scss';
import Dropdown from '../Dropdown';
import Checkbox from '../Checkbox';
import { translateEnumToText } from '../../../../helpers/utils';
import { ICheckboxFilter } from './ICheckboxFilter';
import CrossIcon from '../../icons/CrossIcon';
import { MouseEvent, useMemo } from 'react';

const CheckboxFilter: React.FC<ICheckboxFilter> = ({ items, onChange, onSubmit }) => {
    const onCheckboxItemClick = (indexOfItem: number, indexOfCheckableItem: number) => {
        const _checkboxItems = [...items];
        _checkboxItems[indexOfItem].checkableList[indexOfCheckableItem].checked =
            !_checkboxItems[indexOfItem].checkableList[indexOfCheckableItem].checked;

        onChange(_checkboxItems);
    };

    const onSubmitBtnClick = () => {
        const obj: any = {};
        items.forEach((item) => {
            item.checkableList.forEach((element) => {
                if (element.checked) {
                    if (obj[item.type] !== undefined) return (obj[item.type] += `,${element.label}`);
                    return (obj[item.type] = `${element.label}`);
                }
            });
        });

        onSubmit(obj);
    };

    const isChecked = useMemo(() => {
        let checked = false;
        items.forEach((item) => {
            item.checkableList.forEach((element) => {
                if (element.checked) {
                    checked = true;
                }
            });
        });
        return checked;
    }, [items]);

    const handleClearFilter = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const obj: any = {};
        items.forEach((item) => {
            item.checkableList.forEach((element) => {
                if (element.checked) {
                    if (obj[item.type] !== undefined) return (obj[item.type] = '');
                    return (obj[item.type] = ``);
                }
            });
        });

        const _checkboxItems = items.map((_items) => {
            return {
                ..._items,
                checkableList: _items.checkableList.map((item) => {
                    return {
                        ...item,
                        checked: false,
                    };
                }),
            };
        });

        onChange(_checkboxItems);

        onSubmit(obj);
    };

    return (
        <Dropdown className={`relative ${styles.root}`}>
            <Dropdown.Menu>
                {({ toggle, open }) => (
                    <div onClick={() => toggle(!open)}>
                        <button className="px-4 gap-1.5 h-9 flex justify-center items-center bg-white rounded-full shadow-sm">
                            <FilterIcon fill="#01896a" />
                            <p className="text-sm font-medium text-dh-green-700">Status Filter</p>
                            {isChecked ? (
                                <div onClick={handleClearFilter}>
                                    <CrossIcon />
                                </div>
                            ) : null}
                        </button>
                    </div>
                )}
            </Dropdown.Menu>
            <Dropdown.Item>
                {({ toggle, open }) => (
                    <div className={`absolute z-50 bg-white right-0 rounded ${styles.dropdown}`}>
                        <div className={`p-[30px]`}>
                            {items.map((item, index) => (
                                <div key={index} className={`${styles.list}`}>
                                    <h4 className={`${styles.label}`}>{item.label}</h4>
                                    <ul>
                                        {item.checkableList.map((c, i) => (
                                            <li key={i} className={`${styles.listItem} flex gap-2 items-cente mb-1`}>
                                                <Checkbox
                                                    checked={c.checked}
                                                    onChange={() => onCheckboxItemClick(index, i)}
                                                />
                                                <p className="pb-2 text-sm">{translateEnumToText(c.label)}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-2 h-12 border-t py-[14px] px-[20px]">
                            <button className="text-dh-gray-600 font-semibold" onClick={() => toggle(!open)}>
                                Cancel
                            </button>
                            <button
                                className="text-dh-green-700 font-semibold"
                                onClick={() => {
                                    onSubmitBtnClick();
                                    toggle(!open);
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

export default CheckboxFilter;
