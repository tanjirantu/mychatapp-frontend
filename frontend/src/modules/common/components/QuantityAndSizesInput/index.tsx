import React, { useEffect, useState } from 'react';
import styles from './QuantityAndSizesInput.module.scss';

interface Item {
    size: string;
    quantity: number | '';
    unitPrice: number;
}

interface IQuantityAndSizesInputProps {
    className?: string;
    values: Item[];
    onChange: (items: { size: string; quantity: number; unitPrice: number }[]) => void;
}

const QuantityAndSizesInput: React.FC<IQuantityAndSizesInputProps> = ({ className, values, onChange }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        setItems(values);
    }, [values]);

    const handleIncreaseQty = (index: number) => {
        const _items = [...items];
        _items.splice(index, 1, {
            ...items[index],
            quantity: Number(items[index].quantity) + 1,
        });

        onChange(_items as { size: string; quantity: number; unitPrice: number }[]);
    };

    const handleDescreaseQty = (index: number) => {
        const _items = [...items];
        if (_items[index].quantity > 0) {
            _items.splice(index, 1, {
                ...items[index],
                quantity: Number(items[index].quantity) - 1,
            });

            onChange(_items as { size: string; quantity: number; unitPrice: number }[]);
        }
    };

    const handleChange = (index: number, value: string) => {
        const _items = [...items];
        _items.splice(index, 1, {
            ...items[index],
            quantity: Number(value),
        });
        onChange(_items as { size: string; quantity: number; unitPrice: number }[]);
        setItems(_items);
    };

    return (
        <div className={`${className} ${styles.container} rounded bg-white`}>
            {items.map((item, index) => {
                return (
                    <div key={index} className={`flex items-center justify-between px-5 ${styles.items}`}>
                        <div className="text-dh-gray-700 text-sm">{item.size}</div>
                        <div className="flex gap-2.5">
                            <>
                                <button
                                    onClick={() => handleDescreaseQty(index)}
                                    className={`w-6 cursor-pointer h-6 text-black rounded-full flex items-center justify-center ${styles.des_btn}`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <input
                                    onChange={(event) => handleChange(index, event.target.value)}
                                    value={item.quantity <= 0 ? '' : item.quantity}
                                    type="number"
                                    className={` h-6 w-6 text-sm  rounded flex items-center justify-center text-center appearance-none ${styles.input}`}
                                />
                            </>

                            <button
                                onClick={() => handleIncreaseQty(index)}
                                className={`w-6 cursor-pointer h-6 bg-dh-green-700 text-white rounded-full flex items-center justify-center ${styles.inc_btn}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

QuantityAndSizesInput.defaultProps = {
    className: '',
};

export default QuantityAndSizesInput;
