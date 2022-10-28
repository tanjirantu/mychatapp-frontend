import React, { useEffect, useState } from 'react';

type ExpandContent<P extends React.ElementType = React.ElementType> = {
    children: string;
    wordCount?: number;
    seeMoreClassName?: string;
    as?: P;
};

type ExpandContentOwnProps<E extends React.ElementType> = ExpandContent<E> & Omit<React.ComponentProps<E>, keyof E>;

const defaultElement = 'p';
function ReadMore<E extends React.ElementType = typeof defaultElement>({
    children,
    wordCount = 20,
    seeMoreClassName = '',
    as,
    ...rest
}: ExpandContentOwnProps<E>) {
    const Tag = as || defaultElement;
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        const totalWord = children.split(' ').length;
        if (totalWord > wordCount) {
            setExpand(true);
        }
    }, [children, wordCount]);

    return (
        <Tag {...rest}>
            {expand ? children.split(' ').slice(0, wordCount).join(' ') : children} {expand ? '    ... ' : ''}{' '}
            {expand ? (
                <span onClick={() => setExpand(false)} className={`${seeMoreClassName} cursor-pointer`}>
                    See more
                </span>
            ) : (
                ''
            )}
        </Tag>
    );
}

export default ReadMore;
