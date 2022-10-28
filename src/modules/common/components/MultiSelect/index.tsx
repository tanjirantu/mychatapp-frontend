import React, { useEffect, useRef, useState } from 'react';
import styles from './MultiSelect.module.scss';
import { useMultipleSelection, useCombobox } from 'downshift';
import Chip from '../Chip';
import classNames from 'classnames';

interface Item {
    value: any;
    label: string;
    [k: string]: any;
}

interface IMultiSelect {
    items: Item[];
    data: Item[];
    label?: string;
    onClick?: () => void;
    onChange: (value: Item[]) => void;
    onScroll?: () => void;
    className?: string;
    error?: boolean;
    errorText?: string;
}

const MultiSelect: React.FC<IMultiSelect> = ({
    items,
    data,
    label,
    onClick,
    onChange,
    onScroll,
    className = '',
    error,
    errorText,
}) => {
    const [seemore, setSeemore] = useState(false);
    const [seemoreIndex, setSeemoreIndex] = useState(0);
    const { getDropdownProps, addSelectedItem, removeSelectedItem, selectedItems } = useMultipleSelection({
        itemToString: (item) => item.label,
        onStateChange: (value) => onChange(value.selectedItems || []),
        selectedItems: data,
    });
    const [inputValue, setInputValue] = useState('');
    const getFilteredItems = () =>
        items.filter(
            (item) => selectedItems.indexOf(item) < 0 && item.label.toLowerCase().startsWith(inputValue.toLowerCase())
        );
    const {
        isOpen,
        getInputProps,
        getComboboxProps,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        getItemProps,
    } = useCombobox({
        selectedItem: null,
        itemToString: (item) => item?.label || '',
        defaultHighlightedIndex: 0, // after selection, highlight the first item.
        items: getFilteredItems(),

        stateReducer: (state, actionAndChanges) => {
            const { changes, type } = actionAndChanges;
            switch (type) {
                case useCombobox.stateChangeTypes.InputKeyDownEnter:
                case useCombobox.stateChangeTypes.ItemClick:
                    return {
                        ...changes,
                        isOpen: true, // keep the menu open after selection.
                    };
            }
            return changes;
        },
        onStateChange: ({ inputValue, type, selectedItem }) => {
            switch (type) {
                case useCombobox.stateChangeTypes.InputChange:
                    setInputValue(inputValue || '');
                    break;
                case useCombobox.stateChangeTypes.InputKeyDownEnter:
                case useCombobox.stateChangeTypes.ItemClick:
                case useCombobox.stateChangeTypes.InputBlur:
                    if (selectedItem) {
                        setInputValue('');
                        addSelectedItem(selectedItem);
                    }
                    break;
                default:
                    break;
            }
        },
    });
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!isOpen && ref.current) {
            const width = ref.current.clientWidth;
            let nodeswidth = 0;
            const nodes: any = ref.current.childNodes;
            for (let i = 0; i < nodes.length; i++) {
                nodeswidth += nodes[i].clientWidth;
                if (nodeswidth > width - 50) {
                    setSeemore(true);
                    setSeemoreIndex(i - 1);
                    break;
                }
            }
        } else {
            setSeemore(false);
        }
    }, [isOpen]);

    const sliceItem = seemore ? selectedItems.slice(0, seemoreIndex) : selectedItems;
    return (
        <div
            {...getComboboxProps()}
            onClick={onClick}
            className={classNames({ [styles.error]: error }, 'relative', styles.root, className)}
        >
            <label {...getLabelProps()} className={`${styles.label}`}>
                <button
                    {...getToggleButtonProps(
                        getDropdownProps({
                            preventKeyAction: isOpen,
                        })
                    )}
                    tabIndex={-4}
                    className={`${styles.input_wraper}   relative  w-full flex justify-between items-center py-2 px-2.5 rounded`}
                >
                    <div ref={ref} className={` ${styles.item_wraper} ${isOpen ? 'flex-wrap' : 'flex-wrap'}`}>
                        {sliceItem.map((selectedItem, index) => {
                            return (
                                <Chip
                                    key={index}
                                    iconClassName="bg-dh-green-400 text-dh-green-700 h-full flex items-center justify-center w-5 text-sm"
                                    labelClassName="text-white px-2 h-full flex item-center h-5 py-1  justify-center"
                                    className="rounded bg-dh-green-700 h-5  packages-center "
                                    name={selectedItem.label}
                                    icon={
                                        <svg
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeSelectedItem(selectedItem);
                                            }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    }
                                />
                            );
                        })}

                        <input
                            {...getInputProps(getDropdownProps())}
                            className={` border-none outline-none h-full text-base ${isOpen ? 'w-28' : 'w-0'}`}
                        />

                        {seemore && selectedItems.length > seemoreIndex ? (
                            <div
                                className={`${styles.seemore} text-dh-red-500 px-2  h-5 rounded flex items-center  justify-center`}
                            >
                                +{selectedItems.length - seemoreIndex} See more
                            </div>
                        ) : null}
                    </div>

                    <div
                        className={`${styles.arrow_wrraper} right-0  bottom-0 w-10 h-full flex items-center justify-center absolute`}
                    >
                        <div
                            style={{ transform: `rotate(${isOpen ? '180deg' : '0deg'})` }}
                            className={`${styles.arrow} transition-all duration-300 h-0 w-0`}
                        ></div>
                    </div>
                </button>
                <span className={`${styles.span_label}  ${selectedItems.length ? styles.span_label_active : ''}`}>
                    {label || 'Select'}
                </span>
            </label>

            <ul
                onScroll={onScroll}
                className={isOpen ? 'absolute gap-2 z-50 flex-wrap flex rounded p-4  bg-white' : ''}
                {...getMenuProps()}
            >
                {isOpen &&
                    getFilteredItems().map((item, index) => (
                        <li
                            className="cursor-pointer text-dh-gray-700 rounded text-xs"
                            style={highlightedIndex === index ? { backgroundColor: '#e8e8e8' } : {}}
                            key={`${item}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item.label}
                        </li>
                    ))}
            </ul>
            {error ? <span className={styles.error_text}>{errorText}</span> : null}
        </div>
    );
};

export default MultiSelect;
