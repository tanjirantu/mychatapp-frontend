import React, { ReactNode } from 'react';
interface IContainerProps {
    children: ReactNode;
}

const ContainerComponent: React.FC<IContainerProps> = ({ children }) => {
    return <div className="max-w-7xl mx-auto px-3">{children}</div>;
};
export default ContainerComponent;
