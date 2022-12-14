import { useEffect, useState, useRef, MutableRefObject } from 'react';

interface Iposition {
    top: number | undefined;
    bottom: number | undefined;
}

type Ref = HTMLDivElement | null;

interface IuseScrollPosition {
    ref: MutableRefObject<Ref>;
    position: Iposition;
}

function useScrollPosition({ window = false }: { window?: boolean } = {}): IuseScrollPosition {
    const ref = useRef<Ref>(null);
    const [position, setPosition] = useState<Iposition>({
        top: undefined,
        bottom: undefined,
    });
    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const element = window ? document.body : ref.current;
        if (element) {
            const position = element.getBoundingClientRect();
            setPosition(position);
        }
    };
    return { position, ref };
}

export default useScrollPosition;
