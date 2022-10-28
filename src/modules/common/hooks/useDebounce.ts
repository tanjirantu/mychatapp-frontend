import { useEffect, useState } from 'react';

interface IEvent {
    onChangeStart?: () => void;
    onChange?: () => void;
}

function useDebounce<T = string>(value: T, delay?: number, event?: IEvent): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        event?.onChangeStart && event.onChangeStart();
        const timer = setTimeout(() => {
            setDebouncedValue(value);
            event?.onChange && event.onChange();
        }, delay || 500);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
