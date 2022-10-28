import React, { Fragment, ReactChild, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

interface IDialog {
    className?: string;
    children: ReactChild;
    onClose: () => void;
    open: boolean;
}

const Dialog: React.FC<IDialog> = ({ className = '', children, onClose, open }) => {
    const [isBrowser, setIsBrower] = useState<boolean>(false);
    const domref = useRef<any>(null);
    useEffect(() => {
        setIsBrower(true);
        const appRoot = document.getElementsByTagName('body')[0];
        domref.current = appRoot;

        () => {
            domref.current = null;
        };
    }, []);
    const DialogElement = (
        <Fragment>
            <div
                onClick={onClose}
                className={` fixed inset-0 px-5 transition-all flex justify-center items-center bg-black bg-opacity-50 ${
                    open ? 'block' : 'hidden'
                }`}
                style={{ zIndex: '1000' }}
            >
                <div onClick={(e) => e.stopPropagation()} className={`max-h-screen bg-white   w-full    ${className} `}>
                    {children}
                </div>
            </div>
        </Fragment>
    );

    if (isBrowser && domref.current) {
        return ReactDOM.createPortal(DialogElement, domref.current);
    } else return null;
};

export default Dialog;
